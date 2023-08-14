import React from 'react'
import { Link } from 'react-router-dom'
import {useState} from 'react'
import Layout from '../../components/Layout'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/Auth'

const Login = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const {auth,setAuth} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const res = await axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_URL}/api/v1/auth/login`,
                data: {email,password},
                validateStatus: (status) => {
                    // Reject only if status code is greater than or equal to 500
                    return status < 500;
                }
            })
            if(res.data.status==='success'){
                toast.success(res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.data,
                    token: res.data.token
                })
                localStorage.setItem('auth', JSON.stringify(res.data));
                navigate(location.state?.split('/').pop()==='admin'&&auth?.user.role!=='admin'?'/':location.state || '/')
            }
            else{
                toast.error(res.data.message)
            }
    }
    catch(err){
        toast.error('Something went wrong')
    }
}
  return (
    <Layout title={"Sign In - Ecommerce"}>
    <div className=''>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                <h1 className='text-black text-5xl mb-5 font-bold'>Sign In</h1>
                <div className="w-full bg-[#c19f68] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-black">
                            Welcome to ShopCart
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your email</label>
                                <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Password</label>
                                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" required />
                            </div>
                            <button type="submit" className="w-full text-white border-2 border-[#efd4a7] rounded-md py-2 hover:bg-[#efd4a7] hover:text-black transition-all ease-in-out duration-300">Log In</button>
                            <p className="text-sm font-light text-gray-900 dark:text-gray-900">
                                Don't have an account yet? <Link to={'/signup'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Signup here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
    </div>
    </Layout>
  )
}

export default Login