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
  const {
    setCustomization,
    setData,
    setChartId,
    setChartType,
    setHideCustomization,
  } = useContext(userContext);

  useEffect(() => {
    const call = async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/chart/getchart`,
        { token: localStorage.getItem("jwt"), id }
      );
      setChartId(id);
      console.log("+", response.data);
      const newData = response.data.chart.data.map((item) => {
        let newItem = {};
        const isNumeric = (num) =>
          (typeof num === "number" ||
            (typeof num === "string" && num.trim() !== "")) &&
          !isNaN(num);
        for (const key in item) {
          newItem[key] = item[key];
          if (isNumeric(item[key])) {
            newItem[key] = parseFloat(item[key]);
          }
        }
        return newItem;
      });
      setData(newData);
      console.log("+n", newData);
      setCustomization(response.data.chart.customization);
      setChartType(response.data.chart.chartType);
      setHideCustomization(response.data.chart.hideCustomization);
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
