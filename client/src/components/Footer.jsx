import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import {AiFillLinkedin, AiFillGithub,AiFillInstagram,AiFillFacebook} from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='w-full bg-[#ADC4CE] text-black text-center absolute bottom-0 shadow-inner pt-5 pb-5'>
      <div className='grid lg:grid-cols-2'>
        <div className='flex flex-col justify-center items-center h-full'>
            <div className='grid grid-cols-3 w-full justify-between'>
                <ul className='flex flex-col items-start px-10 py-4 text-lg'>
                    <li className='font-bold text-base'>SHOPCART</li>
                    <li><Link className='hover:underline' to={'/contact'}>Contact</Link></li>
                    <li><Link className='hover:underline' to={'/about'}>About</Link></li>
                    <li><Link className='hover:underline' to={'/policy'}>Privay & Policy</Link></li>
                </ul>
                <ul className='flex flex-col items-start py-4 px-10 text-lg'>
                    <li className='font-bold text-base'>SHOP</li>
                    <li><Link className='hover:underline' to={'/categories'}>Categories</Link></li>
                    <li><Link className='hover:underline' to={'/'}>Products</Link></li>
                    <li><Link className='hover:underline' to={'/Cart'}>Cart</Link></li>
                </ul>
                <ul className='flex flex-col items-start py-4 px-10 text-lg'>
                    <li className='font-bold text-base'>ACCOUNT</li>
                    <li><Link className='hover:underline' to={'/dashboard/user/profile'}>Profile</Link></li>
                    <li><Link className='hover:underline' to={'/dashboard/user'}>Dashboard</Link></li>
                    <li><Link className='hover:underline' to={'/wishlist'}>Wishlist</Link></li>
                    <li><Link className='hover:underline' to={'/dashboard/user/orders'}>Orders</Link></li>
                </ul>
            </div>
        </div>
        <div className='flex justify-between lg:flex-col items-center px-10'>
          <div className='flex flex-col w-full items-center'>
            <h1 className='text-2xl font-bold mb-3'>Follow us on</h1>
              <ul className='flex w-[30%]'>
                <li className='text-2xl sm:mx-1 hover:text-[#c4a777] transition-all ease-in-out duration-200'><AiFillLinkedin/></li>
                <li className='text-2xl sm:mx-1 hover:text-[#c4a777] transition-all ease-in-out duration-200'><AiFillFacebook/></li>
                <li className='text-2xl sm:mx-1 hover:text-[#c4a777] transition-all ease-in-out duration-200'><AiFillInstagram/></li>
                <li className='text-2xl sm:mx-1 hover:text-[#c4a777] transition-all ease-in-out duration-200'><AiFillGithub/></li>
              </ul>
          </div>
          <hr className='hidden lg:block w-[50%] my-2'/>
          <div className='sm:flex hidden flex-col justify-center items-center h-full mb-1'>
              <h1 className='text-2xl font-bold'>Subscribe to our newsletter</h1>
            <p className='text-base mb-2'>Get the latest news and updates from Shopcart</p>
            <div className='flex justify-center items-center'>
                <input className='border border-black rounded-md p-2 w-[20rem] text-black outline-none' type='text' placeholder='Enter your email address'/>
                <button className='bg-black text-white rounded-md p-2 ml-2 hover:bg-gray-900 transition-all ease-in-out duration-200' onClick={()=>{
                  toast.error('This feature is under development')
                }}>Subscribe</button>
            </div>
          </div>
        </div>
      </div>
          <hr />
          <h1 className='text-base font-semibold mt-5'>&copy;Copyright. All rights reserved</h1>
          <p className='text-sm'>Made with ❤️ by Sasikumar</p>
      <h1 className='text-red-600 absolute bottom-0 right-2'>NOTE: Not mobile responsive</h1>
    </div>
  )
}

export default Footer