import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <br />
      <Link className="bg-sky-100 text-xl" to="/login">
        Login
      </Link>
      <br />
      <br />
      <Link className="bg-sky-100 text-xl" to="/register">
        Register
      </Link>
    </div>
  );
};

export default Home;
