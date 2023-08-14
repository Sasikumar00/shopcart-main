import {useState, useEffect, useContext, createContext} from 'react';
import axios from 'axios';

//Creating a context variable
const CartContext = createContext();


const CartProvider = ({children})=>{
        //Setting global state
    const [cart,setCart] = useState([])
    const auth = JSON.parse(localStorage.getItem('auth'))
    const getCartFromDatabase = async()=>{
        try{
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/products/get-cart`, {user: auth?.data?._id}, {
                headers: {
                  Authorization: `Bearer ${auth?.token}`,
                },
              })
              let cProducts = []
                res?.data.data.map(cart=>{
                    cProducts = [...cProducts, cart.product]
                    return 1
                })
                setCart(cProducts)
            }   
        catch(error){
            
        }
    }

    useEffect(()=>{
        if(auth?.data?._id){
            getCartFromDatabase()
        }
        else{
        let existingCartItems = localStorage.getItem('cart')
        if(existingCartItems) setCart(JSON.parse(existingCartItems));
        }
    }, [])
    //Return the context provider
    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    )
}

//Custom hook
const useCart = () => useContext(CartContext)

export {useCart, CartProvider}