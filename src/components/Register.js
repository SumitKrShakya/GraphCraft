import React, { useState } from "react";
import Logo from "../images/LogoNameVertical.png";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { message } from "antd";

const Register = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/register`,
        details
      );
      const res = response.data;
      if (res.success) {
        localStorage.setItem("jwt", res.token);
        localStorage.setItem("username", res.newUser.username);
        messageApi.open({
          type: "success",
          content: "Successfully registered!",
          duration: 3,
        });
        navigate("/dashboard");
        messageApi.open({
          type: "success",
          content: `Welcome ${res.newUser.username}!`,
          duration: 3,
        });
      } else {
        window.alert(res.message);
      }
    } catch (error) {
      console.log(error);
      messageApi.error(`${error.response.data.message}`);
    }
  };

  console.log(details);
  return (
    <div className="body">
      {contextHolder}
      <motion.div
        initial={{ opacity: 0, y: "1vh", scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: "-1vh", scale: 0.98 }}
        className="box"
      >
        <img className="logo" src={Logo} />
        <div className="inputbox">
          <label for="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={details.username}
            onChange={(e) => {
              setDetails((prev) => {
                return { ...prev, username: e.target.value };
              });
            }}
          />
        </div>
        <div className="inputbox">
          <label for="email">Email</label>
          <input
            id="email"
            type="text"
            name="email"
            value={details.email}
            onChange={(e) => {
              setDetails((prev) => {
                return { ...prev, email: e.target.value };
              });
            }}
          />
        </div>
        <div className="inputbox">
          <label for="password">Password</label>
          <input
            id="password"
            type="password"
            value={details.password}
            name="password"
            onChange={(e) => {
              setDetails((prev) => {
                return { ...prev, password: e.target.value };
              });
            }}
          />
        </div>
        {/* <div className="inputbox">
          <label for="confirmPassword">Confirm Password</label>
          <input
            id="confirm password"
            type="password"
            value={details.confirmPassword}
            name="confirmPassword"
            onChange={(e) => {
              setDetails((prev) => {
                return { ...prev, confirmPassword: e.target.value };
              });
            }}
          />
        </div> */}
        <div className="inputbox">
          <button
            onClick={() => {
              handleRegister();
            }}
            className="button-primary"
          >
            Create Account
          </button>
        </div>

        <div className="inputbox">
          Already have an account?{" "}
          <Link className="link" to="/login">
            Sign in →
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
