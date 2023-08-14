import React from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'

const Users = () => {
  return (
    <Layout>
         <div className='grid grid-cols-2 w-full h-full justify-center items-center border p-10'>
          <AdminMenu/>
          <div className='m-3'>
            <h1>Users</h1>
          </div>
        </div>
    </Layout>
  )
}

export default Users