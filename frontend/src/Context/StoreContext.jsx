import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const StoreContext=createContext(null);

const StoreContextProvider=(props)=>{
 
    const[cartItem,setCartItem]=useState({});
    const url="http://localhost:4000";

    const[token,setToken]=useState("");

   const[food_list,setFoodList]=useState([]);

   const clearCart=async()=>{
    await setCartItem({});
   }

     const addToCart=async(itemId)=>{
      //if itemId is not availeble
      if(!cartItem[itemId]){
        setCartItem((prev)=>({...prev,[itemId]:1}))
      }
      else{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]+1}))
      }

      //now we will check that ,if token is availeble thwn we will also make changes in the database

      if(token){
        await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
      }
     }

     

      const removeFromCart=async(itemId)=>{
        setCartItem((prev)=>({...prev,[itemId]:prev[itemId]-1}))
        if(token){
          await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
        }
      }


      const TotalAmount=()=>{
        let total=0;
        for(const item in cartItem){
          if(cartItem[item]>0){

            let itemInfo=food_list.find((product)=>product._id===item);
            total+=itemInfo.price*cartItem[item];
          }
        }
        return total
      }

 const loadCartData=async(token)=>{
  const response=await axios.post(url+"/api/cart/get",{},{headers:{token}});
  setCartItem(response.data.cartData)

 }


      useEffect(()=>{
        console.log(cartItem)
      },[cartItem])

      const fetchFood=async()=>{
        const response=await axios.get(url+"/api/food/list");
        setFoodList(response.data.data)
  }
  
  useEffect(()=>{
       
    async function loadData(){
      await fetchFood();
      if(localStorage.getItem("token")){
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"))
      }
    }
    loadData();
  },[])


    const contextValue={
 food_list,cartItem,setCartItem,addToCart,removeFromCart,TotalAmount,url,token,setToken,clearCart
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}
export default StoreContextProvider;