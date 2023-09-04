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
import { BsBoxArrowRight } from "react-icons/bs";
import LineChartComponent from "./ChartsTypes/LineChartComponent";
import AreaChartComponent from "./ChartsTypes/AreaChartComponent";
import PieChartComponent from "./ChartsTypes/PieChartComponent";
import ReactToPrint from "react-to-print";

const ChartArea = () => {
  const {
    data,
    chartType,
    setChartType,
    hideCustomization,
    setHideCustomization,
  } = useContext(userContext);

  const printContent = useRef();

  return (
    <div
      className="chartarea"
      style={{
        width: hideCustomization ? "100vw" : "80vw",
        transition: "all 0.5s ease-in-out",
      }}
    >
      <div className="chartNavBar">
        <div>
          <BsBoxArrowRight
            style={{
              fontSize: hideCustomization ? "1.5rem" : "0rem",
              transition: "all 0.5s ease-in-out",
              cursor: "pointer",
              transform: "translateY(15%)",
            }}
            onClick={() => setHideCustomization(!hideCustomization)}
          />
        </div>
        <Input placeholder="Untitled Chart" style={{ width: 200 }} />
        <Select
          value={chartType}
          style={{
            width: 120,
          }}
          onChange={(e) => setChartType(e)}
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
            {chartType === "bar" ? (
              <BarChartComponent />
            ) : chartType === "line" ? (
              <LineChartComponent />
            ) : chartType === "area" ? (
              <AreaChartComponent />
            ) : chartType === "pie" ? (
              <PieChartComponent />
            ) : null}
          </>
        )}
      </div>
    </div>
  );
};

export default ChartArea;
