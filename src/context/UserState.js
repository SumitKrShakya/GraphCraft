import React, { useState } from "react";
import UserContext from "./userContext";

const UserState = (props) => {
  const [data, setData] = useState(null);
  const [customization, setCustomization] = useState({
    bars: [],
    numberNames: [],
    stringNames: [],
    dataNames: [],
    xaxis: "",
    yaxis: "",
  });
  const [chartType, setChartType] = useState("bar");
  const [hideCustomization, setHideCustomization] = useState(false);

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
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
