import React from "react";

const Alert = ({ msg }) => {
  return (
    <div className="container my-2">
      <div className="alert alert-success">
        <p className="lead">{msg}</p>
      </div>
    </div>
  );
};

export default Alert;
