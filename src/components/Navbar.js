import React, { useContext } from "react";
import "./Navbar.css";
import LogoHorizontal from "../images/LogoNameHorizontal.png";
import Logo from "../images/Logo.png";
import userContext from "../context/userContext";
import { Avatar, Badge, Button, Popover, message } from "antd";
import { AiOutlineCloudSync } from "react-icons/ai";
import { BsCloudCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { updating, setUpdating } = useContext(userContext);
  const name = localStorage.getItem("username");
  let firstLetterName = "A";
  if (name) {
    firstLetterName = name.toUpperCase()[0];
  }
  const text = <span style={{ fontSize: "1.5rem" }}>{name}</span>;

  const [messageApi, contextHolder] = message.useMessage();

  const content = (
    <div>
      <Button
        onClick={() => {
          messageApi.open({
            type: "success",
            content: "Logged out successfully!",
          });
          navigate("/");
          setTimeout(() => {
            localStorage.removeItem("jwt");
            localStorage.removeItem("username");
          }, 500);
        }}
        danger
        style={{ width: "100%", fontWeight: "bolder" }}
      >
        Logout
      </Button>
    </div>
  );
  return (
    <>
      {contextHolder}
      <div className="navbar">
        <div>
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
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
              <AiOutlineCloudSync
                fontSize={"1.8rem"}
                style={{ color: "blue" }}
              />
            ) : (
              <BsCloudCheckFill
                fontSize={"1.8rem"}
                style={{ color: "green" }}
              />
            )}
          </Badge>
          <Popover
            placement="bottomRight"
            title={text}
            content={content}
            trigger="click"
          >
            <div className="nameicon">{firstLetterName}</div>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default Navbar;
