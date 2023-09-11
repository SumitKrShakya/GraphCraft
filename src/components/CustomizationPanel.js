import React, { useContext } from "react";
import "./CustomizationPanel.css";
import { BsBoxArrowLeft } from "react-icons/bs";
import { Collapse, Input, Select, Space } from "antd";
import userContext from "../context/userContext";
import BarChartCustomization from "./CustomizationTypes/BarChartCustomization";
import LineChartCustomization from "./CustomizationTypes/LineChartCustomization";
import AreaChartCustomization from "./CustomizationTypes/AreaChartCustomization";
import PieChartCustomization from "./CustomizationTypes/PieChartCustomization";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { update } from "./Helper/CommonHelper";

const CustomizationPanel = () => {
  const { data, graph, setGraph, setUpdating } = useContext(userContext);
  const navigate = useNavigate();

  // const onChange = (key) => {
  //   console.log(key);
  // };
  return (
    <div
      className="customizationPanel"
      style={{
        width: graph.hideCustomization ? "0vw" : "20vw",
        padding: graph.hideCustomization ? "15px 0px" : "10px 20px",
        transition: "all 0.5s ease-in-out",
      }}
    >
      <div className="absolute_side">
        <h4 className="heading">
          <BsBoxArrowLeft
            style={{
              fontSize: graph.hideCustomization ? "0rem" : "1.5rem",
              transition: "all 0.5s ease-in-out",
            }}
            onClick={() => {
              navigate("/dashboard");
            }}
          />
          <IoClose
            style={{
              fontSize: graph.hideCustomization ? "0rem" : "1.7rem",
              transition: "all 0.5s ease-in-out",
              transform: "translateY(-2.5px)",
            }}
            onClick={() => {
              setGraph((prev) => ({
                ...prev,
                hideCustomization: !prev.hideCustomization,
              }));
              update(
                {
                  ...graph,
                  hideCustomization: !graph.hideCustomization,
                },
                setUpdating
              );
            }}
          />
          Customization Panel{" "}
        </h4>
        {/* <Collapse size="small" onChange={onChange} items={items} /> */}
        <div
          style={{
            height: "86vh",
            overflow: "auto",
            paddingBottom: "5px",
            // paddingRight: "10px",
          }}
        >
          {data && (
            <>
              {graph.chartType === "bar" ? (
                <BarChartCustomization />
              ) : graph.chartType === "line" ? (
                <LineChartCustomization />
              ) : graph.chartType === "area" ? (
                <AreaChartCustomization />
              ) : graph.chartType === "pie" ? (
                <PieChartCustomization />
              ) : null}
            </>
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
