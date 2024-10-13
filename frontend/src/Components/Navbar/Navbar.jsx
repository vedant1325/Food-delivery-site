import React, { useContext, useState } from 'react'
import "./Navbar.css"
import{assets} from "../Assets/assets"
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'

const Navbar = ({setShowLogin}) => {
const[menu,setMenu]=useState("Home")
const{TotalAmount,token,setToken}=useContext(StoreContext);


const navigate=useNavigate();
const logout=()=>{
  localStorage.removeItem("token");
  setToken("");
  navigate("/");

}

  return (
    <div className='navbar'>
       <Link to="/"><img src={assets.logo} alt="" className='logo' /></Link> 
        <ul className="navbar-menu">
           <Link to='/'><li onClick={()=>{setMenu('Home')}} className={menu==="Home"?"active":""}>Home</li></Link> 
            <a href='#explore-menu'><li onClick={()=>{setMenu('Menu')}} className={menu==="Menu"?"active":""}>Menu</li></a>
           <a href='#app-download'><li onClick={()=>{setMenu('Mobile-App')}} className={menu==="Mobile-App"?"active":""}>Mobile-App</li></a>
            <a href='#footer'><li onClick={()=>{setMenu('Contact Us')}} className={menu==="Contact Us"?"active":""}>Contact Us</li></a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon}  alt="" />
             < div className='navbar-search_icon'>
           <Link to='/cart'><img src={assets.basket_icon} alt="" />
            <div className={TotalAmount()===0?"":"dot"}></div>
             </Link> </div>
             {!token?<button onClick={()=>{setShowLogin(true)}}>Sign In</button>:<div className='navbar-profile'>
              <img src={assets.profile_icon} alt="" />
              <ul className='nav-profile-dropdown'>
               <li onClick={()=>{navigate("/myorders")}}> <img src={assets.bag_icon} alt="" /><p>Orders</p></li>
               <hr />
               <li onClick={()=>{logout()}}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
              </ul>
              
              </div>}
        
        </div>
      
    </div>
  )
}

export default Navbar
