import React, { createContext, useContext, useReducer, useEffect } from "react";

import reducer from "./reducer";
import jwt_decode from "jwt-decode";
import CartItem from "./CartItem";
import data from "../../data.json";

// create a context
export const CartContext = createContext();

const Cart = () => {
  //   const [products, setproducts] = useState([]);
  useEffect(() => {
    let decoded = jwt_decode(localStorage.getItem("auth"));

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
        //  setproducts(data);
        dispatch({
          type: "GET_TOTAL",
        });
      });
  }, []);
  let return_price = 0;

  data.map((itemp) => {
    return_price += parseInt(itemp.price);
    return return_price;
  });

  const initialState = {
    item: data ? data : [],

    totalAmount: return_price,
    totalItems: 0,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const clearCart = () => {
    return dispatch({ type: "CLEAR_CART" });
  };

  const removeItem = (id) => {
    console.log(id);
    return dispatch({
      type: "REMOVE_ITEM",
      payload: id,
    });
  };
  // const gettotal = () => {
  //   return dispatch({
  //     type: "GET_TOTAL",
  //   });
  // };
  const increment = (id, cartquantity) => {
    return (
      dispatch({
        type: "INCREMENT",
        payload: id,
      }),
      dispatch({
        type: "GET_TOTAL",
      })
    );
  };

  const decrement = (id) => {
    return (
      dispatch({
        type: "DECREMENT",
        payload: id,
      }),
      dispatch({
        type: "GET_TOTAL",
      })
    );
  };

  return (
    <>
      <CartContext.Provider
        value={{
          ...state,
          clearCart,
          removeItem,

          increment,
          decrement,
        }}
      >
        <CartItem />
      </CartContext.Provider>
    </>
  );
};

// custom Hook
export const useGlobalContext = () => {
  return useContext(CartContext);
};

export default Cart;
