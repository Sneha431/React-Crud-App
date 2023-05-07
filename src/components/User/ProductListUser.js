import React, { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import ProductListall from "../../commonComponents/ProductListall";
const ProductListUser = () => {
  const [offset, setOffset] = useState(0);

  const navigate = useNavigate();
  const [perPage] = useState(2);
  const [pageCount, setPageCount] = useState(0);
  const [products, setproducts] = useState([]);
  var decoded = jwt_decode(localStorage.getItem("auth"));

  useEffect(() => {
    // localStorage.setItem("prodCount", products.length);

    if (localStorage.getItem("auth")) {
      getProducts();
    } else {
      navigate("/");
    }
  }, [offset]);
  const getProducts = async () => {
    var decoded = jwt_decode(localStorage.getItem("auth"));
    const userid = decoded.updated_result.id;

    const result = await fetch(`http://localhost:5000/products/${userid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      },
    });
    const json = await result.json();
    localStorage.setItem("productlength", json.length);
    const slice = json.slice(offset, offset + perPage);
    setproducts(slice);
    setPageCount(Math.ceil(json.length / perPage));
  };
  const deleteproduct = async (id) => {
    console.log(id);
    const result = await fetch(`http://localhost:5000/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      },
    });
    const json = await result.json();
    if (json) {
      getProducts();
    }
  };
  const searchproduct = async (e) => {
    let key = e.target.value;
    const result = await fetch(`http://localhost:5000/search/${key}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      },
    });
    const r = await result.json();
    if (r) {
      setproducts(r);
       setproducts(r);
    }
  };
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    console.log(selectedPage);
    setOffset(selectedPage + 1);
  };
  return (
    <ProductListall
      handlePageClick={handlePageClick}
      searchproduct={searchproduct}
      authrole={decoded.updated_result.role}
      products={products}
      deleteproduct={deleteproduct}
      pageCount={pageCount}
    />
  );
};

export default ProductListUser;
