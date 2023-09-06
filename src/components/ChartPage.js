import React, { useContext, useEffect } from "react";
import Navbar from "./Navbar";
import CustomizationPanel from "./CustomizationPanel";
import ChartArea from "./ChartArea";
import "./ChartPage.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import userContext from "../context/userContext";

const ChartPage = () => {
  const navigator = useNavigate();
  const { id } = useParams();
  const {
    setCustomization,
    setData,
    setChartId,
    setChartType,
    setHideCustomization,
    setChartName,
  } = useContext(userContext);

  useEffect(() => {
    const call = async () => {
      try {
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
        if (response.data.chart.customization) {
          setCustomization(response.data.chart.customization);
        }
        if (response.data.chart.chartType) {
          setChartType(response.data.chart.chartType);
        }
        if (response.data.chart.hideCustomization) {
          setHideCustomization(response.data.chart.hideCustomization);
        }
        if (response.data.chart.name !== "") {
          window.document.title = response.data.chart.name;
          setChartName(response.data.chart.name);
        }
      } catch (error) {
        console.log(error);
        if (error.response.data.message === "Please login first") {
          navigator("/unauthorized");
        }
      }
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
