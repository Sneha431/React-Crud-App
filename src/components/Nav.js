import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/images.png";
const Nav = () => {
  const [visible, setVisible] = useState(false);
  const [products, setproducts] = useState([]);
  const handleToggle = () => {
    setVisible(!visible);
  };
  const auth = localStorage.getItem("auth");
  const user = localStorage.getItem("user");
  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    navigate("/login");
  };

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
                <i className="fa fa-plus">
                  {/* <span className="badge badge-info">11</span> */}
                </i>
                Add Products
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="fa fa-refresh">
                  {/* <span className="badge badge-info">11</span> */}
                </i>
                Update Products
              </Link>
            </li>
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
                  {JSON.parse(user).name}
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
