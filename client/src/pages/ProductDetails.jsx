import axios from 'axios'
import Layout from '../components/Layout'
import React,{useState, useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useWishlist } from '../context/WishList'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import { toast } from 'react-hot-toast'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/Auth'

const ProductDetails = () => {
  const {auth} = useAuth()
    const navigate = useNavigate()
    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
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

    const getSimilarProducts = async(pid,cid)=>{
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/products/related-products/${pid}/${cid}`)
            setRelatedProducts(res.data?.data)
        }
        catch(error){
            toast.error('Something went wrong')
        }
    }

    const getProduct = async()=>{
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/products/get-product/${params.slug}`)
            setProduct(res.data?.data)
            getSimilarProducts(res.data?.data._id, res.data?.data.category._id)
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

    useEffect(()=>{
        if(params?.slug) getProduct()
        // eslint-disable-next-line
    }, [params.slug])
  return (
    <Layout>
        <div className='relative grid grid-cols-3 p-5'>
            <div>
            <img className='w-[25rem]' src={`${process.env.REACT_APP_API_URL}/api/v1/products/get-product-photo/${product._id}`} alt={product.name}/>
            </div>
            <div className='col-span-2 px-10'>
                <h1 className='text-3xl font-semibold mb-2'>{product.name}</h1>
                <h1 className='font-semibold mt-5'>Description:</h1>
                <p className='mb-2'>{product.description}</p>
                <p className='text-xl font-bold'>${product.price}</p>
                <p className='text-gray-500'>Category: {product.category?.name}</p>
                <div className='flex items-center'>
                <button className='px-3 py-2.5 bg-black text-white font-semibold mt-3 mr-4 rounded-md' onClick={()=>{
                setCart([...cart, product])
                localStorage.setItem('cart', JSON.stringify([...cart, product]))
                navigate('/cart')
                }}>Buy Now</button>
                <button className='px-3 py-2 border-2 border-[#c4a777] text-[#c4a777] font-semibold mt-3 rounded-md' to={`/dashboard/admin/product/${product.slug}`} onClick={()=>{

                  setCart([...cart, product])
                  auth?.user ? 
                  addProductToCartDatabase(product._id)
                  : localStorage.setItem('cart', JSON.stringify([...cart, product]))
                  toast.success("Item added to cart")

                  }}>Add to cart</button>
                {wishlist.findIndex(p=>p._id===product._id)!==-1 ? <AiFillHeart className='ml-5 mt-2 text-3xl text-red-500 cursor-pointer' onClick={()=>{
                    removeWishlistItem(product._id)
                }}/> : <AiOutlineHeart className='ml-5 mt-2 text-3xl text-red-500 cursor-pointer' onClick={()=>{
                    setWishlist([...wishlist, product])
                    localStorage.setItem('wishlist', JSON.stringify([...wishlist,product]))
                    toast.success('Item added to wishlist')
                }}/>}
                </div>
            </div>
        </div>
        {relatedProducts.length>0?
        <div className='p-5'>
            <h1 className='font-semibold text-xl'>Similar products</h1>
            <div className='flex mt-3 overflow-auto'>
            {relatedProducts.map((product)=>{
                    return(
                        <div key={product._id} className='relative border border-black rounded-md w-[19rem] flex flex-col items-center p-5 mr-5'>
                        <div className='absolute top-1 right-1'>
                            {wishlist.findIndex(p=>p._id===product._id)!==-1 ? <AiFillHeart className='text-2xl text-red-500 cursor-pointer' onClick={()=>{
                                removeWishlistItem(product._id)
                            }}/> : <AiOutlineHeart className='text-2xl text-red-500 cursor-pointer' onClick={()=>{
                            setWishlist([...wishlist, product])
                            localStorage.setItem('wishlist', JSON.stringify([...wishlist,product]))
                            toast.success('Item added to wishlist')
                            }}/>}
                        </div>
                      <img  onClick={()=>navigate(`/product/${product.slug}`)} className='w-[8rem] h-[9rem] pb-2 cursor-pointer' src={`${process.env.REACT_APP_API_URL}/api/v1/products/get-product-photo/${product._id}`} alt={product.name}/>
                      <div onClick={()=>navigate(`/product/${product.slug}`)} className='flex flex-col w-full mt-3 cursor-pointer'>
                      <div className='w-full flex justify-between items-center'>
                        <h3 className='text-base font-semibold'>{product.name}</h3>
                        <p className='text-base font-semibold'>${product.price}</p>
                      </div>
                      <p className='text-gray-600 text-sm'>{product.description?.substring(0,35)}...</p>
                      </div>
                      <div className='flex mt-2'>
                      <button className='px-3 py-1 border-2 border-[#c4a777] m-1 text-[#c4a777] font-semibold rounded-full' onClick={()=>{
                        setCart([...cart, product])
                        localStorage.setItem('cart', JSON.stringify([...cart, product]))
                        navigate('/cart')
                      }}>Buy Now</button>
                      <button className='px-3 py-1 bg-slate-500 m-1 text-white font-semibold rounded-full' onClick={()=>{

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
        : ''}
    </Layout>
  )
}

export default ProductDetails