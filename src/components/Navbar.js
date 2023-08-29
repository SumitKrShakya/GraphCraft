import React from "react";
import "./Navbar.css";
import LogoHorizontal from "../images/LogoNameHorizontal.png";

const Navbar = () => {
  const name = localStorage.getItem("username");
  const firstLetterName = "A";
  if (name) {
    firstLetterName = name.toUpperCase()[0];
  }
  return (
    <div className="navbar">
      <div>
        <img src={LogoHorizontal} />
        <div className="nameicon">{firstLetterName}</div>
      </div>
    </div>
  );
};

export default Navbar;
