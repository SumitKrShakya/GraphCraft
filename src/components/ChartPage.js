import React, { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import CustomizationPanel from "./CustomizationPanel";
import ChartArea from "./ChartArea";
import "./ChartPage.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import userContext from "../context/userContext";

const ChartPage = () => {
  const { id } = useParams();
  const { setData } = useContext(userContext);

  useEffect(() => {
    const call = async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/chart/getchart`,
        { token: localStorage.getItem("jwt"), id }
      );
      console.log("+", response.data);
      setData(response.data.chart.data);
    };
    call();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="page">
        <CustomizationPanel />
        <ChartArea />
      </div>
    </div>
  );
};

export default ChartPage;
