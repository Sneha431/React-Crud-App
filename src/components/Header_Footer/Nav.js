import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import logo from "../../assets/img/images.png";
// import { CartState } from "../context/Context";
const Nav = () => {
  const [visible, setVisible] = useState(false);

  const handleToggle = () => {
    setVisible(!visible);
  };
  let decoded = jwt_decode(localStorage.getItem("auth"));
  const role = decoded.updated_result.role;
  const user = decoded.updated_result.id;
  const username = decoded.updated_result.name;
  const logout = () => {
    if (localStorage.getItem("auth") !== null) {
      localStorage.clear(); 

      navigate("/login");
    }
  };

  // const {
  //   initialState: { products },
  // } = CartState();
  const navigate = useNavigate(); //use to re-render the comp, if any changes found in navigation

  return (
    <>
      <nav className="navbar navbar-icon-top navbar-expand-lg">
        <Link className="navbar-brand" to="/">
          <img src={logo} style={{ height: "50px", borderRadius: "25%" }} />
          {/* <caption>
            <p style={{ fontSize: "20px", color: "white" }}>Ecom Dashboard</p>{" "}
          </caption> */}
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={handleToggle}
        >
          <span className="navbar-toggler-icon">
            <i className="fa fa-bars"></i>
          </span>
        </button>

        <div
          className={`collapse navbar-collapse ${
            visible === true ? "show" : ""
          }`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                <i className="fa fa-home"></i>
                Home
                <span className="sr-only">(current)</span>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ">
            {role === "admin" ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <i className="fa fa-bell">
                      <span className="badge badge-info">
                        {localStorage.getItem("productlength")}
                      </span>
                    </i>
                    Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/add">
                    <i className="fa fa-plus"></i>
                    Add Products
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <i className="fa fa-refresh"></i>
                    Update Products
                  </Link>
                </li>
              </>
            ) : (
              <>
                {" "}
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    <i className="fa fa-bell">
                      <span className="badge badge-info">
                        {localStorage.getItem("cartlength")!==null?localStorage.getItem("cartlength"):0}
                      </span>
                    </i>
                    Cart
                  </Link>
                </li>
              </>
            )}

            <li className="nav-item">
              {user ? (
                <Link className="nav-link" onClick={logout} to="/login">
                  <i className="fa fa-sign-out"></i>
                  LogOut
                </Link>
              ) : (
                <>
                  <Link className="nav-link" to="/login">
                    <i className="fa fa-sign-out">
                      {/* <span className="badge badge-success">11</span> */}
                    </i>
                    LogIn
                  </Link>
                  <Link className="nav-link" to="/signup">
                    <i className="fa fa-sign-out">
                      {/* <span className="badge badge-success">11</span> */}
                    </i>
                    SignUp
                  </Link>
                </>
              )}
            </li>

            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/profile">
                  <i className="fa fa-user">
                    {/* <span className="badge badge-success">11</span> */}
                  </i>
                  {username}
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Nav;
