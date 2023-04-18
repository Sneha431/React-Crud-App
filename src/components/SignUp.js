import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Alert from "./Alert";

const SignUp = () => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [password, setpassword] = useState("");

  const [email, setemail] = useState("");
  const [errorfname, seterrorfname] = useState("");
  const [errorlname, seterrorlname] = useState("");
  const [erroremail, seterroremail] = useState("");
  const [errorpass, seterrorpass] = useState("");
  const [errorconfirmpass, seterrorconfirmpass] = useState("");
  const [alertmsg, setalertmsg] = useState("");
  const [alertype, setalerttype] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);
  const submitdata = async (e) => {
    e.preventDefault();
    let name = firstname + " " + lastname;
    if (
      errorconfirmpass !== "" ||
      errorpass !== "" ||
      erroremail !== "" ||
      errorfname !== "" ||
      errorlname !== ""
    ) {
      return false;
    } else {
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
        setalertmsg("Alert :Something went wrong");
        setalerttype("danger");
      }
    }
  };
  setTimeout(() => {
    setalertmsg("");
    setalerttype("");
  }, 4000);
  const [passvisible, setpassvisible] = useState(false);
  const changevisibility = () => {
    setpassvisible(!passvisible);
  };

  const validateemail = (e) => {
    setemail(e.target.value);
    if (!e.target.value) {
      seterroremail("Required");
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)
    ) {
      seterroremail("Invalid email address");
    } else {
      seterroremail("");
    }
  };
  const validatelname = (e) => {
    setlastname(e.target.value);
    if (!e.target.value) {
      seterrorlname("Please enter your last name");
    } else {
      seterrorlname("");
    }
  };
  const validatefname = (e) => {
    setfirstname(e.target.value);
    if (!e.target.value) {
      seterrorfname("Please enter your first name");
    } else {
      seterrorfname("");
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
  const validateconfirmpassword = (e) => {
    if (!e.target.value) {
      seterrorconfirmpass("Please enter your password again");
    } else if (e.target.value !== password) {
      seterrorconfirmpass("Password must match");
    } else {
      seterrorconfirmpass("");
    }
  };
  return (
    <>
      <Alert propscontent={{ msg: alertmsg, type: alertype }} />
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form className="signup">
              <div className="login__field">
                <i className="login__icon fa fa-user"></i>
                <input
                  type="text"
                  className="login__input"
                  value={firstname}
                  placeholder="First Name"
                  onChange={(e) => validatefname(e)}
                />
                <br />
                <span className="validmsg"> {errorfname}</span>
              </div>
              <div className="login__field">
                <i className="login__icon fa fa-user"></i>
                <input
                  type="text"
                  className="login__input"
                  value={lastname}
                  placeholder="Last Name"
                  onChange={(e) => validatelname(e)}
                />
                <br />
                <span className="validmsg"> {errorlname}</span>
              </div>
              <div className="login__field">
                <i className="login__icon fa fa-envelope"></i>
                <input
                  type="text"
                  className="login__input"
                  placeholder="User name / Email"
                  onChange={(e) => validateemail(e)}
                  value={email}
                />
                <br />
                <span className="validmsg"> {erroremail}</span>
              </div>
              <div className="login__field">
                <i className="login__icon fa fa-lock"></i>
                <input
                  type={passvisible ? "text" : "password"}
                  className="login__input"
                  placeholder="Password"
                  onChange={(e) => validatepassword(e)}
                  value={password}
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
              <div className="login__field">
                <i className="login__icon fa fa-lock"></i>
                <input
                  type="text"
                  className="login__input"
                  placeholder="Confirm Password"
                  onChange={(e) => validateconfirmpassword(e)}
                />
                <br />
                <span className="validmsg"> {errorconfirmpass}</span>
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
    </>
  );
};

export default SignUp;
