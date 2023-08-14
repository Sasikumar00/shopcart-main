import Layout from '../components/Layout'
import React from 'react'
import { useSearch } from '../context/Search'
import { useCart } from '../context/Cart'
import { toast } from 'react-hot-toast'
import { useNavigate, useLocation } from 'react-router-dom'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import { useWishlist } from '../context/WishList'
import axios from 'axios'
import { useAuth } from '../context/Auth'

const Search = () => {
    const {auth} = useAuth()
    const {values} = useSearch()
    const {cart, setCart} = useCart()
    const navigate = useNavigate()
    const location = useLocation()
    const {wishlist, setWishlist} = useWishlist()

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
        toast.error('Item removed from wishlist')
      }
      catch(error){
        toast.error('Something went wrong')
      }
    }
  return (
    <Layout title='Search - Results'>
        <div className='p-5'>
            <div className='flex flex-col items-center'>
              {location.state ? '' :(
                <>
                <h1>Search Results For : "{values.keyword}"</h1>
                <h6>{values?.results.length<1?'No products found':`Found ${values?.results.length}`}</h6>
                </>
              )
              }
                <div className='grid grid-cols-3 gap-10 mt-5'>
                {values?.results.map((product,i)=>{
                    return(
                      <div key={product._id} className='relative border border-black rounded-md w-[19rem] flex flex-col items-center p-5'>
                      <div className='absolute top-1 right-1'>
                        {wishlist.findIndex(p=>p._id===product._id)!==-1 ? <AiFillHeart className='text-2xl text-red-500 cursor-pointer' onClick={()=>{
                            removeWishlistItem(product._id)
                        }}/> : <AiOutlineHeart className='text-2xl text-red-500 cursor-pointer' onClick={()=>{
                          setWishlist([...wishlist, product])
                          localStorage.setItem('wishlist', JSON.stringify([...wishlist,product]))
                          toast.success('Item added to wishlist')
                        }}/>}
                      </div>
                      <img  onClick={()=>navigate(`/product/${product.slug}`)} className='w-[11rem] h-[12rem] pb-2 cursor-pointer' src={`${process.env.REACT_APP_API_URL}/api/v1/products/get-product-photo/${product._id}`} alt={product.name}/>
                      <div onClick={()=>navigate(`/product/${product.slug}`)} className='flex flex-col w-full mt-3 cursor-pointer'>
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
            </div>
        </div>
    </Layout>
  )
}

export default Search