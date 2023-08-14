import express from 'express';
import { protect,admin } from '../middlewares/authMiddlware.js';
import { createCategoryController, updateCategoryController,getAllCategoryController,deleteCategoryController,getOneCategoryController } from '../controller/categoryController.js';


const router = express.Router();

//Get all categories
router.get('/categories', getAllCategoryController )

//Routes
router.use(protect,admin)
//Create Category
router.post('/create-category', createCategoryController);

//Update Category
router.put('/update-category/:id', updateCategoryController);


//Get one category
router.get('/get-category/:slug', getOneCategoryController)

//Delete category
router.delete('/delete-category/:id',deleteCategoryController)

export default router;