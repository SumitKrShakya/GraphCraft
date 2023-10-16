import React, { useState } from "react";
import "./Card.css";
import { BsBarChart } from "react-icons/bs";
import { Card as AntdCard, Button, Dropdown, Modal } from "antd";
import { useNavigate } from "react-router-dom";
import {
  DeleteOutlined,
  ShareAltOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import GraphImg from "../images/graph.png";
const { Meta } = AntdCard;

const Card = ({ chart, graph }) => {
  const navigate = useNavigate();
  console.log(chart);

  const timestamp = chart.createdAt;
  let date = new Date(timestamp);

  // Convert to Indian Time
  date = new Date(date.getTime() + 5.5 * 60 * 60 * 1000);

  const day = String(date.getDate()).padStart(2, "0");
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    date
  );
  const year = String(date.getFullYear()).slice(-2);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedDate = `${day} ${month} ${year}, ${hours}:${minutes}`;

  // MODAL
  const items = [
    {
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            minWidth: "100px",
            fontSize: "1.2rem",
            color: "blue",
          }}
        >
          <FolderOpenOutlined style={{ transform: "translateY(3px)" }} />
          <span>Open</span>
        </div>
      ),
      key: "1",
    },
    {
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            minWidth: "100px",
            fontSize: "1.2rem",
            color: "blue",
          }}
        >
          <ShareAltOutlined style={{ transform: "translateY(3px)" }} />
          <span>Share</span>
        </div>
      ),
      key: "2",
    },

    {
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            minWidth: "100px",
            fontSize: "1.2rem",
          }}
        >
          <DeleteOutlined style={{ transform: "translateY(3px)" }} />
          <span>Delete</span>
        </div>
      ),
      key: "3",
      danger: true,
    },
  ];

  return (
    <>
      <Dropdown menu={{ items }} trigger={["contextMenu"]}>
        <AntdCard
          className="card"
          hoverable
          onClick={() => {
            navigate(`/chart/${chart._id}`);
          }}
          cover={
            <img
              style={{
                margin: "5%",
                width: "90%",
                boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              }}
              alt="example"
              src={GraphImg}
            />
          }
        >
          <Meta
            title={
              chart.name === ""
                ? "Untitled Chart"
                : graph?.chartName
                ? graph.chartName
                : "Untitled Chart"
            }
            description={`${formattedDate}`}
          />
        </AntdCard>
      </Dropdown>
    </>
  );
};

export default Card;
