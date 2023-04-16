import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
const SignUp = () => {
  const [name, setname] = useState("a");
  const [password, setpassword] = useState("a");
  const [email, setemail] = useState("a");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);
  const submitdata = async (e) => {
    e.preventDefault();

    const result = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
    const json = await result.json();

    if (json.auth) {
      localStorage.setItem("user", JSON.stringify(json.result));
      localStorage.setItem("auth", JSON.stringify(json.auth));
      navigate("/");
    } else {
      alert("Enter correct details");
    }
  };
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
                value={name}
                placeholder="Name"
                onChange={(e) => setname(e.target.value)}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fa fa-user"></i>
              <input
                type="text"
                className="login__input"
                placeholder="User name / Email"
                onChange={(e) => setemail(e.target.value)}
                value={email}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fa fa-lock"></i>
              <input
                type="text"
                className="login__input"
                placeholder="Password"
                onChange={(e) => setpassword(e.target.value)}
                value={password}
              />
            </div>
            <button className="button login__submit" onClick={submitdata}>
              <span className="button__text">Sign Up Now</span>
              <i className="button__icon fa fa-chevron-right"></i>
            </button>
          </form>
          <p style={{ color: "white" }}>
            Already have account ?<Link to="/login">Login</Link>
          </p>
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

export default SignUp;
