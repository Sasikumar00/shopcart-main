import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import {Select} from 'antd'
import { useNavigate } from 'react-router-dom'
const {Option} = Select

const CreateProduct = () => {
  const navigate = useNavigate()
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState('')
  const [photo, setPhoto] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [shipping, setShipping] = useState(false)

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
  const handleCreate = async (e) => {
    e.preventDefault()
    try{
      const productData = new FormData()
      productData.append('name', name)
      productData.append('description', description)
      productData.append('price', price)
      productData.append('quantity', quantity)
      productData.append('shipping', shipping)
      productData.append('photo', photo)
      productData.append('category', category)
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/products/create-product`, productData)
      if(res.data?.status==='success'){
        toast.success(res.data.message)
        navigate('/dashboard/admin/products')
        setName('')
        setDescription('')
        setPrice('')
        setQuantity('')
        setShipping(false)
        setCategory('')
        setPhoto('')
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

  return (
    <Layout>
        <div className='grid grid-cols-2 w-full h-full p-10'>
          <AdminMenu/>
          <div className='m-3'>
            <h1 className='text-2xl font-semibold text-center'>Create Product</h1>
            <form action="" onSubmit={handleCreate}>
            <div className='flex flex-col items-center'>
            <div className='m-1 w-100 flex items-center'>
              <Select bordered={false} placeholder="Select a category" size='large' showSearch className='mb-3' onChange={(value)=>{setCategory(value)}}>
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
                {photo && <img src={URL.createObjectURL(photo)} alt={photo.name} className='w-[15rem]'/>}
              </div>
              <div className='w-full items-center flex flex-col'>
                <input type="text" name="name" placeholder='Category Name' className='p-2 mb-3 w-[50%] border rounded-lg placeholder:text-gray-300' onChange={(e)=>{setName(e.target.value)}}/>
                <textarea name="description" placeholder='Description' className='p-2 mb-3 w-[50%] border rounded-lg placeholder:text-gray-300' onChange={(e)=>{setDescription(e.target.value)}}/>
                <input type="number" name="price" placeholder='Price' className='p-2 mb-3 w-[50%] border rounded-lg placeholder:text-gray-300' onChange={(e)=>{setPrice(e.target.value)}}/>
                <input type="number" name="quantity" placeholder='Quantity' className='p-2 mb-3 w-[50%] border rounded-lg placeholder:text-gray-300' onChange={(e)=>{setQuantity(e.target.value)}}/>
                {/* Create a dropdown options for shipping */}
                <Select bordered={true} placeholder="Shipping" size='large' showSearch className='mb-3 w-[50%]' onChange={(value)=>{setShipping(value)}}>
                  <Option value={true}>Yes</Option>
                  <Option value={false}>No</Option>
                </Select>
              </div>
              <div className='mb-3'>
                <button type='submit' className='px-3 py-2 bg-slate-950 text-white rounded-lg'>Create Product</button>
              </div>
            </div>    
            </form>
          </div>
        </div>
    </Layout>
  )
}

export default CreateProduct