import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
const Login = () => {
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const navigate = useNavigate();
  const submitdatalogin = async (e) => {
    e.preventDefault();

    let result = await fetch("http://localhost:5000/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await result.json();
    console.log(json);
    if (json.auth) {
      localStorage.setItem("user", JSON.stringify(json.result));
      localStorage.setItem("auth", JSON.stringify(json.auth));
      navigate("/");
    } else {
      alert("Enter correct details");
    }
  };
  useEffect(() => {
    const auth = localStorage.getItem("auth");

    if (auth) {
      navigate("/");
    }
  }, []);
  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login">
            <div className="login__field">
              <i className="login__icon fa fa-user"></i>
              <input
                type="text"
                className="login__input"
                placeholder="User name / Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fa fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>
            <button className="button login__submit" onClick={submitdatalogin}>
              <span className="button__text">Log In Now</span>
              <i className="button__icon fa fa-chevron-right"></i>
            </button>
          </form>
          <div className="social-login">
            <p>
              <Link to="/signup">Create an account</Link>
            </p>
            <h3>log in via</h3>
            <div className="social-icons">
              <Link
                to="#"
                className="social-login__icon fa fa-instagram"
              ></Link>
              <Link to="#" className="social-login__icon fa fa-facebook"></Link>
              <Link to="#" className="social-login__icon fa fa-twitter"></Link>
            </div>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
