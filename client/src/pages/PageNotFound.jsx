import React from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <Layout title={'404 Page not found - Ecommerce'}>
        <div className="flex flex-col h-[80vh] items-center justify-center">
            <h1 className='flex font-bold text-9xl'><p className='hover:text-red-500'>4</p><p className='hover:text-red-500'>0</p><p className='hover:text-red-500'>4</p></h1>
            <h2 className='text-4xl'>Oops ! Page Not Found</h2>
            <Link className='rounded-sm text-2xl mt-5 border border-black p-2 hover:bg-green-600 hover:text-white transition ease-in-out duration-300' to={'/'}>Go Back</Link>
        </div>
    </Layout>
  )
}

export default PageNotFound