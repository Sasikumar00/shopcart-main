import {useState, useEffect, useContext, createContext} from 'react';

//Creating a context variable
const WishListContext = createContext();


const WishListProvider = ({children})=>{
    //Setting global state
    const [wishlist,setWishlist] = useState([])
    useEffect(()=>{
        let existingWishlistItems = localStorage.getItem('wishlist')
        if(existingWishlistItems) setWishlist(JSON.parse(existingWishlistItems));
    }, [])
    //Return the context provider
    return (
        <WishListContext.Provider value={{wishlist, setWishlist}}>
            {children}
        </WishListContext.Provider>
    )
}

//Custom hook
const useWishlist = () => useContext(WishListContext)

export {useWishlist, WishListProvider}