import React, { useState } from "react";
import Logo from "../images/LogoNameVertical.png";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const [details, setDetails] = useState({ email: "", password: "" });
  console.log(details);

  const handleLogin = async () => {
    const response = axios.post(
      `${process.env.REACT_APP_SERVER_URL}/user/login`,
      details
    );
    const res = (await response).data;
    if (res.success) {
      localStorage.setItem("jwt", res.token);
      navigate("/dashboard");
    } else {
      window.alert(res.message);
    }
    console.log(response.data);
  };

  return (
    <div className="body">
      <div className="box">
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
      </div>
    </div>
  );
};

export default Login;
