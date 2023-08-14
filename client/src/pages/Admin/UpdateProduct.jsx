import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import {Select} from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
const {Option} = Select

const UpdateProduct = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [categories, setCategories] = useState([])
    const [category, setCategory] = useState('')
    const [photo, setPhoto] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [shipping, setShipping] = useState(false)
    const [id, setId] = useState('')
  

    const getSingleProduct = async () => {
      try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/products/get-product/${params.slug}`)
        if(res.data?.status === 'success'){
          setName(res.data.data.name)
          setId(res.data.data._id)
          setDescription(res.data.data.description)
          setQuantity(res.data.data.quantity)
          setPrice(res.data.data.price)
          setCategory(res.data.data.category._id)
        }
      }
      catch(error){
      }
    }
    useEffect(() => {
      getSingleProduct();
      //eslint-disable-next-line
    }, [])
    const getAllCategories = async () => {
      try{
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/category/categories`)
        if(res.data?.status==='success'){
          setCategories(res.data.data)
        }
      }
      catch(err){
        toast.error(err.response.data)
      }
    }
    const handleUpdate = async (e) => {
      e.preventDefault()
      try{
        const productData = new FormData()
        productData.append('name', name)
        productData.append('description', description)
        productData.append('price', price)
        productData.append('quantity', quantity)
        productData.append('shipping', shipping)
        if(photo && photo.type!=='image/jpeg' && photo.type!=='image/png' && photo.type!=='image/jpg'){
          return toast.error('Image must be jpeg, jpg or png')
        }
        photo && productData.append('photo', photo)
        productData.append('category', category)
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/products/update-product/${id}`, productData)
        if(res.data?.status==='success'){
          toast.success(res.data.message)
          navigate('/dashboard/admin/products')
        }
        else{
          toast.error(res.data.message)
        }
      }
      catch(err){
        toast.error(err.response.data)
      }
    }
    useEffect(() => {
      getAllCategories();
    }, [])

    const handleDelete = async (e) => {
      e.preventDefault()
      try{
        let answer = window.prompt('Are you sure you want to delete this product?') || 'no'
        if(answer.toLowerCase() === 'yes'){
          const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/products/delete-product/${id}`)
          if(res.data?.status==='success'){
            toast.success(res.data.message)
            navigate('/dashboard/admin/products')
          }
          else{
            toast.error(res.data.message)
          }
        }
      }
      catch(err){
        toast.error(err.response.data)
      }
    }
  return (
        <Layout>
        <div className='grid grid-cols-2 w-full h-full p-10'>
          <AdminMenu/>
          <div className='m-3'>
            <h1 className='text-2xl font-semibold text-center'>Update Product</h1>
            <form action="">
            <div className='flex flex-col items-center'>
            <div className='m-1 w-100 flex items-center'>
              <Select bordered={false} placeholder="Select a category" size='large' showSearch className='mb-3' onChange={(value)=>{setCategory(value)}} value={category.name}>
                {categories.map((c, i)=>(
                  <Option key={i} value={c._id}>{c.name}</Option>
                ))}
              </Select>
                <div className='mb-3'>
                  <label htmlFor="image" className='px-3 py-2 bg-slate-600 text-white rounded-md w-full'>
                    {/* {photo ? photo.name : 'Upload Image'} */}
                    <input className='p-2' type="file" name="photo" accept='images/*' onChange={(e)=>{setPhoto(e.target.files[0])}}/>
                  </label>
                </div>
              </div>
              <div className='mb-3'>
                {photo ? <img src={URL.createObjectURL(photo)} alt={photo.name} className='w-[15rem]'/> : <img src={`${process.env.REACT_APP_API_URL}/api/v1/products/get-product-photo/${id}`} alt='Product_photo'/>}
              </div>
              <div className='w-full items-center flex flex-col'>
                <input type="text" name="name" placeholder='Category Name' className='p-2 mb-3 w-[50%] border rounded-lg placeholder:text-gray-300' onChange={(e)=>{setName(e.target.value)}} value={name}/>
                <textarea name="description" placeholder='Description' className='p-2 mb-3 w-[50%] border rounded-lg placeholder:text-gray-300' onChange={(e)=>{setDescription(e.target.value)}} value={description}/>
                <input type="number" name="price" placeholder='Price' className='p-2 mb-3 w-[50%] border rounded-lg placeholder:text-gray-300' onChange={(e)=>{setPrice(e.target.value)}} value={price}/>
                <input type="number" name="quantity" placeholder='Quantity' className='p-2 mb-3 w-[50%] border rounded-lg placeholder:text-gray-300' onChange={(e)=>{setQuantity(e.target.value)}} value={quantity}/>
                {/* Create a dropdown options for shipping */}
                <Select bordered={true} placeholder="Shipping" size='large' showSearch className='mb-3 w-[50%]' onChange={(value)=>{setShipping(value)}} value={shipping?'Yes':'No'}>
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </div>
              <div className='mb-3'>
                <button type='submit' onClick={handleUpdate} className='px-3 py-2 bg-slate-950 text-white rounded-lg'>Update Product</button>
                <button type='submit' onClick={handleDelete} className='px-3 py-2 bg-red-600 text-white rounded-lg'>Delete Product</button>
              </div>
            </div>    
            </form>
          </div>
        </div>
    </Layout>
  )
}

export default UpdateProduct