import express from 'express'
import { admin, protect } from '../middlewares/authMiddlware.js'
import { createProductController,getProductsController,getOneProductController,getProductPhotoController,deleteProductController,updateProductController,getProductFilterController,productCountController,productListController,searchProductController,relatedProductController,getCategoryProductController, checkoutController, getOrders, addToCart, getCartProducts, deleteCartProduct, deleteAllCartItems, addLocalToCart } from '../controller/productController.js'
import formidable from 'express-formidable'

const router = express.Router()

//Get all products
router.get('/all-products', getProductsController)

//Get one product
router.get('/get-product/:slug', getOneProductController)

//Get product photo
router.get('/get-product-photo/:pid', getProductPhotoController)

//Filter product
router.post('/product-filters', getProductFilterController)

//Product count
router.get('/product-count', productCountController)

//Product per page
router.post('/product-list/:page', productListController)

// //Routes
// router.use(protect, admin)

//Create product
router.post('/create-product',protect, admin,formidable(), createProductController)

//Delete product
router.delete('/delete-product/:pid',protect, admin, deleteProductController)

//Update product
router.put('/update-product/:pid',protect, admin,formidable(), updateProductController)

//Search product
router.get('/search/:keyword', searchProductController)

//Similar products
router.get('/related-products/:pid/:cid', relatedProductController)

//Category products
router.get('/category-product/:slug', getCategoryProductController)

//Add items to cart
router.post('/add-to-cart', protect, addToCart)

//Add local items to cart
router.post('/add-local-to-cart', protect, addLocalToCart)

//Get items from cart
router.post('/get-cart', protect, getCartProducts)

//Delete on item from cart
router.post('/delete-from-cart', protect, deleteCartProduct)

//Delete all from cart
router.post('/delete-cart', protect, deleteAllCartItems)

//Checkout 
router.post('/checkout',protect, checkoutController)

//Orders
router.post('/orders', protect, getOrders)

export default router