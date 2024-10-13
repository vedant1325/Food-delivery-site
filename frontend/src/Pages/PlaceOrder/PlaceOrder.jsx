import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../Context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const PlaceOrder = () => {
  const { clearCart,TotalAmount, token, food_list, url, cartItem } = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const [method, setMethod] = useState(''); // Add this state to handle payment method
  

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (!method) {
      toast.error("Please select payment method");
      return;
    }

    if (method === "cod") {
      toast.success("Order Placed");
      setTimeout(async() => {
        clearCart(); // Clear the cart
      let orderItems = [];
      food_list.map((item) => {
        if (cartItem[item._id] > 0) {
          let itemInfo = item;
          itemInfo["quantity"] = cartItem[item._id];
          orderItems.push(itemInfo);
        }
      });

      let orderData = {
        address: data,
        items: orderItems,
        amount: TotalAmount() + 5,
      };
      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },});
        navigate("/myorders")
      }, 2000); // Delay of 2 seconds
   
      
     
    } 
    else {
      let orderItems = [];
      food_list.map((item) => {
        if (cartItem[item._id] > 0) {
          let itemInfo = item;
          itemInfo["quantity"] = cartItem[item._id];
          orderItems.push(itemInfo);
        }
      });

      let orderData = {
        address: data,
        items: orderItems,
        amount: TotalAmount() + 5,
      };

      let response = await axios.post(url + "/api/order/place", orderData, {
        headers: { token },
      });

      if (response.data.success) {
        
        const { session_url } = response.data;
        window.location.replace(session_url);
        
      } else {
        toast.error("error");
      }
    }
   
  };

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (TotalAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <div>
      <form className="place-order" onSubmit={placeOrder}>
        <div className="place-order-left">
          <p className="title">Delivery Information</p>
          <div className="multi-fields">
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={onChangeHandler}
              value={data.firstName}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              value={data.lastName}
              onChange={onChangeHandler}
              required
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            onChange={onChangeHandler}
            value={data.email}
            required
          />
          <input
            type="text"
            placeholder="Street"
            name="street"
            onChange={onChangeHandler}
            value={data.street}
            required
          />
          <div className="multi-fields">
            <input
              type="text"
              placeholder="City"
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              required
            />
            <input
              type="text"
              placeholder="State"
              name="state"
              onChange={onChangeHandler}
              value={data.state}
              required
            />
          </div>
          <div className="multi-fields">
            <input
              type="text"
              placeholder="Pincode"
              name="pincode"
              onChange={onChangeHandler}
              value={data.pincode}
              required
            />
            <input
              type="text"
              placeholder="Country"
              name="country"
              onChange={onChangeHandler}
              value={data.country}
              required
            />
          </div>
          <input
            type="text"
            placeholder="Phone no."
            name="phone"
            onChange={onChangeHandler}
            value={data.phone}
            required
          />
        </div>
        <div className="place-order-right">
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
                <p>${TotalAmount() === 0 ? 0 : 5}</p>
              </div>
              <hr />
              <div className="cart-total-detail">
                <p>Total:</p>
                <p>${TotalAmount() === 0 ? 0 : TotalAmount() + 5}</p>
              </div>
            </div>
          </div>
          <div className="payment-methods">
            <h2>Select Payment Method</h2>
            <div className="radio-group">
              <div className="b1">

              <input
                type="radio" 
                id="cod"
                name="paymentMethod"
                value="cod"
                onChange={() => setMethod('cod')}
              />
              <label htmlFor="cod">
                <span></span>Cash on Delivery
              </label>
              </div>
              <div className="b2">

              <input 
                type="radio"
                id="stripe"
                name="paymentMethod"
                value="stripe"
                onChange={() => setMethod('stripe')}
              />
              <label htmlFor="stripe">
                <span></span>Stripe Payment
              </label>
              </div>
            </div>
            <button type="submit">Place Order</button>
        
          </div>
        </div>
      </form>
    </div>
  );
};

export default PlaceOrder;
