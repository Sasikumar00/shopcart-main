import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/Cart'
import axios from 'axios'

const ThankYou = () => {
    const navigate = useNavigate()
    const [count, setCount] = useState(5)
    const auth = JSON.parse(localStorage.getItem('auth'))
    const {setCart} = useCart()
    const clearCart = async()=>{
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/products/delete-cart`, {
        userID: auth?.data._id
      }, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      })
      // setCart([])
      localStorage.removeItem('cart')
    }
    useEffect(()=>{
      clearCart()
      // eslint-disable-next-line
    },[])
    useEffect(()=>{
        const timer = setTimeout(()=>{
            setCount(count-1)
        }, 1000)
        if(count===0){
            navigate('/dashboard/user/orders')
        }
        return ()=>clearTimeout(timer)
        // eslint-disable-next-line
    },[count])
  return (
    <div className='flex flex-col h-screen w-full items-center justify-center'>
        <h1 className='text-3xl text-green-600 font-bold'>Payment Successful</h1>
        <h1 className='text-base text-gray-500'>Thank you for placing your order</h1>
        <p>Redirecting in {count}</p>
    </div>
  )
}

export default ThankYou