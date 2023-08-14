import React from 'react'
import { useSearch } from '../context/Search'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {AiOutlineSearch} from 'react-icons/ai'
import { useUserDropDown } from '../context/dropdownUserContext'
import { useCategoryDropDown } from '../context/dropdownCategoriesContext'
import {toast} from 'react-hot-toast'

const SearchInput = () => {
    const navigate = useNavigate()
    const {values, setValues} = useSearch()
    const {isOpen, setIsOpen} = useUserDropDown()
    const {isCategoryOpen, setIsCategoryOpen} = useCategoryDropDown()
    const handleMenu = () => {
        if(isOpen) setIsOpen(!isOpen)
        if(isCategoryOpen) setIsCategoryOpen(!isCategoryOpen)
      }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        try{
            const res = await axios(`${process.env.REACT_APP_API_URL}/api/v1/products/search/${values.keyword}`)
            setValues({...values, results: res.data.data})
            navigate('/search');
        }catch(error){
            toast.error('Something went wrong')
        }
    }
  return (
    <div>
        <form action="" onSubmit={handleSubmit} className='flex' onClick={handleMenu}>
            <input className='px-1 border border-slate-300 rounded-tl rounded-bl py-1 outline-none' type="text" name="" id="" onChange={(e)=>{setValues({...values, keyword: e.target.value})}} value={values.keyword}/>
            <button type='submit' className='text-white text-base bg-[#c4a777] hover:bg-[#c8ab7d] py-1 px-2 rounded-tr rounded-br flex items-center'> <AiOutlineSearch className='mr-1'/> Search</button>
        </form>
    </div>
  )
}

export default SearchInput