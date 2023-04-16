import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setproducts] = useState([]);
  useEffect(() => {
    getProducts();
    // localStorage.setItem("prodCount", products.length);
  }, []);
  const getProducts = async () => {
    const result = await fetch("http://localhost:5000/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
      },
    });
    const json = await result.json();

    setproducts(json);
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
    }
  };

  return (
    <div className="container">
      <div className="table-wrapper">
        <div className="form-group pull-right">
          <input
            type="text"
            className="search form-control"
            placeholder="Search"
            onChange={searchproduct}
          />
        </div>
        <table className="fl-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Company</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>{item.category}</td>
                  <td>{item.company}</td>
                  <td colSpan={2}>
                    <Link to={"/update/" + item._id}>
                      <i className="material-icons">&#xE254;</i>
                      &nbsp; &nbsp;
                    </Link>

                    <i
                      className="material-icons"
                      onClick={() => deleteproduct(item._id)}
                    >
                      &#xE872;
                    </i>
                  </td>
                </tr>
              ))
            ) : (
              <span className="text-center">No Result Found</span>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
