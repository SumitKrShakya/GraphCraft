import React, { useState } from "react";
import Logo from "../images/LogoNameVertical.png";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({ email: "", password: "" });
  console.log(details);
  const [messageApi, contextHolder] = message.useMessage();

  const handleLogin = async () => {
    try {
      const response = axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/login`,
        details
      );
      const res = (await response).data;
      if (res.success) {
        localStorage.setItem("jwt", res.token);
        localStorage.setItem("username", res.user.username);
        navigate("/dashboard");
      } else {
        window.alert(res.message);
      }
      console.log(response.data);
    } catch (error) {
      messageApi.info(error.response.data.message);
    }
  };

  return (
    <>
      {contextHolder}
      <motion.div
        initial={{ opacity: 0.5, scale: 0.98, y: "1vh", borderRadius: "20px" }}
        animate={{ opacity: 1, scale: 1, y: "0", borderRadius: "0px" }}
        exit={{ opacity: 0.5, scale: 0.98, y: "1vh", borderRadius: "20px" }}
        transition={{ duration: 0.3 }}
        className="body"
      >
        <motion.div
          initial={{ opacity: 0, y: "10vh", scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            y: "-10vh",
            scale: 0.98,
            transition: { duration: 0.1 },
          }}
          className="box"
        >
          <img className="logo" src={Logo} />
          <div className="inputbox">
            <label for="email">Email</label>
            <input
              id="email"
              type="text"
              name="email"
              value={details.email}
              onChange={(e) => {
                setDetails((prev) => {
                  return { email: e.target.value, password: prev.password };
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
                  return {
                    email: prev.email,
                    password: e.target.value,
                  };
                });
              }}
            />
          </div>
          <div className="inputbox">
            <button
              onClick={() => {
                handleLogin();
              }}
              className="button-primary"
            >
              Sign In
            </button>
          </div>
          <div className="inputbox">
            New to GraphCraft?{" "}
            <Link className="link" to="/register">
              Create an account.
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default Login;
