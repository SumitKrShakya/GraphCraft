import React, { useState } from "react";
import "./Card.css";
import { BsBarChart } from "react-icons/bs";
import { Card as AntdCard, Button, Modal } from "antd";
const { Meta } = AntdCard;

const Card = ({ chart }) => {
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

  return (
    <>
      <AntdCard
        className="card"
        hoverable
        cover={
          <img
            style={{
              margin: "5%",
              width: "90%",
              boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
            }}
            alt="example"
            src="https://play-lh.googleusercontent.com/AcmdHoyslp6AnrSMvDMg1o3tmhIuy0wbd8mN-usvDzhO4hiTHMLIavweYOPKmlpglrY"
          />
        }
      >
        <Meta title={chart.name} description={`${formattedDate}`} />
      </AntdCard>
    </>
  );
};

export default Card;
