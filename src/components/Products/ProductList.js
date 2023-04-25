import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [offset, setOffset] = useState(0);
  const [index, setindex] = useState(0);

  const [perPage] = useState(2);
  const [pageCount, setPageCount] = useState(0);
  const [products, setproducts] = useState([]);
  useEffect(() => {
    getProducts();
    // localStorage.setItem("prodCount", products.length);
  }, [offset]);
  const getProducts = async () => {
    let userid = JSON.parse(localStorage.getItem("user"));

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
    }
  };
  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    console.log(selectedPage);
    setOffset(selectedPage + 1);
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
              <tr>
                <td className="text-center">No Result Found</td>
              </tr>
            )}
          </tbody>
        </table>
        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default ProductList;
