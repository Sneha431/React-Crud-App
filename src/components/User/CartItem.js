import React from "react";
import { CartState } from "../context/Context";
import { useDispatch, useSelector } from "react-redux";
import { increment, decrement } from "../context/action";

const CartItem = () => {
  const counter = useSelector((state) => state.cartReducer.count);
  const {
    initialState: { products },
  } = CartState();

  const dispatch = useDispatch();
  const handleIncrement = () => {
    dispatch(increment(1));
    console.log(counter);
  };

  const handleDecrement = () => {
    dispatch(decrement(1));
  };
  return (
    <div className="CartContainer">
      <div className="Header">
        <h3 className="Heading">Shopping Cart</h3>
        <h5 className="Action">Remove all</h5>
      </div>
      {products.map((item, index) => (
        <div className="Cart-Items">
          <div className="about">
            <h1 className="title">{item.name}</h1>
            <h3 className="subtitle">
              {item.company}-{item.category}
            </h3>
          </div>
          <div className="counter">
            <div className="btn" onClick={() => handleIncrement()}>
              +
            </div>
            <div>{counter}</div>
            <div className="btn" onClick={() => handleDecrement()}>
              -
            </div>
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
