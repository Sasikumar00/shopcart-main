import slugify from 'slugify'
import productModel from '../models/productModel.js'
import categoryModel from '../models/categoryModel.js'
import orderModel from '../models/orderModel.js'
import fs from 'fs'
import Jimp from 'jimp'
import Stripe from 'stripe'
import dotenv from 'dotenv'
import cartModel from '../models/cartModel.js'

dotenv.config();

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`)


export const createProductController= async(req,res)=>{
    try{
        const {name} = req.fields
        const {photo} = req.files
        if(photo && photo.type!='image/jpeg' && photo.type!='image/jpg' && photo.type!='image/png'){
            return res.status(400).json({status: 'fail',message: 'Please upload a valid image'})
        }
        const image = await Jimp.read(photo.path)
        const resizedImage = image.resize(300, 300).quality(60);
        const outputMIME = photo.type === 'image/jpeg' ? Jimp.MIME_JPEG : Jimp.MIME_PNG;
        const buffer = await resizedImage.getBufferAsync(outputMIME);
        const products = await productModel({...req.fields, slug: slugify(name)})
        if(buffer){
            try{
                products.photo.data = buffer
                products.photo.contentType = outputMIME
                await products.save()
                }
                catch(error){
                    
                    products.photo.data = fs.readFileSync('./images/stock.png')
                    products.photo.contentType = 'image/png'
                    await products.save()
                }
        }
        res.status(201).json({
            status: 'success',
            message: "Product created successfully",
            data: products
        })
    }
    catch(error){
        
        res.status(500).json({
            status: 'fail',
            message: 'Something went wrong'
        })
    }
}

export const getProductsController = async(req,res)=>{
    try{
        const products = await productModel.find().populate('category').select('-photo').limit(12).sort({createdAt: -1})
        if(products){
        res.status(200).json({
            status: 'success',
            totalProducts: products.length,
            data: products
        })
    }
    else{
        res.status(404).json({
            status: 'fail',
            message: 'No products found'
        })
    }
    }
    catch(error){
        
        res.status(500).json({
            status: 'fail',
            message: 'Something went wrong'
        })
    }
}

export const getOneProductController = async(req,res)=>{
    try{
        const {slug} = req.params
        const product = await productModel.findOne({slug: slug}).populate('category').select('-photo')
        res.status(200).json({
            status: 'success',
            data: product
        })
    }
    catch(error){
        
        res.status(500).json({
            status: 'fail',
            message: 'Something went wrong'
        })
    }
}

export const getProductPhotoController = async(req,res)=>{
    try{
        const product = await productModel.findById(req.params.pid).select('photo')
        if(product.photo.data){
            res.set('Content-type', product.photo.contentType)
            res.status(200).send(product.photo.data)
        }
        else{
            res.status(404).json({
                status: 'fail',
                message: 'No image found'
            })
        }

    }
    catch(error){
        
        res.status(500).json({
            status: 'fail',
            message: 'Something went wrong'
        })
    }
}

export const deleteProductController = async(req,res)=>{
    try{
        const {pid} = req.params
        await productModel.findByIdAndDelete(pid)
        res.status(200).json({
            status: 'success',
            message: 'Product deleted successfully'
        })
    }
    catch(error){
        
        res.status(500).json({
            status: 'fail',
            message: 'Something went wrong'
        })
    }
}

export const updateProductController = async(req,res)=>{
    try{
        const {name} = req.fields
        const {photo} = req.files
        if(photo && photo.type!='image/jpeg' && photo.type!='image/jpg' && photo.type!='image/png'){
            return res.status(400).json({status: 'fail',message: 'Please upload a valid image'})
        }
        const image = await Jimp.read(photo.path)
        const resizedImage = image.resize(300, 300).quality(60);
        const outputMIME = photo.type === 'image/jpeg' ? Jimp.MIME_JPEG : Jimp.MIME_PNG;
        const buffer = await resizedImage.getBufferAsync(outputMIME);
        const products = await productModel.findByIdAndUpdate(req.params.pid,{...req.fields, slug: slugify(name)})
        if(buffer){
        try{
            products.photo.data = buffer
            products.photo.contentType = outputMIME
            await products.save()
            }
            catch(error){
                
                products.photo.data = fs.readFileSync('./images/stock.png')
                products.photo.contentType = 'image/png'
                await products.save()
            }
        }
        res.status(201).json({
            status: 'success',
            message: "Product updated successfully",
            data: products
        })
    }
    catch(error){
        
        res.status(500).json({
            status: 'fail',
            message: 'Something went wrong'
        })
    }
}

export const getProductFilterController = async(req,res)=>{
    try{
        const {checked,priceChecked} = req.body
        let args={}
        if(checked.length > 0){
            args.category=checked
        }
        if(priceChecked.length){
            args.price={$gte: priceChecked[0], $lte: priceChecked[1]}
        }
        const products = await productModel.find(args)
        res.status(200).json({
            status: 'success',
            data: products
        })
    }
    catch(error){
        
        res.status(400).json({
            status: 'fail',
            message: "Error while filtering products"
        })
    }
}

export const productCountController = async(req,res)=>{
    try{
        const productTotal = await productModel.find().estimatedDocumentCount()
        res.status(200).json({
            status: 'success',
            data: productTotal
        })
    }
    catch(error){
        
        res.status(400).json({
            status: 'fail',
            message: 'Error in product count'
        })
    }
}

export const productListController = async(req,res)=>{
    try{
        const perPage = 3
        const page = req.params.page?req.params.page:1
        const products = await productModel.find().select('-photo').skip((page-1)*perPage).limit(perPage).sort({createdAt: -1})
        res.status(200).json({
            status: 'success',
            data: products
        })
    }catch(error){
        
        res.status(400).json({
            status: 'fail',
            message: 'Error in per page list'
        })
    }
}

export const searchProductController = async(req,res)=>{
    try{
        const {keyword} = req.params
        const results = await productModel.find({
            $or: [
                {name: {$regex: keyword, $options: 'i'}},
                {description: {$regex: keyword, $options: 'i'}}
            ]
        }).select('-photo')
        res.status(200).json({
            status: 'success',
            data: results
        })
    }
    catch(error){
        
        res.status(400).json({
            status: 'fail',
            message: 'Error in search product API'
        })
    }
}

export const relatedProductController = async(req,res)=>{
    try{
        const {pid, cid} = req.params
        const products = await productModel.find({
            category: cid,
            _id: {$ne: pid}
        }).select('-photo').limit(3).populate('category')
        res.status(200).json({
            status: 'success',
            data: products
        })
    }catch(error)
    {
        res.status(400).json({status: 'fail', message: 'Something went wrong'})
    }
}

export const getCategoryProductController = async(req,res)=>{
    try{
        const category = await categoryModel.findOne({slug: req.params.slug})
        const products = await productModel.find({category}).populate('category').select('-photo')
        res.status(200).json({
            status: 'success',
            data: {
                products,
                category
            }
        })
    }
    catch(error){
        
        res.status(400).json({
            status: 'fail',
            message: 'Something went wrong'
        })
    }
}

export const addToCart = async(req,res)=>{
    try{
        const product = req.body.products
        const user = req.body.user
        const newCart  = await cartModel({product, user})
        newCart.save()
        res.status(200).json({
            status: 'sucess',
            message: 'Item added to cart'
        })
    }
    catch(error){
        res.status(400).json({
            status: "fail",
            message: 'Something went wrong'
        })
    }
}
export const addLocalToCart = async(req,res)=>{
    try{
        const productIds = req.body.products
        const user = req.body.user
        if(productIds.length>1){
        const cartItems = productIds.map(productId=>(
            {
                product: productId,
                user: user
            }
        ))
        const newCart  = await cartModel.insertMany(cartItems)
        }
        else{
            const cart = await cartModel({product: productIds[0], user: user})
        }
        res.status(200).json({
            status: 'success',
            message: 'Item added to cart'
        })
    }
    catch(error){
        res.status(400).json({
            status: "fail",
            message: error.message
        })
    }
}

export const getCartProducts = async(req,res)=>{
    try{
        const user = req.body.user
        const products = await cartModel.find({user}).populate({
            path:'product',
            select: '-photo'
        })
        res.status(200).json({
            status: 'success',
            data: products
        })
    }
    catch(error){
        res.status(400).json({
            status: "fail",
            message: 'Something went wrong'
        })
    }
}

export const deleteCartProduct = async(req,res)=>{
    try{
        const pid = req.body.pid
        const user = req.body.userID
        const removedObj = await cartModel.deleteOne({user, product: pid})
        if(removedObj){
            res.status(200).json({
                status: 'success',
                message: 'Product removed from cart'
        })
        }
    }
    catch(error){
        res.status(400).json({
            status: 'fail',
            message: 'Something went wrong'
        })
    }
}

export const deleteAllCartItems = async(req,res)=>{
    try{
        const user = req.body.userID
        const removedObj = await cartModel.deleteMany({user})
        if(removedObj){
            res.status(200).json({
                status: 'success',
                message: 'Products removed from cart'
        })
        }
    }
    catch(error){
        res.status(400).json({
            status: 'fail',
            message: 'Something went wrong'
        })
    }
}

export const checkoutController = async(req,res)=>{
    try{
        const products = req.body.cart
        const productIds = products.map(product => product._id)
        const userId = req.body.user
        const customer = await stripe.customers.create({
            metadata: {
                userId: userId,
                cart: productIds.join(',')
            }
        })
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"], 
            customer: customer.id,
            line_items: products.map(product=>{
                return(
                    { 
                        price_data: { 
                        currency: "inr", 
                        product_data: { 
                            name: product.name, 
                        }, 
                        unit_amount: product.price * 100, 
                        }, 
                        quantity: product.quantity, 
                    }
                )
            }), 
            mode: "payment", 
            success_url: `${process.env.API_URL}/thankyou`, 
            cancel_url: `${process.env.API_URL}/cart`, 
        }); 
        res.status(200).json({
            status: 'success',
            data: session.id
        })
    }
    catch(error){
        
        res.status(400).json({
            status: 'fail',
            message: 'Something went wrong'
        })
    }
}

export const getOrders = async(req,res)=>{
    try{
    const user = req.body.user
    const orders = await orderModel.find({user}).populate('products')
    res.status(200).json({
        status: 'success',
        data: orders
    })
    }
    catch(error){
        res.status(400).json({
            status: 'fail',
            message: error.message
        })
    }
}