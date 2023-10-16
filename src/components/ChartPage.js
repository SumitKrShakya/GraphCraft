import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import CustomizationPanel from "./CustomizationPanel";
import ChartArea from "./ChartArea";
import "./ChartPage.css";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import userContext from "../context/userContext";
import { motion } from "framer-motion";

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
    graph,
    setGraph,
  } = useContext(userContext);
  const [firstLoading, setFirstLoading] = useState(true);

  useEffect(() => {
    const call = async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/chart/getchart`,
          { id },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("jwt"),
            },
          }
        );
        // setGraph((prev) => {
        //   return {
        //     ...prev,
        //     chartId: id,
        //   };
        // });
        console.log("response", response.data);
        if (!response.data.success) {
          navigator("/unauthorized");
        }

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
        console.log("chart", response.data.chart);
        if (response.data.chart.graph) {
          setGraph(response.data.chart.graph);
        } else {
          setGraph({
            numberNames: [],
            stringNames: [],
            dataNames: [],
            chartType: "bar",
            chartName: "",
            chartId: response.data.chart._id,
            hideCustomization: false,
            bar: {
              bars: [],
              xaxis: "",
              yaxis: "",
              tooltip: {
                visible: true,
                backgroundColor: "rgba(255,255,255,1)",
                color: "rgba(0,0,0,1)",
                borderRadius: "0px",
                borderColor: "rgba(170,170,170,1)",
                borderWidth: "1px",
                borderStyle: "solid",
              },
              brush: {
                startIndex: 0,
                endIndex: 10,
                stroke: "#8884d8",
              },
            },
            line: {
              lines: [],
              xaxis: "",
              yaxis: "",
              tooltip: {
                visible: true,
                backgroundColor: "rgba(255,255,255,1)",
                color: "rgba(0,0,0,1)",
                borderRadius: "0px",
                borderColor: "rgba(170,170,170,1)",
                borderWidth: "1px",
                borderStyle: "solid",
              },
              brush: {
                startIndex: 0,
                endIndex: 10,
                stroke: "#8884d8",
              },
            },
            pie: {
              pies: [],
              xaxis: "",
              yaxis: "",
              tooltip: {
                visible: true,
                backgroundColor: "rgba(255,255,255,1)",
                color: "rgba(0,0,0,1)",
                borderRadius: "0px",
                borderColor: "rgba(170,170,170,1)",
                borderWidth: "1px",
                borderStyle: "solid",
              },
              brush: {
                startIndex: 0,
                endIndex: 10,
                stroke: "#8884d8",
              },
            },
            area: {
              areas: [],
              xaxis: "",
              yaxis: "",
              tooltip: {
                visible: true,
                backgroundColor: "rgba(255,255,255,1)",
                color: "rgba(0,0,0,1)",
                borderRadius: "0px",
                borderColor: "rgba(170,170,170,1)",
                borderWidth: "1px",
                borderStyle: "solid",
              },
              brush: {
                startIndex: 0,
                endIndex: 10,
                stroke: "#8884d8",
              },
            },
          });
        }
        setFirstLoading(false);
      } catch (error) {
        console.log(error);
        if (!error?.response?.data?.success) {
          navigator("/unauthorized");
        }
        if (error?.response?.data?.message === "Please login first") {
          navigator("/unauthorized");
        }
      }
    };
    call();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0.5, scale: 0.98, y: "1vh", borderRadius: "20px" }}
      animate={{ opacity: 1, scale: 1, y: "0", borderRadius: "0px" }}
      exit={{ opacity: 0.5, scale: 0.98, y: "1vh", borderRadius: "20px" }}
      transition={{ duration: 0.3 }}
      style={{ backgroundColor: "white" }}
    >
      <Navbar />
      <div className="page">
        {firstLoading ? (
          <div class="pl1">
            <div class="pl1__a"></div>
            <div class="pl1__b"></div>
            <div class="pl1__c"></div>
          </div>
        ) : (
          <>
            <CustomizationPanel />
            <ChartArea />
          </>
        )}
      </div>
    </motion.div>
  );
};

export default ChartPage;
