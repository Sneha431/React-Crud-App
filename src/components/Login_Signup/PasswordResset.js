import React, { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../commonComponents/Alert";
const PasswordResset = () => {
  const [password, setpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [email, setemail] = useState("");
  const [passvisible, setpassvisible] = useState(false);
  const [passvisiblenew, setpassvisiblenew] = useState(false);
  const [alertmsg, setalertmsg] = useState("");
  const [alertype, setalerttype] = useState("");
  const [error, seterror] = useState("");
  const [errorpass, seterrorpass] = useState("");
  const [errorpassnew, seterrorpassnew] = useState("");
  // const navigate = useNavigate();
  const submitdatalogin = async (e) => {
    e.preventDefault();

    if (error === "" && errorpass === "" && errorpassnew === "") {
      let result = await fetch("http://localhost:5000/forgetpassword", {
        method: "PUT",
        body: JSON.stringify({ email, password, newpassword }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const json = await result.json();

      if (json.acknowledged === true) {
        setalertmsg("Alert : Password Reset Successfully");
        setalerttype("success");
      } else {
        //alert("Enter correct details");
        setalertmsg("Alert : Enter correct details");
        setalerttype("danger");
      }
    } else {
      return false;
    }
  };
  setTimeout(() => {
    setalertmsg("");
    setalerttype("");
  }, 8000);

  const changevisibility = () => {
    setpassvisible(!passvisible);
  };
  const changevisibilitynew = () => {
    setpassvisiblenew(!passvisiblenew);
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
  const validatenewpassword = (e) => {
    setnewpassword(e.target.value);
    const uppercaseRegExp = /(?=.*?[A-Z])/;
    const lowercaseRegExp = /(?=.*?[a-z])/;
    const digitsRegExp = /(?=.*?[0-9])/;
    const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
    const minLengthRegExp = /.{8,}/;
    if (e.target.value === "") {
      seterrorpassnew("Please enter your password!");
    } else if (!specialCharRegExp.test(e.target.value)) {
      seterrorpassnew("At least one Special Characters");
    } else if (!minLengthRegExp.test(e.target.value)) {
      seterrorpassnew("At least minumum 8 characters");
    } else if (!uppercaseRegExp.test(e.target.value)) {
      seterrorpassnew("At least one Uppercase");
    } else if (!lowercaseRegExp.test(e.target.value)) {
      seterrorpassnew("At least one Lowercase");
    } else if (!digitsRegExp.test(e.target.value)) {
      seterrorpassnew("At least one digit");
    } else {
      seterrorpassnew("");
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
                  placeholder="Old Password"
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
              <div className="login__field">
                <i className="login__icon fa fa-lock"></i>
                <input
                  type={passvisiblenew ? "text" : "password"}
                  className="login__input"
                  placeholder="New Password"
                  value={newpassword}
                  onChange={(e) => validatenewpassword(e)}
                />
                <span>
                  <i
                    className="login__icon fa fa-eye"
                    onClick={changevisibilitynew}
                  ></i>
                </span>
                <br />
                <span className="validmsg"> {errorpassnew}</span>
              </div>

              <button
                className="button login__submit"
                onClick={submitdatalogin}
              >
                <span className="button__text">Reset Password</span>
                <i className="button__icon fa fa-chevron-right"></i>
              </button>
            </form>{" "}
            <p>
              <Link to="/login">Return to login</Link>
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

export default PasswordResset;
