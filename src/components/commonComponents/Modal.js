import React, { useEffect } from "react";
import { useState } from "react";

const Modal = ({ open, setopen, prodId }) => {
  const [prods, setprods] = useState({});
  const getsingleproduct = async (e) => {
    // const result = await fetch(`http://localhost:5000/product/${prodId}`, {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     authorization: `bearer ${JSON.parse(localStorage.getItem("auth"))}`,
    //   },
    // });
    // const json = await result.json();
    // console.log(json);
  };
  useEffect(() => {
    // getsingleproduct();
    console.log(prodId);
  }, [prodId]);
  return (
    <div
      className="modal"
      tabIndex="-1"
      role="dialog"
      style={{ display: open === "true" ? "block" : "none" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{prodId}</h5>
            <button
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              onClick={() => setopen("false")}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <p>Modal body text goes here.</p>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-primary">
              Add To Cart
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-dismiss="modal"
              onClick={() => setopen("false")}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
