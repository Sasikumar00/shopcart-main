import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/UserMenu'
import axios from 'axios'
import {toast} from 'react-hot-toast'
// import { useAuth } from '../../context/Auth'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../../context/Cart'

const Orders = () => {
  // const {auth} = useAuth()
  const auth = JSON.parse(localStorage.getItem('auth'))
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const {cart, setCart} = useCart()
  const getAllOrders = async()=>{
    try{
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/products/orders`, {user: auth?.data._id})
      let products = []
      res?.data.data.map(order=>{
        products = [...products, ...order.products]
      })
      if(loading)
        setLoading(false)
      setOrders(products)
    }
    catch(error){
      toast.error("Something went wrong")
    }
  }

  useEffect(()=>{
    getAllOrders()
  }, [])
  return (
    <Layout title={'Your Orders'}>
        <div className='grid grid-flow-row grid-rows-5 w-full h-full p-10'>
          <UserMenu/>
          <div className='w-full h-full m-3 row-span-4'>
            <h1 className='text-3xl font-bold text-center'>All Orders</h1>
            { loading ? 
              <div className='flex w-full h-full items-center justify-center'>
              <svg aria-hidden="true" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
            </div>
              :
              <div>
                <div className='flex flex-col items-center h-[70vh] col-span-2 mr-10'>
                  <div className='grid grid-flow-row gap-4 w-full h-full justify-center items-center overflow-auto p-10 border-t-2 border-b-2 mt-3'>
                  {orders.length>=1 ? 
                  orders?.reverse().map((product, i)=>(
                    <div key={product._id} className={`flex flex-col items-center ${i+1===orders.length?'': 'border-b-2'} my-2`}>
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
                          <h1 className='font-semibold'>Status</h1>
                          <p className='text-yellow-600'>Pending</p>
                        </div>
                        <div>
                          <h1 className='font-semibold'>Total</h1>
                          <p className='font-bold'>${product.price}</p>
                        </div>
                      </div>
                      <div className='cart-buttons'>
                        <div className="flex justify-between mt-3">
                          <Link className='text-gray-500 m-5 hover:text-gray-700' to={`/product/${product.slug}`}>View</Link>
                          <button className='text-gray-500 m-5 hover:text-red-600' >Cancel Order</button>
                          <button className='text-gray-500 m-5 hover:text-gray-700' onClick={()=>{
                            const {photo, ...cProduct} = product
                            setCart([...cart, cProduct])
                            localStorage.setItem('cart', JSON.stringify([...cart, cProduct]))
                            navigate('/cart')
                          }}>Buy Again</button>
                        </div>
                      </div>
                    </div>
                  ))
                    :
                    <h1>No orders to show</h1>
                  }
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
    </Layout>
  )
}

export default Orders