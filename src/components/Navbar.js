import React, { useContext } from "react";
import "./Navbar.css";
import LogoHorizontal from "../images/LogoNameHorizontal.png";
import Logo from "../images/Logo.png";
import userContext from "../context/userContext";
import { Avatar, Badge } from "antd";
import { AiOutlineCloudSync } from "react-icons/ai";
import { BsCloudCheckFill } from "react-icons/bs";

const Navbar = () => {
  const { updating, setUpdating } = useContext(userContext);
  const name = localStorage.getItem("username");
  const firstLetterName = "A";
  if (name) {
    firstLetterName = name.toUpperCase()[0];
  }
  return (
    <div className="navbar">
      <div>
        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <img height="100%" src={Logo} />
          <span className="logoName">Graph Craft</span>
        </div>
        <Badge
          count={updating}
          offset={[10, 5]}
          overflowCount={999}
          color="royalblue"
        >
          {updating ? (
            <AiOutlineCloudSync fontSize={"1.8rem"} style={{ color: "blue" }} />
          ) : (
            <BsCloudCheckFill fontSize={"1.8rem"} style={{ color: "green" }} />
          )}
        </Badge>
        <div className="nameicon">{firstLetterName}</div>
      </div>
    </div>
  );
};

export default Navbar;
