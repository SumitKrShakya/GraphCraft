import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "10rem", fontWeight: 200 }}>Oops!</h1>
      <h1 style={{ fontWeight: 400 }}>403 Permission Denied</h1>
      <h3 style={{ fontWeight: 300 }}>
        Sorry, you do not have access to this page, please{" "}
        <Link style={{ fontWeight: 700 }} to="/login">
          Login
        </Link>{" "}
        or{" "}
        <Link style={{ fontWeight: 700 }} to="/register">
          Register
        </Link>{" "}
        First.
      </h3>
    </div>
  );
};

export default Unauthorized;
