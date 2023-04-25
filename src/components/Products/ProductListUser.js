import React, { useState, useEffect } from "react";

const ProductListUser = () => {
  const [products, setproducts] = useState([]);
  useEffect(() => {
    getProducts();
    // localStorage.setItem("prodCount", products.length);
  }, []);
  const getProducts = async () => {
    const result = await fetch("http://localhost:5000/allproduct", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await result.json();
    localStorage.setItem("productlength", json.length);
    setproducts(json);
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
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center">No Result Found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductListUser;
