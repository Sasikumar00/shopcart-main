import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
  return (
    <>
    <ul className="w-[30%] flex justify-between">
        <li className="text-xl transition-all ease-in-out duration-300 border-2 rounded-md px-3 h-[2rem] hover:text-[#c4a777] hover:border-[#c4a777]"><NavLink to={'/dashboard/user'} >Dashboard</NavLink></li>
        <li className="text-xl transition-all ease-in-out duration-300 border-2 rounded-md px-3 h-[2rem] hover:text-[#c4a777] hover:border-[#c4a777]"><NavLink to={'/dashboard/user/profile'} >Profile</NavLink></li>
        <li className="text-xl transition-all ease-in-out duration-300 border-2 rounded-md px-3 h-[2rem] hover:text-[#c4a777] hover:border-[#c4a777]"><NavLink to={'/dashboard/user/orders'} >Orders</NavLink></li>
    </ul>
    </>
  )
}

export default UserMenu