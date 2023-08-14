import { useState, useEffect } from "react";
import axios from "axios";
import {toast} from 'react-hot-toast'

export default function useCategory(){
    const [categories, setCategories] = useState([])

    const getCategories = async()=>{
        try{
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/category/categories`)
            setCategories(res.data?.data)
        }
        catch(error){
            toast.error('Something went wrong')
        }
    }
    useEffect(()=>{
        getCategories()
    }, [])

    return categories;
}