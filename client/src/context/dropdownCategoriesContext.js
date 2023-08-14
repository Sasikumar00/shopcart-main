import {useState, useContext, createContext} from 'react';

//Creating a context variable
const AuthContext = createContext();


const DropDownCategoryProvider = ({children})=>{
    //Setting global state
    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    //Return the context provider
    return (
        <AuthContext.Provider value={{isCategoryOpen,setIsCategoryOpen}}>
            {children}
        </AuthContext.Provider>
    )
}

//Custom hook
const useCategoryDropDown = () => useContext(AuthContext)

export {useCategoryDropDown, DropDownCategoryProvider}