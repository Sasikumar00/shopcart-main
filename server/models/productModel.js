import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Product name required"]
    },
    slug:{
        type: String,
        require: [true, 'Slug required for product'],
        lowercase: true,
    },
    description:{
        type: String,
        required: [true, 'Description required for the product']
    },
    price:{
        type: Number,
        required: [true, "Price required for the product"]
    },
    //Parent Referencing
    category: {
        type: mongoose.ObjectId,
        ref: 'Category',
        required: [true, 'Product must be linked to a category']
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity is required']
    },
    photo:{
        data: Buffer,
        contentType: String
    },
    shipping:{
        type: Boolean
    }
}, {timestamps: true})

const productModel = mongoose.model('Product', productSchema)

export default productModel