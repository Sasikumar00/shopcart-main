import React from 'react'
import Layout from '../components/Layout'

const Contact = () => {
  return (
    <Layout title={"Contact - Ecommerce"}>
        <div className='grid grid-cols-2 w-full h-[80vh] items-center p-10'>
        <img className='w-[50rem]' src='/images/customer-care.png' alt="" />
        <div className='h-[50%]'>
            <h1 className='text-5xl bg-gray-800 text-center p-2 text-white'>Contact Us</h1>
            <p className='text-lg py-2 md:py-5'>For any queries or information on the product. Kindly reach out to use through the helpine details</p>
            <p className='text-lg py-2 md:py-5'>Phone: 123-456-7890</p>
            <p className='text-lg py-2 md:py-5'>Email: helpline@ecommerce.com</p>
            <p className='text-lg py-2 md:py-5'>Telephone: 18999-3300-2200 (toll free)</p>
        </div>
        </div>
    </Layout>
  )
}

export default Contact