import React, { useEffect, useRef, useState } from "react";
import UserContext from "./userContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const UserState = (props) => {
  const [data, setData] = useState(null);
  // const [customization, setCustomization] = useState({
  //   bars: [],
  //   lines: [],
  //   numberNames: [],
  //   stringNames: [],
  //   dataNames: [],
  //   xaxis: "",
  //   yaxis: "",
  //   tooltip: {
  //     visible: true,
  //     backgroundColor: "rgba(255,255,255,1)",
  //     color: "rgba(0,0,0,1)",
  //     borderRadius: "0px",
  //     borderColor: "rgba(170,170,170,1)",
  //     borderWidth: "1px",
  //     borderStyle: "solid",
  //   },
  //   brush: {
  //     startIndex: 0,
  //     endIndex: data?.length - 1 === NaN ? data?.length - 1 : 10,
  //     stroke: "#8884d8",
  //   },
  // });
  // const [chartName, setChartName] = useState("");
  // const [chartType, setChartType] = useState("bar");
  // const [hideCustomization, setHideCustomization] = useState(false);
  // const [chartId, setChartId] = useState(null);
  const [updating, setUpdating] = useState(0);

  const [graph, setGraph] = useState();

  return (
    <UserContext.Provider
      value={{
        data,
        setData,
        updating,
        setUpdating,
        graph,
        setGraph,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
