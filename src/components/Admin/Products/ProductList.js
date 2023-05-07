import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import ProductListall from "../../commonComponents/ProductListall";
import jwt_decode from "jwt-decode";
const ProductList = () => {
  const [offset, setOffset] = useState(0);

  const navigate = useNavigate();
  const [perPage] = useState(2);
  const [pageCount, setPageCount] = useState(0);
  const [products, setproducts] = useState([]);
  const [productsall, setproductsall] = useState([]);

  let decoded = jwt_decode(localStorage.getItem("auth"));

  const authrole = decoded.updated_result.role;
  useEffect(() => {
    // localStorage.setItem("prodCount", products.length);

    if (localStorage.getItem("auth")) {
      getProducts();
      getProductsall();
    } else {
      navigate("/login");
    }
  }, [offset]);

  const getProducts = async () => {
    let decoded = jwt_decode(localStorage.getItem("auth"));

    const userid = decoded.updated_result.id;

    const result = await fetch(`http://localhost:5000/products/${userid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      },
    });
  
  
    if(result===200){
      const json = await result.json();
      localStorage.setItem("productlength", json.length);
      const slice =json.slice(offset, offset + perPage);
      setproducts(slice);
      console.log(slice);
      setPageCount(Math.ceil(json.length / perPage));
        console.log(offset);
    }

    
  };
  const getProductsall = async () => {




    const result = await fetch('http://localhost:5000/products', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      },
    });
   console.log(result.status);
    if(result.status===200){
      const json = await result.json();
      localStorage.setItem("productlength", json.length);
      const slice = json.slice(offset, offset + perPage);
      setproductsall(slice);
      console.log(slice);
      setPageCount(Math.ceil(json.length / perPage));
        console.log(offset);
       
  
    }
  
   
      
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
      setproductsall(r);
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
      authrole={authrole}
      products={products}
      productsall={productsall}
      deleteproduct={deleteproduct}
      pageCount={pageCount}
   
    />
  );
};

export default ProductList;
