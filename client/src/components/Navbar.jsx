import React from "react";
import Hakim from "../images/Hakim.svg";
const Navbar = ({ accounts }) => {
  return (
    <div className="bg-dark">
      <div className="container py-2 d-flex justify-content-between align-items-center">
        <h3 className="lead text-white">
          <img
            src={Hakim}
            alt="Hakim logo"
            style={{ width: 30, height: 30, marginRight: 10 }}
          />
          Dapp Token Farm
        </h3>
        <p className="text-muted">Accounts : {accounts}</p>
      </div>
    </div>
  );
};

export default Navbar;
