import React from 'react'
import Layout from '../components/Layout'
import { useWishlist } from '../context/WishList'
import { useCart } from '../context/Cart'
import { toast } from 'react-hot-toast'
import {AiFillHeart} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../context/Auth'


const WishlistPage = () => {
  const {auth} = useAuth()
  const navigate = useNavigate()
  const {wishlist, setWishlist} = useWishlist()
  const {cart, setCart} = useCart()

  const addProductToCartDatabase = async(pid)=>{
    try{
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/products/add-to-cart`,
      {products: pid, user: auth?.user._id})
    }
    catch(error){
      toast.error('Something went wrong')
    }
  }
  
  const removeWishlistItem = (pid)=>{
    try{
      let myWishlist = [...wishlist]
      let index = myWishlist.findIndex(p=>p._id===pid)
      myWishlist.splice(index,1)
      setWishlist(myWishlist)
      localStorage.setItem('wishlist', JSON.stringify(myWishlist))
      toast.error('Item removed from cart')
    }
    catch(error){
      toast.error('Something went wrong')
    }
  }
  return (
    <Layout>
        <div className='w-full min-h-[50vh] justify-center items-center p-10'>
            <div className='m-3 w-full'>
                <h1 className='text-3xl text-center font-bold mb-4'>Your <span className='text-[#c4a777]'>Wishlist</span></h1>
              { wishlist.length>=1 ?
                <div className='w-full grid grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-center'>
                {wishlist.reverse().map((product)=>{
                  return(
                    <div key={product._id} className='relative border border-black rounded-md w-[19rem] flex flex-col items-center p-5'>
                      <div className='absolute top-1 right-1'>
                      <AiFillHeart className='text-2xl text-red-500 cursor-pointer' onClick={()=>{removeWishlistItem(product._id)}}/>
                      </div>
                      <img  onClick={()=>navigate(`/product/${product.slug}`)} className='w-[11rem] h-[12rem] pb-2' src={`${process.env.REACT_APP_API_URL}/api/v1/products/get-product-photo/${product._id}`} alt={product.name}/>
                      <div onClick={()=>navigate(`/product/${product.slug}`)} className='flex flex-col w-full mt-3'>
                      <div className='w-full flex justify-between items-center'>
                        <h3 className='text-base font-semibold'>{product.name}</h3>
                        <p className='text-base font-semibold'>${product.price}</p>
                      </div>
                      <p className='text-gray-600 text-sm'>{product.description?.substring(0,35)}...</p>
                      </div>
                      <div className='flex mt-2'>
                      <button className='px-4 py-2 border-2 border-[#c4a777] m-1 text-[#c4a777] font-semibold rounded-full' onClick={()=>{
                        setCart([...cart, product])
                        localStorage.setItem('cart', JSON.stringify([...cart, product]))
                        navigate('/cart')
                      }}>Buy Now</button>
                      <button className='px-3 py-2 bg-slate-500 m-1 text-white font-semibold rounded-full' onClick={()=>{

                      setCart([...cart, product])
                      auth?.user ? 
                      addProductToCartDatabase(product._id)
                      : localStorage.setItem('cart', JSON.stringify([...cart, product]))
                      toast.success("Item added to cart")

                      }}>Add to cart</button>
                      </div>
                    </div>
                    )
                    })}
                  </div>
            :
            <div className='h-[50vh] flex items-center justify-center'>
              <h1>No items in your wishlist</h1>
            </div>
          }
            </div>
        </div>
    </Layout>
  )
}

export default WishlistPage