import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useAuth } from '../context/Auth'
import { useUserDropDown } from '../context/dropdownUserContext'
import { useCategoryDropDown } from '../context/dropdownCategoriesContext'
import useCategory from '../hooks/useCategory'
import { useCart } from '../context/Cart'
// import { logoutChannel } from '../utils/createLogoutChannel'

const DropdownMenu = ({type}) => {
    const {isOpen, setIsOpen} = useUserDropDown()
    const {isCategoryOpen, setIsCategoryOpen} = useCategoryDropDown()
    const {auth, setAuth} = useAuth()
    const {cart, setCart} = useCart()
    let categories = useCategory()
    if(categories.length>5) categories=categories.slice(0,5)
    const handleUserMenu = () => {
      if(isCategoryOpen) setIsCategoryOpen(!isCategoryOpen)
        setIsOpen(!isOpen)
    }
    const handleCategoryMenu = () => {
      if(isOpen) setIsOpen(!isOpen)
        setIsCategoryOpen(!isCategoryOpen)
    }
    const handleLogout=()=>{
        setAuth({
          //We use the spread operator because we don't want to affect the already existing data in the auth state object.
          //We just want to update the required field
          ...auth,
          user: null,
          token: ""
        })
        setCart([])
        localStorage.removeItem('auth')
        // logoutChannel.postMessage({ type: "logout" });
        toast.success("Logged out successfully")
      }
  return (
    <>
      {type==='user'?
      <div className='relative px-4 z-10'>
          <button className='underline flex items-center justify-center text-black' onClick={handleUserMenu}>{auth?.user.name.split(' ')[0]}<svg className="w-4 h-4 ml-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
          {isOpen && (
          <div className="flex flex-col rounded-md mt-2 dropdown-menu absolute top-full left-[-6rem] bg-white text-black px-5 py-3 border border-slate-700">
              <div>
                  <p className='text-base'>Signed in as {auth?.user.email}</p>
                  <hr className='my-2'/>
              </div>
              <NavLink className="hover:text-[#c4a777]" onClick={handleUserMenu}  to={`/dashboard/${auth?.user.role==='user'?'user/profile':'admin'}`}>Profile</NavLink>
              <NavLink className="hover:text-[#c4a777]" onClick={handleUserMenu} to={`/dashboard/${auth?.user.role}`}>Dashboard</NavLink>
              <NavLink className="hover:text-[#c4a777]" onClick={handleUserMenu}  to={'/cart'}>Cart</NavLink>  
              <NavLink className="hover:text-[#c4a777]" onClick={handleUserMenu}  to={'/wishlist'}>Wishlist</NavLink>
              <NavLink className="hover:text-[#c4a777]" onClick={handleLogout}  to={'/login'}>Logout</NavLink>
          </div>
          )}
      </div>
      : 
      <div className='relative px-4 z-10'>
        <button className='underline flex items-center justify-center' onClick={handleCategoryMenu}>Categories<svg className="w-4 h-4 ml-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg></button>
        {isCategoryOpen && (
        <div className="flex w-[10rem] flex-col rounded-md mt-2 dropdown-menu absolute top-full bg-white text-black px-5 py-3 border border-slate-700">
          <ul>
          <div>
            <li><Link to={`/categories`} className='text-base' onClick={handleCategoryMenu}>All Categories</Link></li>
            {/* <hr className='h-0.5 mx-auto bg-gray-100 border-0 rounded dark:bg-gray-300'/> */}
            </div>
            <h1 className='font-semibold text-sm text-[#b79b6d] mt-2'>Latest & Trending</h1>
          {categories.map((category)=>{
            return(
              <div>
              <li className="text-base my-2 hover:text-[#c4a777]"><Link to={`/category/${category.slug}`} onClick={handleCategoryMenu}>{category.name}</Link></li>
              <hr className='h-0.5 mx-auto bg-gray-200 border-0 rounded'/>
              </div>
            )
          })}
          </ul>
        </div>
        )}
      </div>
      }
    </>
  )
}

export default DropdownMenu