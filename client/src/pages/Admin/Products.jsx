import React, {useState, useEffect} from 'react'
import AdminMenu from '../../components/AdminMenu'
import Layout from '../../components/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import {Link} from 'react-router-dom'

const Products = () => {
    const [products, setProducts] = useState([])
const getAllProducts = async () => {
    try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/products/all-products`)
        if(res.data?.status==='success'){
        setProducts(res.data.data)
        }
    }
    catch(err){
        toast.error(err.response.data)
    }
}
useEffect(()=>{
    getAllProducts()
},[])
  return (
    <Layout title={'Products - Ecommerce'}>
        <div className='grid grid-cols-3 w-full'>
            <AdminMenu/>
            <div className='w-[100%] col-span-2'>
            <h1 className='font-bold text-2xl'>All Products</h1>
            <div className="grid grid-cols-3 gap-4 w-full p-5">
                {products.map((product)=>{
                    return(
                        <div key={product._id} className='border border-black w-[15rem] flex flex-col items-center p-2'>
                            <h3 className='text-xl font-bold'>{product.name}</h3>
                            <img className='w-[5rem]' src={`${process.env.REACT_APP_API_URL}/api/v1/products/get-product-photo/${product._id}`} alt={product.name}/>
                            <p><span className='font-semibold'>Description:</span> {product.description.substring(0,30)}...</p>
                            <p><span className='font-semibold'>Price:</span> {product.price}Rs</p>
                            <Link className='text-blue-600' to={`/dashboard/admin/product/${product.slug}`}>More</Link>
                        </div>
                    )
                })}
            </div>
            </div>
        </div>
    </Layout>
  )
}

export default Products