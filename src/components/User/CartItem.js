import React, { useContext, useState } from "react";
// import { CartState } from "../context/Context";
import { useNavigate, createSearchParams } from "react-router-dom";
import { CartContext } from "./Cart";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";

const CartItem = () => {
  const navigate = useNavigate();
  // const counter = useSelector((state) => state.cartReducer.count);
  const [checkoutdata, setcheckoutdata] = useState([]);
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
  const random = require("random-string-alphanumeric-generator");
  const removeAll = async (e) => {
    e.preventDefault();

    let result = await fetch("http://localhost:5000/deletecart", {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await result.json();
    console.log(json);
    if (json) {
      alert("Cleared");
      window.location.reload();
      //   setalertmsg("Alert : Cart Cleared");
    } else {
      //alert("Enter correct details");
      //setalertmsg("Alert : Enter correct details");
      //("danger");
    }
  };
  useEffect(() => {
    var decoded = jwt_decode(localStorage.getItem("auth"));
    localStorage.setItem("total", totalAmount);
    const userid = decoded.updated_result.id;
    fetch(`http://localhost:5000/getcartdata/${userid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setcheckoutdata(data);
      });
  }, []);
  const orderid = random.randomHex(10);
  const submitcheckout = async (e) => {
    e.preventDefault();
    const result = await fetch("http://localhost:5000/submitcheckoutfunc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      },
      body: JSON.stringify({
        checkoutdata,
        orderID: orderid,
      }),
    });
    console.log(result);
    if (result.status === 200) {
      // navigate({
      //   pathname: "/thank-you",
      //   search: `?orderid=${createSearchParams(orderid)}`,
      // });
      navigate({
        pathname: "/thank-you",
        search: createSearchParams({
          orderid: orderid,
        }).toString(),
      });
    }
    // var decoded = jwt_decode(localStorage.getItem("auth"));
    // const userid = decoded.updated_result.id;
    // fetch(`http://localhost:5000/getcartdata/${userid}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) =>
    //     // fetch("http://localhost:5000/submitcheckout", {
    //     //   method: "POST",

    //     //   headers: {
    //     //     "Content-Type": "application/json",
    //     //     authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
    //     //   },
    //     //   body: data,
    //     // })
    //   );
  };

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
            <div
              className="btn"
              onClick={() => increment(item._id, item.cartquantity)}
            >
              +
            </div>
            <div>{item.cartquantity}</div>
            <div
              className="btn"
              onClick={() => decrement(item._id, item.cartquantity)}
            >
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

        <a href="" onClick={submitcheckout}>
          <button className="button">Checkout</button>
        </a>
      </div>
    </div>
  );
};

export default CartItem;
