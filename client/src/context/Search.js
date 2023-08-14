import {useState, useContext, createContext} from 'react';

//Creating a context variable
const SearchContext = createContext();


const SearchProvider = ({children})=>{
    //Setting global state
    const [values,setValues] = useState({keyword: '', results: []})

    //Return the context provider
    return (
        <SearchContext.Provider value={{values, setValues}}>
            {children}
        </SearchContext.Provider>
    )
}

//Custom hook
const useSearch = () => useContext(SearchContext)

export {useSearch, SearchProvider}