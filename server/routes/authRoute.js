import express from 'express';
import authController from '../controller/authController.js'
import { admin, protect } from '../middlewares/authMiddlware.js';

//Create router object
const router = express.Router()

//Routes
//Register - POST
router.post('/register',authController.register)

//Login - POST
router.post('/login',authController.login)

//TEST route
router.get('/test', protect, admin, authController.test)

//protected route - GET
router.get('/user-auth', protect, (req,res)=>{
    res.status(200).json({ok:true})
})

//ADMIN - protected route - GET
router.get('/admin-auth', protect, admin, (req,res)=>{
    res.status(200).json({ok:true})
})

//Update user route - PUT
router.put('/profile-update', protect, authController.updateUserController)

export default router

