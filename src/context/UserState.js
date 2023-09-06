import React, { useEffect, useRef, useState } from "react";
import UserContext from "./userContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserState = (props) => {
  const [data, setData] = useState(null);
  const [customization, setCustomization] = useState({
    bars: [],
    lines: [],
    numberNames: [],
    stringNames: [],
    dataNames: [],
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
      endIndex: data?.length - 1 === NaN ? data?.length - 1 : 10,
      stroke: "#8884d8",
    },
  });
  const [chartName, setChartName] = useState("");
  const [chartType, setChartType] = useState("bar");
  const [hideCustomization, setHideCustomization] = useState(false);
  const [chartId, setChartId] = useState(null);
  const [updating, setUpdating] = useState(0);

  let cancelToken;
  useEffect(() => {
    const call = async () => {
      console.log("...................customization changed...............");
      if (cancelToken) {
        cancelToken.cancel("operation canceled due to new request");
      }
      cancelToken = axios.CancelToken.source();
      try {
        setUpdating((prev) => prev + 1);
        console.log(chartId, customization, {
          token: localStorage.getItem("jwt"),
          chartId,
          customization,
          chartType,
          hideCustomization,
        });
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/chart/update`,
          {
            token: localStorage.getItem("jwt"),
            chartId,
            customization,
            chartType,
            hideCustomization,
            chartName,
          },
          {
            cancelToken: cancelToken.token,
          }
        );
        setUpdating((prev) => prev - 1);
        console.log(
          "...................customization changed...............",
          response
        );
      } catch (error) {
        console.log(error);
        setUpdating((prev) => prev + 1);
      }
    };
    if (chartId) {
      call();
    }
  }, [customization, chartType, hideCustomization, chartId, chartName]);

  return (
    <UserContext.Provider
      value={{
        data,
        setData,
        customization,
        setCustomization,
        chartType,
        setChartType,
        hideCustomization,
        setHideCustomization,
        chartId,
        setChartId,
        updating,
        setUpdating,
        chartName,
        setChartName,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
