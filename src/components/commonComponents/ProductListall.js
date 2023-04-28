import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import Modal from "./Modal";

const ProductListall = ({
  handlePageClick,
  searchproduct,
  authrole,
  products,
  deleteproduct,
  pageCount,
}) => {
  const [open, setopen] = useState("false");

  const [prodId, setprodId] = useState();
  const openModal = (id) => {
    setopen("true");
    setprodId(id);
    console.log(prodId);
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
                {products.length > 0 ? (
                  products.map((item, index) => (
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
                    <td className="text-center">No Result Found</td>
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

export default ProductListall;
