import React,{useEffect, useState} from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/CategoryForm'
import { Modal } from 'antd';

const CreateCategory = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState('')
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState({})
  const [updatedName, setUpdatedName] = useState('')
  const handleForm = async (e) => {
    e.preventDefault()
    try{
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/category/create-category`, {name})
      if(res.data?.status==='success'){
        toast.success(res.data.message)
        getAllCategories()
      }
      else{
        toast.error(res.data.message)
      }
    }
    catch(err){
      toast.error(err.response.data)
    }
  }
  const getAllCategories = async () => {
    try{
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/category/categories`)
      if(res.data.status==='success'){
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
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/category/update-category/${selected._id}`, {name: updatedName})
      if(res.data?.status==='success'){
        toast.success(res.data.message)
        setVisible(false)
        setSelected({})
        setUpdatedName('')
        getAllCategories()
      }
      else{
        toast.error(res.data.message)
      }
    }
    catch(err){
      toast.error(err.response.data)
    }
  }
  const handleDelete = async (c) => {
    try{
      const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/category/delete-category/${c._id}`)
      if(res.data?.status==='success'){
        toast.success(`${c.name} deleted successfully`)
        getAllCategories()
      }
      else{
        toast.error(res.data?.message)
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
        <div className='grid sm:grid-cols-2 w-full h-full p-10'>
          <AdminMenu/>
          <div className='m-3'>
            <h1>Create Category</h1>
            <div className="mt-4">
              <CategoryForm handleForm={handleForm} value={name} setValue={setName} operation={'create'}/>
            </div>
            <div>
              <div className="relative overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          <tr>
                              <th scope="col" className="px-6 py-3">
                                  Category Name
                              </th>
                              <th scope="col" className="px-6 py-3">
                                  Actions
                              </th>
                          </tr>
                      </thead>
                      <tbody>
                          {categories?.map((category, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {category?.name}
                                </th>
                                <td className="px-6 py-4">
                                    <button className='py-1 px-3 bg-green-600 text-white text-base rounded-md mr-1' onClick={()=>{setVisible(true); setUpdatedName(category.name); setSelected(category) }}>Edit</button>
                                    <button className='py-1 px-2 bg-red-600 text-white text-base rounded-md ml-1' onClick={()=>{handleDelete(category)}}>Delete</button>
                                </td>
                            </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
            </div>
          </div>
          <Modal onCancel={()=>setVisible(false)} footer={null} open={visible}>
            <CategoryForm value={updatedName} setValue={setUpdatedName} handleForm={handleUpdate} operation={'edit'}/>
          </Modal>
        </div>
    </Layout>
  )
}

export default CreateCategory