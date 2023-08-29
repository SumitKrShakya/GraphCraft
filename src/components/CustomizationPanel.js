import React, { useContext } from "react";
import "./CustomizationPanel.css";
import { BsBoxArrowLeft } from "react-icons/bs";
import { Collapse, Input, Select, Space } from "antd";
import userContext from "../context/userContext";
import BarChartCustomization from "./CustomizationTypes/BarChartCustomization";

const CustomizationPanel = () => {
  const { data, chartType, hideCustomization, setHideCustomization } =
    useContext(userContext);

  // const onChange = (key) => {
  //   console.log(key);
  // };
  return (
    <div
      className="customizationPanel"
      style={{
        width: hideCustomization ? "0vw" : "20vw",
        padding: hideCustomization ? "15px 0px" : "10px 20px",
        transition: "all 0.5s ease-in-out",
      }}
    >
      <div className="absolute_side">
        <h4 className="heading">
          Customization Panel{" "}
          <BsBoxArrowLeft
            style={{
              fontSize: hideCustomization ? "0rem" : "1.5rem",
              transition: "all 0.5s ease-in-out",
            }}
            onClick={() => setHideCustomization(!hideCustomization)}
          />
        </h4>
        {/* <Collapse size="small" onChange={onChange} items={items} /> */}
        <div>
          {data && (
            <>{chartType === "bar" ? <BarChartCustomization /> : null}</>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;

// Image
// name
// created at
