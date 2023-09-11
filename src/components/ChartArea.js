import React, { useContext, useRef } from "react";
import "./ChartArea.css";
import { Button, Input, Popover, QRCode, Select } from "antd";
import { AiOutlineCopy } from "react-icons/ai";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import userContext from "../context/userContext";
import BarChartComponent from "./ChartsTypes/BarChartComponent";
import { BsBoxArrowLeft, BsBoxArrowRight } from "react-icons/bs";
import LineChartComponent from "./ChartsTypes/LineChartComponent";
import AreaChartComponent from "./ChartsTypes/AreaChartComponent";
import PieChartComponent from "./ChartsTypes/PieChartComponent";
import ReactToPrint from "react-to-print";
import { update } from "./Helper/CommonHelper";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const ChartArea = () => {
  const {
    data,
    // chartType,
    // setChartType,
    // hideCustomization,
    // setHideCustomization,
    // chartName,
    // setChartName,
    graph,
    setGraph,
    setUpdating,
  } = useContext(userContext);

  const navigate = useNavigate();
  const printContent = useRef();
  console.log("graph", graph);
  return (
    <div
      className="chartarea"
      style={{
        width: graph.hideCustomization ? "100vw" : "80vw",
        transition: "all 0.5s ease-in-out",
      }}
    >
      <div className="chartNavBar">
        <div>
          <BsBoxArrowLeft
            style={{
              fontSize: graph.hideCustomization ? "1.5rem" : "0rem",
              transition: "all 0.5s ease-in-out",
              marginRight: "40px",
              transform: "translateY(3px)",
            }}
            onClick={() => {
              navigate("/dashboard");
            }}
          />
          <GiHamburgerMenu
            style={{
              fontSize: graph.hideCustomization ? "1.5rem" : "0rem",
              transition: "all 0.5s ease-in-out",
              cursor: "pointer",
              transform: "translateY(15%)",
            }}
            onClick={() => {
              setGraph((prev) => {
                return {
                  ...prev,
                  hideCustomization: !prev.hideCustomization,
                };
              });
              update(
                {
                  ...graph,
                  hideCustomization: !graph.hideCustomization,
                },
                setUpdating
              );
            }}
          />
        </div>
        <Input
          placeholder="Untitled Chart"
          onChange={(e) => {
            window.document.title =
              e.target.value === "" ? "Untitled Chart" : e.target.value;
            setGraph((prev) => {
              return {
                ...prev,
                chartName: e.target.value,
              };
            });
            update(
              {
                ...graph,
                chartName: e.target.value,
              },
              setUpdating
            );
          }}
          value={graph.chartName}
          style={{
            width: 200,
            fontWeight: graph.chartName === "" ? "" : "bold",
            fontSize: graph.chartName === "" ? "" : "1.2rem",
          }}
          bordered={graph.chartName === "" ? true : false}
        />
        <Select
          value={graph.chartType}
          style={{
            width: 120,
          }}
          onChange={(e) => {
            setGraph((prev) => ({ ...prev, chartType: e }));
            update(
              {
                ...graph,
                chartType: e,
              },
              setUpdating
            );
          }}
          options={[
            {
              value: "bar",
              label: "Bar Chart",
            },
            {
              value: "line",
              label: "Line Chart",
            },
            {
              value: "area",
              label: "Area Chart",
            },
            {
              value: "pie",
              label: "Pie Chart",
            },
          ]}
        />
        <ReactToPrint
          trigger={() => <Button className="printBtn">Print</Button>}
          content={() => {
            console.log(printContent);
            return printContent.current;
          }}
        />
        <Popover
          placement="bottomRight"
          overlayInnerStyle={{
            padding: 0,
          }}
          trigger="click"
          content={
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "5px",
                  padding: "5px",
                }}
              >
                {/* <Input
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                  }}
                  value={window.location.href}
                  style={{ cursor: "copy", width: "100px" }}
                  disabled
                /> */}
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                  }}
                  type="primary"
                  className="copyBtn"
                >
                  Copy Link
                  <AiOutlineCopy style={{ fontSize: "1.3rem" }} />
                </Button>
              </div>
              <QRCode
                value={window.location.href}
                bordered={true}
                style={{ margin: "auto" }}
              />
            </>
          }
        >
          <Button className="shareBtn">Share</Button>
        </Popover>
      </div>
      <div ref={printContent} className="chart">
        {data && (
          <>
            {graph.chartType === "bar" ? (
              <BarChartComponent />
            ) : graph.chartType === "line" ? (
              <LineChartComponent />
            ) : graph.chartType === "area" ? (
              <AreaChartComponent />
            ) : graph.chartType === "pie" ? (
              <PieChartComponent />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default ChartArea;
