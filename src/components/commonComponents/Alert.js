import React from "react";

const Alert = (props) => {
  return (
    <div className={`alert alert-${props.propscontent.type}`} role="alert">
      {props.propscontent.msg}
    </div>
  );
};

export default Alert;
