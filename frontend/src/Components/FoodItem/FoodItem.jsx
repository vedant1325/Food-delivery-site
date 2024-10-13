import React, { useContext, useState } from 'react'
import './FoodItem.css' 
import { assets } from '../Assets/assets'
import { StoreContext } from '../../Context/StoreContext'

const FoodItem = ({id,name,price,description,image}) => {

    //const[itemCount,setItemCount]=useState(0)

    const{cartItem,addToCart,removeFromCart,url}=useContext(StoreContext)


  return (
    <div className='FoodItem'>
        <div className="food-item-img-container">
            <img src={url+"/images/"+image}className='food-item-image' alt="" />
            {!cartItem[id]?
            <img onClick={()=>addToCart(id)} className='add' src={assets.add_icon_white}/>:
            <div  className='food-item-counter'>
                 <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
            <p>{cartItem[id]}</p>
            <img onClick={()=>addToCart(id)} src={assets.add_icon_green} alt="" />
                </div>}
        </div>
        <div className="food-item-info">
            <div className="food-item-info-rating">
                <p>{name}</p>
                <img src={assets.rating_starts} alt="" />
            </div>
            <p className="food-item-desc">
                {description}
                <p className="food-item-price">${price}</p>
            </p>
        </div>
      
    </div>
  )
}

export default FoodItem
