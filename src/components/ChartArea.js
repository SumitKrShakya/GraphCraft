import React, { useContext } from "react";
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

const ChartArea = () => {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  // const data = [
  //   {
  //     name: "Page A",
  //     uv: 4000,
  //     pv: 2400,
  //   },
  //   {
  //     name: "Page B",
  //     uv: 3000,
  //     pv: 1398,
  //   },
  //   {
  //     name: "Page C",
  //     uv: 2000,
  //     pv: 9800,
  //   },
  //   {
  //     name: "Page D",
  //     uv: 2780,
  //     pv: 3908,
  //   },
  //   {
  //     name: "Page E",
  //     uv: 1890,
  //     pv: 4800,
  //   },
  //   {
  //     name: "Page F",
  //     uv: 2390,
  //     pv: 3800,
  //   },
  //   {
  //     name: "Page G",
  //     uv: 3490,
  //     pv: 4300,
  //   },
  // ];
  const { data, chartType, hideCustomization, setHideCustomization } =
    useContext(userContext);
  console.log(chartType === "bar");

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
          defaultValue="bar"
          style={{
            width: 120,
          }}
          onChange={handleChange}
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
                <Input
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                  }}
                  value={window.location.href}
                  style={{ cursor: "copy", width: "100px" }}
                  disabled
                />
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                  }}
                  type="primary"
                >
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
      <div className="chart">
        {data && <>{chartType === "bar" ? <BarChartComponent /> : null}</>}
      </div>
    </div>
  );
};

export default ChartArea;
