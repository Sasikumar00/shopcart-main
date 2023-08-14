import Layout from '../components/Layout'
import React, {useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCart } from '../context/Cart'
import { toast } from 'react-hot-toast'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import { useWishlist } from '../context/WishList'
import { useAuth } from '../context/Auth'

const CategoryItems = () => {
  const params = useParams()
  const navigate = useNavigate()
  const {auth} = useAuth()
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(false)
  const {cart, setCart} = useCart()
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

  const getCategoryProduct = async()=>{
    try{
      setLoading(true)
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/products/category-product/${params.slug}`)
      setProducts(res.data?.data.products)
      setCategory(res.data?.data.category)
      setLoading(false)
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
  useEffect(()=>{
    if(params.slug)getCategoryProduct()
    //eslint-disable-next-line
  }, [params.slug])
  return (
    <Layout>
      {loading?
        <div className='flex justify-center items-center h-[90vh]'>
          <svg aria-hidden="true" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
        </div>
          :
        <div className='w-full min-h-[50vh] p-5'>
          <h1 className='text-5xl font-semibold text-[#c4a777]'>{category.name}</h1>
          <h3 className='mb-5 text-xl'>Results found: {products.length}</h3>
          {products.length>=1 ?
          <div className='w-full grid grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-center'>
            {products.map((product,i)=>{
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
          :
          <div className='w-full h-[30vh] flex items-center justify-center'>
            <h1>No products found</h1>
          </div>
          }
        </div>
      }
    </Layout>
  )
}

export default CategoryItems