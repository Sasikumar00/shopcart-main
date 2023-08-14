import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
    product:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

const cartModel = mongoose.model('Cart', cartSchema);

export default cartModel;