import React, {
  createContext,
  useEffect,
  useReducer,
  useState,
  useContext,
} from "react";
import jwt_decode from "jwt-decode";
import { cartReducer } from "./Reducer";

const Cart = createContext();

const Context = ({ children }) => {
  const [cartdata, setcartdata] = useState([]);
  var decoded = jwt_decode(localStorage.getItem("auth"));
  const userid = decoded.updated_result.id;
  useEffect(() => {
    // fetch(`http://localhost:5000/getcartdata/${userid}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
    //   },
    // })
    //   .then((response) => {
    //     setcartdata(response.json());
    //     console.log(response.json());
    //   })
    //   .catch((error) => console.error(error));
    fetch(`http://localhost:5000/getcartdata/${userid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      },
    })
      .then((response) => response.json())

      .then((data) => {
        setcartdata(data);
      });
  }, []);

  // const getcartdata = async (e) => {
  //   var decoded = jwt_decode(localStorage.getItem("auth"));
  //   const userid = decoded.updated_result.id;
  //   const result = await fetch(`http://localhost:5000/getcartdata/${userid}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
  //     },
  //   });
  //   const json = await result.json();
  //   return json;
  // };
  const initialState = {
    products: [...cartdata],
  };

  return <Cart.Provider value={{ initialState }}>{children}</Cart.Provider>;
};

export default Context;
export const CartState = () => {
  return useContext(Cart);
};
