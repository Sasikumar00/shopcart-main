import React from 'react'
import Layout from '../../components/Layout'
import { useAuth } from '../../context/Auth'
import AdminMenu from '../../components/AdminMenu'

const AdminDashboard = () => {
  const {auth} = useAuth()
  return (
    <Layout>
        <div className='grid grid-cols-2 w-full h-full justify-center items-center p-10'>
          <AdminMenu/>
          <div className='m-3'>
            <h1 className='text-3xl font-bold'>Admin Dashboard</h1>
            <h1 className='text-3xl'>Admin Name: {auth?.user.name}</h1>
            <h1 className='text-3xl'>Admin Email: {auth?.user.email}</h1>
            <h1 className='text-3xl'>Admin Contact: {auth?.user.phone}</h1>
          </div>
        </div>
    </Layout>
  )
}

export default AdminDashboard