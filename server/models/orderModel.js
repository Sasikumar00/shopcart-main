import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    products: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
})

const orderModel = mongoose.model('Order', orderSchema);

export default orderModel;