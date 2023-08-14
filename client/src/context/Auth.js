import {useState, useContext, useEffect, createContext} from 'react';
import axios from 'axios';

//Creating a context variable
const AuthContext = createContext();


const AuthProvider = ({children})=>{
    //Setting global state
    const [auth,setAuth] = useState({user: null,token:""})

    //Axios default property
    axios.defaults.headers.common['Authorization'] = `Bearer ${auth.token}`

    //Get the data from localstorage
    useEffect(()=>{
        const data = localStorage.getItem('auth')
        if(data){
            const parseData = JSON.parse(data)
            setAuth({
                ...auth,
                user: parseData.data,
                token: parseData.token
            })
        }
        //eslint-disable-next-line
    },[])
    //Return the context provider
    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

//Custom hook
const useAuth = () => useContext(AuthContext)

export {useAuth, AuthProvider}