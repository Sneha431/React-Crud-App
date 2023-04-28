import React, { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
const CartItem = () => {
  const [cartdata, setcartdata] = useState([]);
  useEffect(() => {
    getcartdata();
  }, []);
  const getcartdata = async (e) => {
    var decoded = jwt_decode(localStorage.getItem("auth"));
    const userid = decoded.updated_result.id;
    const result = await fetch(`http://localhost:5000/getcartdata/${userid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      },
    });
    const json = await result.json();
    setcartdata(json);
  };

  return (
    <div className="CartContainer">
      <div className="Header">
        <h3 className="Heading">Shopping Cart</h3>
        <h5 className="Action">Remove all</h5>
      </div>
      {cartdata.map((item, index) => (
        <div className="Cart-Items">
          <div className="about">
            <h1 className="title">{item.name}</h1>
            <h3 className="subtitle">
              {item.company}-{item.category}
            </h3>
          </div>
          <div className="counter">
            <div className="btn">+</div>
            <div className="count">2</div>
            <div className="btn">-</div>
          </div>
          <div className="prices">
            <div className="amount">{item.price}</div>
            <div className="save">
              <u>Save for later</u>
            </div>
            <div className="remove">
              <u>Remove</u>
            </div>
          </div>
        </div>
      ))}

      <hr />
      <div className="checkout">
        <div className="total">
          <div>
            <div className="Subtotal">Sub-Total</div>
            <div className="items">2 items</div>
          </div>
          <div className="total-amount">$6.18</div>
        </div>
        <button className="button">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
