import React, { useContext, useEffect, useState } from 'react'
import './LoginSignup.css'
import { assets } from '../Assets/assets'
import { StoreContext } from '../../Context/StoreContext';
import axios from "axios"
import { toast } from "react-toastify";



const LoginSignup = ({setShowLogin}) => {
    const[currentState,SetcurrentState]=useState('Login');

    const{url,setToken}=useContext(StoreContext)

    const [data,setData]=useState({
      name:"",
      email:"",
      password:""
    });

    const onChangeHandler=(event)=>{
      const name=event.target.name;
      const value=event.target.value;

      setData(prevData=>({...prevData,[name]:value}))


    }
    /*useEffect(()=>{
      console.log(data)
    },[data])*/

    const onLogin=async(event)=>{
      event.preventDefault();
      let newUrl= url;
      if(currentState==="Login"){
        newUrl+="/api/user/login"
      }
      else{
        newUrl+="/api/user/register"
      }
const response= await axios.post(newUrl,data);
if(response.data.success){
  setToken(response.data.token);
  setShowLogin(false)

  localStorage.setItem("token",response.data.token)
   
}
else{
  alert(response.data.message)
}



    }
  return (
    <div className='LoginSignup'>
      <form className='popup-container' onSubmit={onLogin}>
      <div className="popup-title">
<h2>{currentState}</h2>
<img onClick={()=>{setShowLogin(false)}} src={assets.cross_icon2} className='cross-icon' alt="" />
      </div>
      <div className="popup-inputs">
        {currentState==='Sign Up'?<input type="text" placeholder='Your name' name="name" onChange={onChangeHandler} value={data.name} required/>:<></>}
        
        <input type="email" onChange={onChangeHandler} value={data.email} name="email" id="" placeholder='Your email' required />
        <input type="password" name="password" onChange={onChangeHandler} value={data.password} placeholder='Your password' id="" />
      </div>
      <button type='submit'>{currentState==='Sign Up'?"Create Account":'Login'}</button>
      <div className="popup-condition">
        <input type="checkbox" name="" id="" required/>
        <p>By continuing,I agree to the terms of use & privacy policy</p>
      </div>
      {currentState==='Sign Up'?<p>Already have an account <span onClick={()=>{SetcurrentState('Login')}}>Login here </span></p>:<p>Create a new account<span onClick={()=>{SetcurrentState('Sign Up')}}>Click here</span> </p>}
      
      
      </form>
    </div>
  )
}

export default LoginSignup
