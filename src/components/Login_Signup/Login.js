import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alert from "../commonComponents/Alert";
const Login = () => {
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [passvisible, setpassvisible] = useState(false);
  const [alertmsg, setalertmsg] = useState("");
  const [alertype, setalerttype] = useState("");
  const [error, seterror] = useState("");
  const [errorpass, seterrorpass] = useState("");
  const navigate = useNavigate();

  const submitdatalogin = async (e) => {
    e.preventDefault();

    if (error === "" && errorpass === "") {
      let result = await fetch("http://localhost:5000/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await result.json();

      if (json.result === true) {
        localStorage.setItem("auth", JSON.stringify(json.auth));

        navigate("/");
      } else {
        //alert("Enter correct details");
        setalertmsg("Alert : Enter correct details");
        setalerttype("danger");
      }
    }
  };
  setTimeout(() => {
    setalertmsg("");
    setalerttype("");
  }, 8000);
  useEffect(() => {
    const auth = localStorage.getItem("auth");

    if (!auth) {
      navigate("/login");
    }
  }, []);

  const changevisibility = () => {
    setpassvisible(!passvisible);
  };
  const validateemail = (e) => {
    setemail(e.target.value);
    if (!e.target.value) {
      seterror("Required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)
    ) {
      seterror("Invalid email address");
    } else {
      seterror("");
    }
  };
  const validatepassword = (e) => {
    setpassword(e.target.value);
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{8,}/;
    if (e.target.value === "") {
      seterrorpass("Please enter your password!");
    } else if (!specialCharRegExp.test(e.target.value)) {
      seterrorpass("At least one Special Characters");
    } else if (!minLengthRegExp.test(e.target.value)) {
      seterrorpass("At least minumum 8 characters");
    } else if (!uppercaseRegExp.test(e.target.value)) {
      seterrorpass("At least one Uppercase");
    } else if (!lowercaseRegExp.test(e.target.value)) {
      seterrorpass("At least one Lowercase");
    } else if (!digitsRegExp.test(e.target.value)) {
      seterrorpass("At least one digit");
    } else {
      seterrorpass("");
    }
  };
  return (
    <>
      <Alert propscontent={{ msg: alertmsg, type: alertype }} />

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
                  onChange={(e) => validateemail(e)}
                />
                <br />
                {/* {!email && (
                  <span className="validmsg">Enter a valid email</span>
                )} */}
                <span className="validmsg"> {error}</span>
              </div>
              <div className="login__field">
                <i className="login__icon fa fa-lock"></i>
                <input
                  type={passvisible ? "text" : "password"}
                  className="login__input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => validatepassword(e)}
                />
                <span>
                  <i
                    className="login__icon fa fa-eye"
                    onClick={changevisibility}
                  ></i>
                </span>
                <br />
                <span className="validmsg"> {errorpass}</span>
              </div>
              <p className="mr-5">
                <Link to="/forgetpassword" style={{ color: "#5c5696" }}>
                  Forget Password ?
                </Link>
              </p>
              <button
                className="button login__submit"
                onClick={submitdatalogin}
              >
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
                <Link
                  to="#"
                  className="social-login__icon fa fa-facebook"
                ></Link>
                <Link
                  to="#"
                  className="social-login__icon fa fa-twitter"
                ></Link>
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
    </>
  );
};

export default Login;
