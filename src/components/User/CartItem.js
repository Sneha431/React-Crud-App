import React, { useContext, useState } from "react";
// import { CartState } from "../context/Context";

import { CartContext } from "./Cart";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
const CartItem = () => {
  // const counter = useSelector((state) => state.cartReducer.count);
  const {
    item,

    totalAmount,
    updatedCart,
    removeItem,
    totalItem,
    totalItems,
    clearCart,
    gettotal,
    increment,
    decrement,
    cartquantity,
  } = useContext(CartContext);
  // const {
  //   initialState: { products },
  // } = CartState();
  // useEffect(() => {
  //   gettotal();
  // }, [gettotal]);
  const removeAll = async (e) => {
    e.preventDefault();

    let result = await fetch("http://localhost:5000/deletecart", {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await result.json();

    if (json.result === true) {
      alert("Cleared");
      //   setalertmsg("Alert : Cart Cleared");
    } else {
      //alert("Enter correct details");
      //setalertmsg("Alert : Enter correct details");
      //("danger");
    }
  };
  const [products, setproducts] = useState([]);

  return (
    <div className="CartContainer">
      <div className="Header">
        <h3 className="Heading">Shopping Cart</h3>
        <h5 className="Action" onClick={(() => clearCart(item._id), removeAll)}>
          Remove all
        </h5>
      </div>

      {item.map((item, index) => (
        <div className="Cart-Items" key={index}>
          <div className="about">
            <h1 className="title">{item.name}</h1>
            <h3 className="subtitle">{item.category}</h3>
          </div>
          <div className="counter">
            <div className="btn" onClick={() => increment(item._id)}>
              +
            </div>
            <div>{item.cartquantity}</div>
            <div className="btn" onClick={() => decrement(item._id)}>
              -
            </div>
          </div>
          <div className="prices">
            <div className="amount">${item.price}</div>
            <div className="save">
              <u>Save for later</u>
            </div>
            <div className="remove" onClick={() => removeItem(item._id)}>
              <u>Remove</u>
            </div>
          </div>
          {/* <div className="total-amount">{item.totalAmount}</div> */}
        </div>
      ))}
      <hr />
      <div className="checkout">
        <div className="total">
          <div>
            <div className="Subtotal">Sub-Total</div>
            <div className="items">{totalItem} items</div>
          </div>
        </div>
        <div className="total-amount">${totalAmount}</div>
        <button className="button">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
