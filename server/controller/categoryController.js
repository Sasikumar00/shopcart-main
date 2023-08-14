import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async(req,res)=>{
    try{
        const {name} = req.body;
        const existingCategory = await categoryModel.findOne({name});
        if(existingCategory){
            return res.status(400).json({
                status: 'fail',
                message: 'Category already exists'
            })
        }
        const slug = slugify(name);
        const newCategory = await categoryModel({name,slug}).save();
        res.status(201).json({
            status: 'success',
            message: 'Category created successfully',
            data: newCategory
        })
    }
    catch(error){
        res.status(500).json({
            status: 'fail',
            message: 'Something went wrong'
        })
    }
}

export const updateCategoryController = async(req,res)=>{
    try{
    const {id} = req.params;
    const {name} = req.body;
    const updatedCategory = await categoryModel.findByIdAndUpdate(id,{name,slug: slugify(name)}, {new: true});
    res.status(200).json({
        status: 'success',
        message: 'Category updated successfully',
        data: updatedCategory
    })
    }
    catch(error){
        res.status(500).json({
            status: 'fail',
            message: 'Something went wrong'
        })
    }
}

export const getAllCategoryController = async(req,res)=>{
    try{
        const categories = await categoryModel.find();
        res.status(200).json({
            status: 'success',
            data: categories
        })
    }
    catch(error){
        res.status(500).json({
            status: "fail",
            message: 'Something went wrong'
        })
    }
}

export const getOneCategoryController = async(req,res)=>{
    try{
        const {slug} = req.params
        const category = await categoryModel.findOne({slug: slug})
        if(category){
            res.status(200).json({
                status: 'success',
                data: category
            })
        }
        else{
            res.status(404).json({
                status: 'fail',
                message: 'No category found'
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

export const deleteCategoryController = async(req,res)=>{
    try{
    const {id} = req.params
    await categoryModel.findByIdAndDelete({_id: id})
    res.status(200).json({
        status: 'success',
        message: 'Category deleted successfully'
    })
    }
    catch(error){
        res.status(500).json({
            status: 'fail',
            message: 'Something went wrong'
        })
    }

}