import mongoose from "mongoose";

//Create a user schema with required fields
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password:{
        type: String,
        required: [true, 'Password is required']
    },
    phone: {
        type: Number,
        required: [true, 'Phone Number is required'],
        unique: true
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
    role: {
        type: String,
        default: 'user',
        enum: ['user', 'admin']
    },
}, {timestamps: true})

//Create a model with the user schema
const userModel = mongoose.model('Users', userSchema)

export default userModel