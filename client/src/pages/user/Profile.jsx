import React, { useState } from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/UserMenu'
import { useAuth } from '../../context/Auth'
import axios from 'axios'
import { toast } from 'react-hot-toast'

const Profile = () => {
  const {auth, setAuth} = useAuth()
  const [update, setUpdate] = useState(true)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const handleUpdateForm = ()=>{
    setUpdate(!update)
    setName(auth?.user.name)
    setEmail(auth?.user.email)
    setPhone(auth?.user.phone)
    setAddress(auth?.user.address)
  }
  const handleUpdate = async(e)=>{
    e.preventDefault()
    try{
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/v1/auth/profile-update`, {
      name,
      email,
      address,
      phone,
      password
    })
    if(res?.data){
      let ls = localStorage.getItem('auth')
      ls = JSON.parse(ls)
      ls.data = res?.data.data
      localStorage.setItem('auth',JSON.stringify(ls))
      setAuth({...auth, user: {
        name: res?.data.data.name,
        email: res?.data.data.email,
        address: res?.data.data.address,
        phone: res?.data.data.phone
      }})
      setUpdate(!update)
      toast.success('Profile update successfully')
    }
    else
      toast.error(res?.data.message)
    }
    catch(error){
      toast.error('Something went wrong')
    }
  }
  return (
    <Layout title={"Profile"}>
        <div className='grid grid-flow-row grid-rows-4 w-full h-full p-10'>
          <UserMenu/>
          <div className='m-3 row-span-3'>
            <div className='flex justify-between'>
            <h1 className='font-semibold text-3xl'>Profile</h1>
            {update ? 
            <button onClick={handleUpdateForm} className='bg-green-600 px-3 py-1 text-white rounded-md'>Edit</button>
            :
            <button onClick={handleUpdateForm} className='bg-red-600 px-3 py-1 text-white rounded-md'>Cancel</button>
            }
            </div>
            <form action="" className='flex flex-col' onSubmit={handleUpdate}>
              <label htmlFor="name" className='mt-2'>
                <p className='font-semibold text-xl'>Name:</p>
              <input disabled={update} type="text" name='name' className='border-2 w-[30rem] px-2 py-1 disabled:border-none' value={update?auth?.user.name:name} onChange={(e)=>setName(e.target.value)}/>
              </label>
              <label htmlFor="email" className='mt-2'>
                <p className='font-semibold text-xl'>Email:</p>
              <input disabled={update} type="text" name='email' className='border-2 w-[30rem] px-2 py-1 disabled:border-none' value={update?auth?.user.email:email} onChange={(e)=>setEmail(e.target.value)}/>
              </label>
              <label htmlFor="phnumber" className='mt-2'>
                <p className='font-semibold text-xl'>Phone Number:</p>
              <input disabled={update} type="text" name='phnumber' className='border-2 w-[30rem] px-2 py-1 disabled:border-none' value={update?auth?.user.phone:phone} onChange={(e)=>setPhone(e.target.value)}/>
              </label>
              <label htmlFor="address" className='mt-2'>
                <p className='font-semibold text-xl'>Address:</p>
              <input disabled={update} type="text" name='address' className='border-2 w-[30rem] px-2 py-1 disabled:border-none' value={update?auth?.user.address:address} onChange={(e)=>setAddress(e.target.value)}/>
              </label>
              <label htmlFor="password" className='mt-2'>
                <p className='font-semibold text-xl'>New Password:</p>
              <input disabled={update} type="text" name='password' className='border-2 w-[30rem] px-2 py-1 disabled:border-none' value={update?'':password} onChange={(e)=>setPassword(e.target.value)}/>
              </label>
              <div className='flex items-center mt-4 justify-center text-xl'>
              {update?'':<button className='bg-[#c4a777] px-3 py-2 text-white rounded-md'>Update</button>}
              </div>
            </form>
          </div>
        </div>
    </Layout>
  )
}

export default Profile