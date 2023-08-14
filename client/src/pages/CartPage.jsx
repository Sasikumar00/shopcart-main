import React, {useEffect, useState} from 'react'
import Layout from '../components/Layout'
import { useCart } from '../context/Cart'
// import { useAuth } from '../context/Auth'
import { useNavigate, Link } from 'react-router-dom'
import { loadStripe } from "@stripe/stripe-js"; 
import axios from 'axios'
import { toast } from 'react-hot-toast'
import {BsBagCheck} from 'react-icons/bs'
import {MdPayment} from 'react-icons/md'
import { useWishlist } from '../context/WishList'


const CartPage = () => {
  const navigate = useNavigate()
  const {cart, setCart} = useCart()
  // const {auth} = useAuth() 
  const auth = JSON.parse(localStorage.getItem('auth'))
  const {wishlist, setWishlist} = useWishlist()

const totalPrice =()=>{
  try{
    let total = 0
    cart?.map(item=>{
      total=total+item.price
      return 1
    })
    return total
  }catch(error){
    toast.error('Something went wrong')
  }
}

  const removeCartItem = (pid)=>{
    try{
      let myCart = [...cart]
      let index = myCart.findIndex(item=>item._id===pid)
      myCart.splice(index, 1)
      setCart(myCart)
      localStorage.setItem('cart', JSON.stringify(myCart))
    }catch(error){
      toast.error('Something went wrong')
    }
  }

  const handleCheckout = async()=>{
    if(cart.length<1){
      toast.error('Please add some items to cart')
      return
    }
    if(localStorage.getItem('auth')===null){
      window.location.reload()
    }
    try{
      const stripe = await loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`)
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/products/checkout`,
      //Set body to cart
      {cart, user: auth?.data._id}, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      })
      const sessionId = res?.data.data
      const result = stripe.redirectToCheckout({
        sessionId
      })
      if(result.error){
        toast.error(`${result.error.message}`)
      }
  }
  catch(error){
    toast.error('Something went wrong')
  }
  }

  // const addToWishList = (prod)=>{
  //   setWishlist([...wishlist, prod])
  //   localStorage.setItem('wishlist', JSON.stringify([...wishlist,prod]))
  // }

  const deleteItemFromCart = async(pid)=>{
    try{
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/products/delete-from-cart`, {userID: auth?.data._id, pid}, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      })
      if(res?.data.status==='success'){
        toast.success('Item removed from cart')
        window.location.reload()
      }
    }
    catch(error){
      toast.error(error.message)
    }
  }

  const addLocalItemsToCart = async(p)=>{
    try{
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/products/add-local-to-cart`,{
        products: p,
        user: auth?.data._id
      }, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      })
      if(res?.data.status==='success'){
        localStorage.removeItem('cart')
      }
    }
    catch(error){
      toast.error("Something went wrong")
    }
  }

  useEffect(()=>{
    if(auth?.data._id){
    const localCart = JSON.parse(localStorage.getItem('cart'))
    if(localCart?.length>=1){
      addLocalItemsToCart(localCart)
    }
  }
  }, [auth])

  return (
    <Layout>
      <div className='p-5'>
        {/* {loading?'loading...':JSON.stringify(products)} */}
        <div className='w-full flex flex-col items-center'>
          <h1 className='text-3xl font-bold flex items-center'><BsBagCheck className='mr-2'/>My Cart</h1>
          <h4 className='text-yellow-500 text-xl'>{cart?.length>=1 ? `You have ${cart.length} items in the cart ${auth?.token ? '' : 'Please login to checkout'}` : 'Your Cart is empty'}</h4>
        </div>
        <div className='grid grid-flow-row lg:grid-flow-col lg:grid-cols-3 mt-3 w-full'>
          <div className='flex flex-col items-center h-[60vh] col-span-2 mr-10'>
            {/* {loading ? 'Loading...' : */}
            <div className='grid grid-flow-row gap-4 w-full h-[50vh] justify-center items-center overflow-auto p-10 border-t-2 border-b-2 mt-3'>
            {cart?.length>=1 ? 
            cart?.map((product,i)=>(
              <div key={product._id} className='flex flex-col items-center border-b-2 my-2'>
                <div className=' w-[100%] grid grid-cols-5 gap-4 p-2'>
                  <img className='w-[10rem]' src={`${process.env.REACT_APP_API_URL}/api/v1/products/get-product-photo/${product._id}`} alt={product.name}/>
                  <div>
                  <h3 className='text-base font-semibold'>{product.name}</h3>
                  <p className=' text-gray-600'>{product.description.substring(0,30)}...</p>
                  </div>
                  <div>
                  <p className='font-semibold'>Price:</p> 
                  <p className='font-bold'>${product.price}</p>
                  </div>
                  <div>
                    <h1 className='font-semibold'>Quantity</h1>
                    <select name="" id="" className='border-2 outline-none px-5'>
                      <option value={1}>1</option>
                      <option value={2}>2</option>
                      <option value={3}>3</option>
                      <option value={4}>4</option>
                      <option value={5}>5</option>
                      <option value={6}>6</option>
                      <option value={7}>7</option>
                      <option value={8}>8</option>
                      <option value={9}>9</option>
                      <option value={10}>10</option>
                    </select>
                  </div>
                  <div>
                    <h1 className='font-semibold'>Total</h1>
                    <p className='font-bold'>${product.price}</p>
                  </div>
                </div>
                <div className='cart-buttons'>
                  <div className="flex justify-between mt-3">
                    <Link className='text-gray-500 m-5 hover:text-gray-700' to={`/product/${product.slug}`}>View</Link>
                    <button className='text-gray-500 m-5 hover:text-red-600' onClick={()=>deleteItemFromCart(product._id)}>Remove</button>
                    <Link className='text-gray-500 m-5 hover:text-gray-700' onClick={()=>{
                      if(wishlist.findIndex(p=>p._id===product._id)!==-1) return toast.error('Item is already in the wishlist')
                      auth?.data._id ? 
                      deleteItemFromCart(product._id)
                      :
                      removeCartItem(product._id)
                      setWishlist([...wishlist, product])
                      localStorage.setItem('wishlist', JSON.stringify([...wishlist,product]))
                      toast.success('Item added to wishlist')
                    }}>Move to Wishlist</Link>
                  </div>
                </div>
              </div>
            ))
              :
              <h1>No items in your cart</h1>
            }
            </div>
            {/* } */}
            <div className='flex justify-between w-[65%] mt-5'>
              <h1 className='font-bold'>Items: {cart?.length ? cart.length : 0}</h1>
              <h1 className='font-bold'>Total: ${totalPrice()}</h1>
            </div>
          </div>
          <div className='flex w-[90vw] lg:w-full justify-between flex-col'>
            <div className=''>
            <div className='flex flex-col items-center mt-6 sm:mt-4 justify-center'>
              <div className='flex flex-col h-full mb-1 w-[50%]'>
                <h1 className='text-base font-bold font-serif'>Enter Coupon Code</h1>
                <div className='flex justify-center items-center'>
                  <input className='border border-black rounded-md p-2 w-[20rem] text-black outline-none' type='text' placeholder='Enter your coupon code'/>
                  <button className='bg-black text-white rounded-md p-2 ml-2 hover:bg-gray-900 transition-all ease-in-out duration-200' onClick={()=>{
                    toast.error('This feature is under development')
                  }}>Submit</button>
                </div>
              </div>
            </div>
            <div className='mt-5'>
            <h1 className='text-base text-gray-500 w-full flex justify-between'><span className='font-semibold'>Shipping:</span> $0</h1>
            <h1 className='text-base text-gray-500 w-full flex justify-between'><span className='font-semibold'>Delivery:</span> $0</h1>
            <h1 className='text-base text-gray-500 w-full flex justify-between'><span className='font-semibold'>Tax:</span> $0</h1>
            <h1 className='text-2xl w-full flex justify-between'><span className='font-semibold'>Estimated Total:</span> ${totalPrice()}</h1>
            </div>
            </div>
            {auth?.data.address ? (
              <>
                <div className='mt-2 flex flex-col'>
                  <div className='border-2 p-5 rounded-md text-gray-500'>
                  <h1 className='text-base'><span className='font-semibold'>Deliver Address:</span> {auth?.data.address}</h1>
                  <button onClick={()=>navigate('/dashboard/user/profile')} className='border-2 border-yellow-300 hover:bg-yellow-300 px-1 py-1 rounded-md mt-1 text-sm'>Edit address</button>
                  </div>
                  <button onClick={handleCheckout} className='border-2 border-pink-300 hover:bg-pink-300 px-2 py-3 rounded-md mt-4 flex items-center justify-center font-bold'><MdPayment className='text-xl mr-2'/>Checkout</button>
                </div>
              </>
            ) : (
              <div>
                {auth?.token ? (
                  <button onClick={()=>navigate('/dashboard/user/profile')} className='border-2 border-yellow-300 hover:bg-yellow-300 px-2 py-1 rounded-md mt-1'>Edit address</button>
                )
                  :(
                  cart.length>=1 ?
                  <button onClick={()=>navigate('/login', {state: '/cart'})} className='border-2 border-yellow-300 hover:bg-yellow-300 px-2 py-1 rounded-md mt-1'>Log in to checkout</button>
                  :
                  <button onClick={()=>navigate('/login')} className='border-2 border-yellow-300 hover:bg-yellow-300 px-2 py-1 rounded-md mt-1'>Log in to add items to cart</button>
                  )
                }
              </div>
            )}
            </div>
          </div>
      </div>
    </Layout>
  )
}

export default CartPage