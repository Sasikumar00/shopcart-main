import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRouter from './routes/authRoute.js'
import categoryRouter from './routes/categoryRoute.js'
import productRouter from './routes/productRoute.js'
import cors from 'cors'
import Stripe from 'stripe'
import orderModel from './models/orderModel.js';

//CONFIGURE THE ENV
dotenv.config();

//STRIPE OBJECT
const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)
const endpointSecret = process.env.WEBHOOK_SECRET

//DATABASE CONFIGURATION
connectDB();

//INITIALIZE EXPRESS APP
const app = express()

//MIDDLWARES
//1) cors: To avoid corelation errors
app.use(cors())

//3) Morgan: To log the requested url
app.use(morgan('dev'))

//STRIPE END-POINT
app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntentSucceeded = event.data.object;
      stripe.customers.retrieve(paymentIntentSucceeded.customer).then(async(customer)=>{
        try{
        const productIds = customer.metadata.cart.split(',')
        const user = customer.metadata.userId
        const newOrder = new orderModel({ 
            products: productIds, 
            user: user 
          });
        newOrder.save()
        }
        catch(error){
            
        }
      })
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});

//2) json: To allow json data transmission
app.use(express.json())

//SET THE PORT
const PORT = process.env.PORT || 8080;

//ROUTES
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/category', categoryRouter)
app.use('/api/v1/products', productRouter)

//API END-POINTS
app.get('/', (req,res)=>{
    res.status(200).json({
        status: 'success',
        message: 'Home Page'
    })
})



//LISTEN TO THE PORT
app.listen(PORT, ()=>{
    console.log(`Server running on ${process.env.DEV_MODE} mode on http://localhost:${PORT}`)
})
