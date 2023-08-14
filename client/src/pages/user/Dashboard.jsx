import React from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/UserMenu'
import { useAuth } from '../../context/Auth'

const Dashboard = () => {
  const {auth} = useAuth()
  return (
    <Layout title={"Dashboard - Ecommerce"}>
        <div className='grid grid-flow-row grid-rows-4 w-full h-full p-10'>
          <UserMenu/>
          <div className='flex w-full justify-between row-span-3'>
          <div className='flex flex-col justify-between'>
            <h1 className='text-4xl font-bold'>Dashboard</h1>
            <h1 className='mt-5'><span className='font-bold'>Name:</span> {auth?.user?.name}</h1>
            <h1 className='mt-5'><span className='font-bold'>Email:</span> {auth?.user?.email}</h1>
            <h1 className='mt-5'><span className='font-bold'>Phone Number:</span> {auth?.user?.phone}</h1>
            <h1 className='mt-5'><span className='font-bold'>Address:</span> {auth?.user?.address}</h1>
          </div>
          <div className='border-2 w-[50%] h-full flex flex-col items-center'>
              <h1 className='font-semibold text-center text-xl'>Recent Orders</h1>
              <div className='h-full flex items-center'>
                <p>No recent orders</p>
              </div>
          </div>
          </div>
        </div>
    </Layout>
  )
}

export default Dashboard