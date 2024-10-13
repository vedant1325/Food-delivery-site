import React, { useContext } from 'react'
import "./Cart.css"
import { StoreContext } from '../../Context/StoreContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItem, removeFromCart, food_list, TotalAmount,url } = useContext(StoreContext);

  const navigate = useNavigate();

  // Check if cart is empty
  const isCartEmpty = Object.values(cartItem).every(count => count === 0);

  return (
    <>
      <div className='cart'>
        {isCartEmpty ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add items to your cart to see them here.</p>
          </div>
        ) : (
          <>
            <div className="cartItems">
              <div className="cart-items-title">
                <p>Items</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
              </div>
              <br />
              <hr />
              {food_list.map((item, i) => {
                if (cartItem[item._id] > 0) {
                  return (
                    <div key={i}>
                      <div className="cart-items-title cart-item-item">
                        <img src={url+"/images/"+item.image} alt="" />
                        <p>{item.name}</p>
                        <p>${item.price}</p>
                        <p>{cartItem[item._id]}</p>
                        {/* Displaying total price */}
                        <p>${item.price * cartItem[item._id]}</p>
                        <p onClick={() => {
                          removeFromCart(item._id)
                        }} className='cross'>x</p>
                      </div>
                      <hr />
                    </div>
                  )
                }
                return null;
              })}
            </div>
            <div className="cart-bottom">
              <div className="cart-total">
                <h2>Cart Total</h2>
                <div>
                  <div className="cart-total-detail">
                    <p>Subtotal:</p>
                    <p>${TotalAmount()}</p>
                  </div>
                  <hr />
                  <div className="cart-total-detail">
                    <p>Delivery Fee:</p>
                    <p>${TotalAmount()===0?0:5}</p>
                  </div>
                  <hr />
                  <div className="cart-total-detail">
                    <p>Total:</p>
                    <p>${TotalAmount()===0?0:TotalAmount()+5}</p>
                  </div>
                </div>
                <button onClick={() => { navigate('/order') }}>Proceed To Checkout</button>
              </div>
              <div className="promocode">
                <div>
                  <p>If you have a promocode, Enter it here</p>
                  <div className="promocode-input">
                    <input type="text" name="" id="" placeholder='promocode' />
                    <button>Submit</button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default Cart;
