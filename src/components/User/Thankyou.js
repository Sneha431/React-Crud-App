import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "./Cart";
import jwt_decode from "jwt-decode";
import { useParams, useSearchParams } from "react-router-dom";

const Thankyou = () => {
  // const [totprice, settotprice] = useState();
  const [searchParams] = useSearchParams();

  const orderid = searchParams.get("orderid");
  // useEffect(() => {
  //   var decoded = jwt_decode(localStorage.getItem("auth"));
  //   const userid = decoded.updated_result.id;
  //   fetch(`http://localhost:5000/getcartdata/${userid}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);

  //       let arr = [];
  //       data.map((i) => arr.push(parseFloat(i.price)));
  //       console.log(arr);
  //       if (arr !== []) {
  //         const sumInitial = arr.reduce((acc, curr) => acc + parseFloat(curr));
  //         settotprice(sumInitial);
  //       }
  //     });
  // }, []);

  return (
    <div
      className="product_info tab_cont"
      id="tab1"
      style={{ display: "table" }}
    >
      <div className="col-md-12">
        <div className="thank_inner">
          <h1>Thank You For Your Order</h1>
          <h2> You'll receive your confirmation email within 30 mins. </h2>
          <h2 className="order_txt">ORDER RECEIPT</h2>
          <div className="product_price">
            <p className="l">Order placed: </p>

            <p className="r">
              {new Date().getFullYear() +
                "-" +
                (new Date().getMonth() + 1) +
                "-" +
                new Date().getDate()}
            </p>
          </div>

          <div className="product_price">
            <p className="l">Transaction ID: </p>
            <p className="r" id="transaction-p">
              #{orderid}
            </p>
          </div>

          <div className="product_price total_price">
            <p className="l">Total: </p>
            <p className="r">${localStorage.getItem("total")}</p>
          </div>
          <div className="product_price disclaimer">
            {/* <p>
              <small>
                **Charges will appear on your credit card as one of the
                following: BP120, PD120, Blood Pressure 120, Pressure Down 120
              </small>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thankyou;
