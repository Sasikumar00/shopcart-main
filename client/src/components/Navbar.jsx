import React, { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import { useAuth } from '../context/Auth'
import Dropdown from './Dropdown'
import { useUserDropDown } from '../context/dropdownUserContext'
import { useCategoryDropDown } from '../context/dropdownCategoriesContext'
import SearchInput from './SearchInput'
import { useCart } from '../context/Cart'
import { Badge } from 'antd';
import axios from 'axios'

const Navbar = () => {

  const {auth} = useAuth()
  const {isOpen, setIsOpen} = useUserDropDown()
  const {isCategoryOpen, setIsCategoryOpen} = useCategoryDropDown()
  const {cart, setCart} = useCart()

  const handleMenu = () => {
    if(isOpen) setIsOpen(!isOpen)
    if(isCategoryOpen) setIsCategoryOpen(!isCategoryOpen)
  }
  return (
    <div>
    <nav className="flex items-center justify-between flex-wrap text-black p-6">
    <div className="flex items-center flex-shrink-0 text-black mr-6">
    <Link  onClick={handleMenu} className='text-2xl text-[#c4a777]' to={'/'}>🛒ShopCart</Link>
    </div>
    <div className='hidden lg:block'>
        <ul className='flex items-center text-xl'>
            <li  onClick={handleMenu} className='px-5'><NavLink className={({isActive})=>isActive?'text-[#c4a777]':''} to={'/'}>Home</NavLink></li>
            <Dropdown type={'categories'}/>
            {
            !auth.user?(
            <>
            <li className='px-5'><NavLink className={({isActive})=>isActive?'text-[#c4a777]':''} to={'/signup'}>SignUp</NavLink></li>
            <li className='px-5'><NavLink className={({isActive})=>isActive?'text-[#c4a777]':''} to={'/login'}>Login</NavLink></li>
            </>
            ):
            (
            <>
            <Dropdown type={'user'}/>
            </>
            )
            }
            <li  onClick={handleMenu} className='px-5'><NavLink className='flex items-center' to={'/cart'}>
            <Badge className='mt-2 mr-4' size='small' count={cart?.length} showZero>
              <AiOutlineShoppingCart className='text-[1.5rem]'/>
            </Badge>
            </NavLink></li>
            <li className='mt-2'><SearchInput/></li>
        </ul>
    </div>
    </nav>
    </div>
  )
}

export default Navbar