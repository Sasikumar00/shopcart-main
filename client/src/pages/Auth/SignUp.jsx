import React, {useState} from 'react'
import Layout from '../../components/Layout'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';

import axios from 'axios'

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    //form handler
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const res = await axios({
                method: "POST",
                url: `${process.env.REACT_APP_API_URL}/api/v1/auth/register`,
                data: {name,email,password,passwordConfirm,phone,address},
                validateStatus: (status) => {
                    // Reject only if status code is greater than or equal to 500
                    return status < 500;
                }
            })
            if(res.data.status==='success'){
                toast.success(res.data.message)
                navigate('/login')
            }
            else{
                toast.error(res.data.message)
            }
        }catch(error){
            toast.error('Something went wrong!')
        }
    }
  return (
    <Layout title={"Sign up - Ecommerce"}>
        <div className='py-[15rem]'>
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <h1 className='text-black text-5xl mb-5 font-bold'>Sign Up</h1>
                <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-[#c19f68]">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                            Create and account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Full Name</label>
                                <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" placeholder="John Doe" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your email</label>
                                <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" placeholder="name@company.com" required />
                            </div>
                            <div>
                                <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium dark:text-black">Phone number</label>
                                <input value={phone} onChange={(e)=>{setPhone(e.target.value)}} type='text' name="phoneNumber" id="phoneNumber" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" placeholder="1234567890" required />
                            </div>
                            <div>
                                <label htmlFor="address" className="block mb-2 text-sm font-medium dark:text-black">Postal Address</label>
                                <input value={address} onChange={(e)=>{setAddress(e.target.value)}} type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" placeholder="208, street 7..." required />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium dark:text-black">Password</label>
                                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" required />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium dark:text-black">Confirm password</label>
                                <input value={passwordConfirm} onChange={(e)=>{setPasswordConfirm(e.target.value)}} type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none" required/>
                            </div>
                            <div className="flex items-start">
                                <div className="flex items-center h-5">
                                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                                </div>
                                <div className="ml-3 text-sm">
                                    <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-800">I accept the <Link className="font-medium text-primary-600 hover:underline dark:text-primary-500" to={'/policy'}>Terms and Conditions</Link></label>
                                </div>
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 border-2 border-[#efd4a7] hover:bg-[#efd4a7] hover:text-black transition-all ease-in-out duration-300">Create an account</button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-800">
                                Already have an account? <Link to={'/login'} className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default SignUp