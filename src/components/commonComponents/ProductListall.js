import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Modal from "./Modal";
import loader from "../../assets/img/Iphone-spinner-2.gif";
const ProductListall = ({
  handlePageClick,
  searchproduct,
  authrole,
  products,
  productsall,
  deleteproduct,
  pageCount,
 
}) => {
  const [open, setopen] = useState("false");
  const [loading, setloading] = useState(true);
  const [prodId, setprodId] = useState();
  const openModal = (id) => {
    setopen("true");
    setprodId(id);
    console.log(prodId);
  };
setTimeout(() => {
  setloading(false);
},1000);
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
        {authrole === "admin" ? (
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
            <tr><td colSpan={5}>{loading && <img src={loader} alt=""/>}</td></tr>
                {!loading && products.length > 0 ? (
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
                 <td colSpan={5}>{!loading && <span>No Result Found</span>}</td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <>
            <table className="fl-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Company</th>
                  <th>View Item</th>
                </tr>
              </thead>
              <tbody>
              <tr><td colSpan={5}>{loading && <img src={loader} alt=""/>}</td></tr>
                
                {!loading && productsall.length > 0 ? (
                  productsall.map((item, index) => (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>${item.price}</td>
                      <td>{item.category}</td>
                      <td>{item.company}</td>

                      <td>
                        <Link to={"/viewproduct/" + item._id}>
                          <i className="fa fa-eye" aria-hidden="true"></i>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>{!loading && <span>No Result Found</span>}</td>
                    
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}

        <ReactPaginate
          previousLabel={"prev"}
          nextLabel={"next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={2}
          onPageChange={handlePageClick}
          containerClassName={"pagination"}
          subContainerClassName={"pages pagination"}
          activeClassName={"active"}
        />
      </div>
    </div>
  );
};

export default ProductListall;
