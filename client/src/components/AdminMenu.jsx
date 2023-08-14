import React from 'react'
import { NavLink } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <>
    <ul className="w-30 h-[15rem] text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-700 dark:text-white p-5 m-3">
        <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600"><NavLink to={'/dashboard/admin'} >Admin Panel</NavLink></li>
        <li className="w-full px-4 py-2 border-b border-gray-200 rounded-t-lg dark:border-gray-600"><NavLink to={'/dashboard/admin/create-category'} >Create Category</NavLink></li>
        <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600"><NavLink to={'/dashboard/admin/create-product'} >Create Product</NavLink></li>
        <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600"><NavLink to={'/dashboard/admin/users'} >All Users</NavLink></li>
        <li className="w-full px-4 py-2 border-b border-gray-200 dark:border-gray-600"><NavLink to={'/dashboard/admin/products'} >Products</NavLink></li>
    </ul>
    </>
  )
}

export default AdminMenu