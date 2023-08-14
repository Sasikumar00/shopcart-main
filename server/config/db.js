import mongoose from 'mongoose'

//Method to create a connection with the mongoDB cluster
const connectDB = async()=>{
    try{
        //Create a connection object
        const conn = await mongoose.connect(process.env.DB_URL)
        //If connection is successful print this to console
        console.log(`Connected to MongoDB database ${conn.connection.host}`)
    }catch(error){
        //Print this error if there was some issue
        console.log(`Error in mongoDB ${error}`)
    }
};

export default connectDB;