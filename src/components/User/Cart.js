import React, { createContext, useContext, useReducer, useEffect } from "react";

import reducer from "./reducer";
import jwt_decode from "jwt-decode";
import CartItem from "./CartItem";
import data from "../../data.json";
import Thankyou from "./Thankyou";

// create a context
export const CartContext = createContext();

const Cart = () => {
  //   const [products, setproducts] = useState([]);

  const getcartdatafunc = () => {
    try {
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
    } catch (error) {
      console.log(error);
    }
  };
  const delcartdatafunc = (id) => {
    fetch(`http://localhost:5000/deletecartdata/${id}`, {
      method: "DELETE",
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
        getcartdatafunc();
        console.log(data);
      });
  };
  useEffect(() => {
    getcartdatafunc();
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
    delcartdatafunc(id);
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
    dispatch({
      type: "INCREMENT",
      payload: id,
    });
    dispatch({
      type: "GET_TOTAL",
    });
    console.log(id, cartquantity);
    let inc = "inc";
    fetch(`http://localhost:5000/updatecartqty/${id}/${inc}`, {
      method: "PUT",
      body: JSON.stringify({ cartquantity }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      },
    })
      .then((response) => response.json())

      .then((data) => {
        console.log(data);
        getcartdatafunc();
      });
  };

  const decrement = (id, cartquantity) => {
    if (cartquantity > 0) {
      dispatch({
        type: "DECREMENT",
        payload: id,
      });
      dispatch({
        type: "GET_TOTAL",
      });
      console.log(id, cartquantity);
      let dec = "dec";

      fetch(`http://localhost:5000/updatecartqty/${id}/${dec}`, {
        method: "PUT",
        body: JSON.stringify({ cartquantity }),
        headers: {
          "Content-Type": "application/json",
          authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
        },
      })
        .then((response) => response.json())

        .then((data) => {
          console.log(data);
          getcartdatafunc();
        });
    }
    console.log(cartquantity);
    if (cartquantity <= 1) {
      removeItem(id);
      delcartdatafunc(id);
    }
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
