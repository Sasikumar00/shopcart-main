import { useState, useEffect } from "react";
import { useAuth } from "../../context/Auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminRouteProtect(){
    const [ok, setOk] = useState(false)
    const {auth} = useAuth()

    useEffect(()=>{
        const authCheck = async()=>{
            const res = await axios({
                method: "GET",
                url: `${process.env.REACT_APP_API_URL}/api/v1/auth/admin-auth`,
                validateStatus: (status) => {
                    // Reject only if status code is greater than or equal to 500
                    return status < 500;
                }
            })
            if(res.data.ok){
                setOk(true)
            }
            else{
                setOk(false)
            }
        }
        if(auth?.token){
            authCheck()
        }
    },[auth?.token])
    return ok ? <Outlet/> : <Spinner path=''/>
}