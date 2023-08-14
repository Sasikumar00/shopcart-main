import JWT from 'jsonwebtoken'
import User from '../models/userModel.js'

//Protected Routes
export const protect = async (req, res, next) => {
    try{
    if(!req.headers.authorization.startsWith('Bearer')){
        return res.status(401).json({
            status: 'failed',
            message: 'Unauthorized'
        })
    }
    const token = req.headers.authorization.split(' ')[1];
    const decode = await JWT.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
    }catch(error){
        res.status(401).json({
            status: 'failed',
            message: 'Unauthorized'
        })
    }
}

//Admin Routes
export const admin = async (req, res, next) => {
    try{
        const user = await User.findById(req.user._id)
        if(user.role !== 'admin'){
            return res.status(401).json({
                status: 'failed',
                message: 'Unauthorized'
            })
        }
        next();
    }catch(error){
        res.status(401).json({
            status: 'failed',
            message: error.message
        })
    }
}