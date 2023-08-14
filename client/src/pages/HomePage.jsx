import React, {useState, useEffect} from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { Checkbox, Radio} from 'antd'
import { toast } from 'react-hot-toast'
import { Prices } from '../components/Prices'
import { useSearch } from '../context/Search'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/Cart'
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'
import {useWishlist} from '../context/WishList'
// import { useAuth } from '../context/Auth'

const HomePage = () => {
  const navigate = useNavigate()
  // const {auth} = useAuth()
  const auth = JSON.parse(localStorage.getItem('auth'))
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [priceChecked, setPriceChecked] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const {values, setValues} = useSearch({})
  const {cart, setCart} = useCart()
  const {wishlist, setWishlist} = useWishlist()

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

  const getCartFromDatabase = async()=>{
    try{
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/products/get-cart`, {user: auth?.user?._id}, {
            headers: {
              Authorization: `Bearer ${auth?.token}`,
            },
          })
          let cProducts = []
           res.data.data.map(cart=>{
                cProducts = [...cProducts, cart.product]
                return 1
            })
            setCart([...cProducts])
        }   
    catch(error){
        toast.error('Something went wrong')
    }
}

  const addProductToCartDatabase = async(pid)=>{
    try{
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/products/add-to-cart`,
      {products: pid, user: auth?.data._id})
    }
    catch(error){
      toast.error('Something went wrong')
    }
  }

  //Get all products
  const getAllProducts = async()=>{
    try{
      setLoading(true)
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/products/product-list/${page}`)
      if(res.data?.status==='success')
      setLoading(false)
      setProducts(res.data.data)
    }
    catch(error){
      setLoading(false)
    }
  }

  //Get total count
  const getTotal = async()=>{
    try{
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/products/product-count`)
      setTotal(res.data?.data)
    }
    catch(error){
      setLoading(false)
    }
  }

useEffect(()=>{
  if(page===1)return 
  else loadMore()
  //eslint-disable-next-line
}, [page])

  //Load More
  const loadMore = async()=>{
    try{
      setLoading(true)
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/products/product-list/${page}`)
      setLoading(false)
      setProducts([...products, ...res.data.data])
    }
    catch(error){
      setLoading(false)
    }
  }

  useEffect(()=>{
    const localCart = JSON.parse(localStorage.getItem('cart'))
    if(localCart?.length>=1){
      addLocalItemsToCart(localCart)
    }
    setPage(1)
    getTotal()
    setValues({...values, keyword: ''})
    if(cart.length<1){
      getCartFromDatabase()
    }
  //eslint-disable-next-line
  }, [])

  //Get all categories
  const getAllCategories = async()=>{
    try{
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/category/categories`)
      if(res.data?.status==='success'){
        setCategories(res.data.data)
      }
    }
    catch(err){
      toast.error(err.response.data)
    }
  }
  // filterByCategory
  const handleFilter = async(value,id) =>{
    let all = [...checked]
    if(value){
      all.push(id)
    }else{
      all = all.filter(c=>c!==id)
    }
    setChecked(all)
  }

  //Remove from wishlist
  const removeWishlistItem = (pid)=>{
    try{
      let myWishlist = [...wishlist]
      let index = myWishlist.findIndex(p=>p._id===pid)
      myWishlist.splice(index,1)
      setWishlist(myWishlist)
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
      toast.error('Item removed from wishlist')
    }
    catch(error){
      toast.error('Something went wrong')
    }
  }

useEffect(()=>{
  if(!checked.length && !priceChecked.length){
    setPage(1)
    getAllProducts()
  }
  getAllCategories()
  //eslint-disable-next-line
},[checked.length, priceChecked.length])

//Get filtered products
const getFilterProducts = async()=>{
  try{
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/products/product-filters`, {checked,priceChecked})
    setProducts(res.data?.data)
  }catch(error){
    toast.error(error.message)
  }
}
useEffect(()=>{
  if(checked.length || priceChecked.length) getFilterProducts()
  //eslint-disable-next-line
}, [checked, priceChecked])

const handleSubmit = async(e)=>{
  e.preventDefault()
  try{
      const res = await axios(`${process.env.REACT_APP_API_URL}/api/v1/products/search/jacket`)
      setValues({...values, results: res.data.data})
      navigate('/search', {state: {sale: true}});
  }catch(error){
      toast.error('Something went wrong')
  }
}

  return (
    <Layout title={"All Products - Best Offers"}>
        {/* This is the children we are passing as prop to the Layout component */}
        <div className='min-h-[90vh] pt-10'>
          <div className='w-full h-[20rem] flex items-center justify-center'>
            <div className='relative z-5 flex items-center justify-center w-[95%] h-full rounded-2xl bg-center bg-cover before:bg-slate-600/50 before:w-full before:h-full before:absolute before:z-6 before:rounded-2xl' style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/homeCover.jpg)`}}>
              <div className='absolute z-7 flex flex-col items-center'>
              <h1 className='font-semibold text-5xl text-white'>Get Best Offers</h1>
              <h1 className='font-semibold text-2xl text-white'>Upto 60% off on jackets</h1>
              <button onClick={handleSubmit} className='px-5 py-2 mt-5 text-black bg-[#EEE0C9] hover:bg-[#ded0bb] rounded-md'>Shop Now</button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 p-5 mt-10">
          <div className='col-span-2 md:col-span-1 grid grid-flow-row grid-rows-2 h-[60rem] rounded-md border border-slate-300 p-5'>
            <div className='flex flex-col items-center'>
              <h6 className='text-center text-xl'>Filter by category</h6>
              <div className="grid grid-flow-row grid-rows-3 text-center">
                {categories?.map(category=>{
                  return(
                    <Checkbox className='my-2' key={category.id} onChange={(e)=>handleFilter(e.target.checked,category._id)}>{category.name}</Checkbox>
                    )
                  })}
              </div>
            </div>
            <div className='flex flex-col items-center md:mt-[6rem] lg:mt-[1rem]'>
              {/* Price filter */}
              <h6 className='text-center text-xl'>Filter by price</h6>
              <div>
                <Radio.Group className="grid grid-flow-row grid-rows-3 text-center">
                {Prices?.map(price=>{
                  return(
                    <Radio className='my-2' key={price.id} onChange={(e)=>setPriceChecked(e.target.value)} value={price.array}>{price.name}</Radio>
                    )
                  })}
                </Radio.Group>
              </div>
              <button className='bg-red-400 hover:bg-red-500 px-3 py-2 text-white mt-5 font-semibold rounded-md' onClick={()=>{
                if(checked.length || priceChecked.length)
                  window.location.reload()
                }}>Clear filter</button>
            </div>
          </div>
          <div className="col-span-3 md:col-span-4 flex flex-col items-center">
            <h1 className='text-center text-4xl'>All products</h1>
            <div className='grid md:grid-cols-2 xl:grid-cols-3 gap-10 p-5'> 
              {products?.map((product, i)=>{
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
                        auth?.data ? 
                        addProductToCartDatabase(product._id)
                        : localStorage.setItem('cart', JSON.stringify([...cart, product]))
                        toast.success("Item added to cart")
                      }}>Add to cart</button>
                      </div>
                  </div>
                )
              })}
            </div>
            <div className='flex justify-center'>
              {products && products.length<total && (
              loading ? 
              <div>
                <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
              </div>:
              ( checked.length || priceChecked.length ? '' :
              <button className='border border-slate-700 px-3 py-2 rounded-sm' onClick={(e)=>{
                e.preventDefault()
                setPage(page+1)
              }}>
                Load More
              </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage