import React, { useContext, useEffect, useState } from 'react'
import "./MyOrders.css"
import { StoreContext } from '../../Context/StoreContext'
import axios from 'axios';
import { assets } from '../../Components/Assets/assets';
import { useNavigate } from 'react-router-dom';

const MyOrders = () => {
    const{url,token}=useContext(StoreContext);
    const[data,Setdata]=useState([]);
    const navigate=useNavigate()

    const fetchOrder=async()=>{
        const response= await axios.post(url+"/api/order/userorders",{},{headers:{token}});
        Setdata(response.data.data);
        //console.log(response.data.data)
    }

    //Now usimg useEffect we will check weather the token is availeble or not.If availeble then we will run the fetchOrder function
    
    useEffect(()=>{

        if(token){
            fetchOrder();
        }
    },[token])
  return (
    <div className='my-orders'>
        <h2>My Orders</h2>
        <div className="container">

        {data.map((order,i)=>{
            return(
                <div className="my-orders-order" key={i}>
                    <img src={assets.parcel_icon} alt="" />
                    <p>{order.items.map((item,index)=>{
                        if(index===order.items.length-1){
                            return item.name+" "+"x" +item.quantity
                        }
                        else{
                            return item.name+" "+"x"+item.quantity+","
                        }

                    })}</p>
                    <p>${order.amount}.00</p>
                    <p>Items:{order.items.length}</p>
                    <p><span>&#x25cf;</span><b>{order.status}</b></p>
                    <button onClick={fetchOrder}>Track Order</button>

                </div>
            )
        })}
        </div>
    <button className="goback" onClick={()=>{navigate("/")}}> Go Back</button>
      
    </div>
  )
}

export default MyOrders
