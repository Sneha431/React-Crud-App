import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const ViewProduct = () => {
  const params = useParams();
  const prodid = params.id;
  const [name, setname] = useState("");
  const [price, setprice] = useState("");
  const [category, setcategory] = useState("");
  const [company, setcompany] = useState("");
  const [image, setimage] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    getsingleproduct();
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
      });
  }, []);
  const getsingleproduct = async (e) => {
    const result = await fetch(`http://localhost:5000/product/${prodid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      },
    });
    const json = await result.json();

    setname(json.name);
    setimage(json.imagename);
    setprice(json.price);
    setcategory(json.category);
    setcompany(json.company);
  };

  const addtocart = async (e) => {
    let decoded = jwt_decode(localStorage.getItem("auth"));

    const userId = decoded.updated_result.id;
    const cartquantity = 1;
    const result = await fetch("http://localhost:5000/addtocart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      },
      body: JSON.stringify({
        name,
        price,
        category,
        company,
        userId,
        cartquantity,
      }),
    });

    if (result.status === 200) {
      const json = await result.json();
      console.log(json);
      if (json !== "") {
        window.location.reload();
      }
    } else {
      alert("Enter correct details");
    }
  };
  return (
    // <div className="card">
    //   {/* <img src="jeans3.jpg" alt="Denim Jeans" style={{ width: "100%" }} /> */}
    //   <h1>{name}</h1>
    //   <p className="price">{price}</p>
    //   <p>{category}</p>
    //   <p>{company}</p>
    //   <p>
    //     <button onClick={addtocart}>Add to Cart</button>
    //   </p>
    // </div>

    <div className="container">
      <div>
        {" "}
        <img src={image} alt="" data-image="blue" />
      </div>
      <br></br>
      <div className="right-column">
        <div className="product-description">
          <h1>{name}</h1>
          <span>Category-{category}</span>
          <br></br>
          <p>Company -{company}</p>
          <p>
            The preferred choice of a vast range of acclaimed DJs. Punchy,
            bass-focused sound and high isolation. Sturdy headband and on-ear
            cushions suitable for live performance
          </p>
        </div>

        <div className="product-price">
          <span>${price}</span>
          <br />
          <button onClick={addtocart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
