import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./Cart";
import jwt_decode from "jwt-decode";

const Thankyou = () => {
  const [totprice, settotprice] = useState();
  useEffect(() => {
    var decoded = jwt_decode(localStorage.getItem("auth"));
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
        console.log(data);

        let arr = [];
        data.map((i) => arr.push(parseFloat(i.price)));
        console.log(arr);
        if (arr !== []) {
          const sumInitial = arr.reduce((acc, curr) => acc + parseFloat(curr));
          settotprice(sumInitial);
        }
      });
  }, []);

  return (
    <div class="product_info tab_cont" id="tab1" style={{ display: "table" }}>
      <div class="col-md-12">
        <div class="thank_inner">
          <h1>Thank You For Your Order</h1>
          <h2> You'll receive your confirmation email within 30 mins. </h2>
          <h2 class="order_txt">ORDER RECEIPT</h2>
          <div class="product_price">
            <p class="l">Order placed: </p>

            <p class="r">
              {new Date().getFullYear() +
                "-" +
                (new Date().getMonth() + 1) +
                "-" +
                new Date().getDate()}
            </p>
          </div>

          <div class="product_price">
            <p class="l">Transaction ID: </p>
            <p class="r" id="transaction-p"></p>
          </div>

          <div class="product_price total_price">
            <p class="l">Total: </p>
            <p class="r">${totprice}</p>
          </div>
          <div class="product_price disclaimer">
            <p>
              <small>
                **Charges will appear on your credit card as one of the
                following: BP120, PD120, Blood Pressure 120, Pressure Down 120
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
