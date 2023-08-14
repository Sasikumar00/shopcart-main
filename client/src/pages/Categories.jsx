import React from 'react'
import useCategory from '../hooks/useCategory'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'

const Categories = () => {
    const categories = useCategory()
  return (
    <Layout title={'All Categories'}>
        <div className='p-10'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10'>
                {categories.map((category) => (
                    <div className='flex justify-center' key={category._id}>
                        <button className=' w-[15rem] h-[5rem] text-xl rounded-md text-black border border-black font-semibold hover:text-[#c4a777] hover:border-[#c4a777] hover:scale-110 transition-all ease-in-out duration-300'><Link to={`/category/${category.slug}`}>{category.name}</Link></button>
                    </div>
                ))}
            </div>
        </div>
    </Layout>
  )
}

export default Categories