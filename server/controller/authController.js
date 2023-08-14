import userModel from '../models/userModel.js'
import User from '../models/userModel.js'
import { comparePassword, hashPassword } from '../utils/authUtils.js'
import JWT from 'jsonwebtoken'

const register = async (req, res) => {
    try{
        //Destructure the values from request body
        const {name, email, password, passwordConfirm, phone, address, role} = req.body

        //Check if the user already exists
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                status: 'failed',
                message: 'User already exists'
            })
        }
        const existingPhoneNumber = await User.findOne({phone})
        if(existingPhoneNumber){
            return res.status(400).json({
                status: 'failed',
                message: 'This phone number is already registered'
            })
        }
        //Check if the password and confirm password are the same
        if(password !== passwordConfirm){
            return res.status(400).json({
                status: 'failed',
                message: 'Password and confirm password are not the same'
            })
        }
        //Register the user
        const hashedPassword = await hashPassword(password);
        //Save to database
        const user = await User.create({name,email,password: hashedPassword, phone, address, role})
        user.save()
        //Send response
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: user
        })
    }catch(error){
        res.status(500).json({
            status: 'failed',
            message: 'Something went wrong'
        })
    }
}

const login = async (req, res) => {
    try{
        //Destructure the values from request body  
        const {email, password} = req.body
        if(!email || !password){
            return res.status(400).json({
                status: 'failed',
                message: 'Email and password are required'
            })
        }
        //Check if the user exists
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                status: 'failed',
                message: 'User does not exist'
            })
        }
        //Match the password
        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(400).json({
                status: 'failed',
                message: 'Invalid credentials'
            })
        }
        //Create a token
        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        //Send response
        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        })
    }catch(error){
        res.status(500).json({
            status: 'failed',
            message: 'Something went wrong'
        })
    }
}   

const test = async (req, res) => {
    try{
        res.status(200).json({
            status: 'success',
            message: 'Test successful'
        })
    }catch(error){
        res.status(500).json({
            status: 'failed',
            message: 'Something went wrong'
        })
    }
}

const updateUserController = async(req,res)=>{
    try{
        const {name,email,phone,address,password} = req.body
        const user = await userModel.findById(req.user._id)
        const hashedPassword = password ? await hashPassword(password) : undefined
        const updatedUser = await userModel.findByIdAndUpdate(req.user._id, {
            name: name || user.name,
            email: email || user.email,
            phone: phone || user.phone,
            address: address || user.address,
            password: hashedPassword || user.password
        }, {new: true})
        res.status(200).json({
            status: 'success',
            data: {
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                address: updatedUser.address,
                role: updatedUser.role
            }
        })
    }
    catch(error)
    {
        res.status(400).json({
            status: 'fail',
            message: 'Something went wrong'
        })
    }
}
export default { register, login, test, updateUserController }