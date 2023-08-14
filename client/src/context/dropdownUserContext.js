import {useState, useContext, createContext} from 'react';

//Creating a context variable
const AuthContext = createContext();


const DropDownProvider = ({children})=>{
    //Setting global state
    const [isOpen, setIsOpen] = useState(false)
    //Return the context provider
    return (
        <AuthContext.Provider value={{isOpen,setIsOpen}}>
            {children}
        </AuthContext.Provider>
    )
}

//Custom hook
const useUserDropDown = () => useContext(AuthContext)

export {useUserDropDown, DropDownProvider}