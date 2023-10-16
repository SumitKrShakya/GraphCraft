import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Logo from "../images/Logo.png";
import { Button, Popover } from "antd";
import "./Home.css";
import Laptop from "../images/newLap.png";

const Home = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0.5, scale: 0.98, y: "1vh", borderRadius: "20px" }}
      animate={{ opacity: 1, scale: 1, y: "0vh", borderRadius: "0px" }}
      exit={{ opacity: 0.5, scale: 0.98, y: "1vh", borderRadius: "20px" }}
      transition={{ duration: 0.3 }}
    >
      {/* Navbar */}
      <div style={{ height: "100px" }} className="navbar">
        <div>
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <img height="100%" src={Logo} />
            <span
              style={{ fontSize: "4rem", fontWeight: 100, fontFamily: "sans" }}
              className="logoName"
            >
              Graph Craft
            </span>
          </div>
          <div className="loginbns">
            <Button
              onClick={() => {
                navigate("/login");
              }}
              size="large"
            >
              Login
            </Button>
            <Button
              onClick={() => {
                navigate("/register");
              }}
              type="primary"
              size="large"
            >
              Register
            </Button>
          </div>

          {/* <Popover
            placement="bottomRight"
            title={text}
            content={content}
            trigger="click"
          >
            <div className="nameicon">{firstLetterName}</div>
          </Popover> */}
        </div>
      </div>
      <div className="landingPage">
        <div className="tagline">
          <div className="title">Transforming Data into Insightful Visuals</div>
          <div className="description">
            Upload your CSV, unleash the power of visualization. Craft
            compelling bar graphs, dynamic line charts, captivating area graphs,
            and deliciously informative pie charts.
          </div>
        </div>

        <img className="laptop" src={Laptop} />
      </div>
    </motion.div>
  );
};

export default Home;
