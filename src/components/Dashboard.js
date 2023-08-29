import React, { useEffect, useState } from "react";
import { MdAddchart } from "react-icons/md";
import Navbar from "./Navbar";
import "./Dashboard.css";
import CustomizationPanel from "./CustomizationPanel";
import Card from "./Card";
import axios from "axios";
import {
  Skeleton,
  Card as AntdCard,
  Modal,
  Upload,
  message,
  Button,
  Tag,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import handleCSVInputChange from "./CsvToJson";
import { useNavigate } from "react-router-dom";

const { Meta } = AntdCard;

const Dashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    const call = async () => {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/chart/all`,
        {
          token: localStorage.getItem("jwt"),
        }
      );
      const res = response.data;
      if (res.success) {
        setData(res.charts);
        console.log(res);
        setLoading(false);
      }
    };
    call();
  }, []);

  //MODAL
  const [modalOpen, setModalOpen] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [dataHeadings, setDataHeadings] = useState(null);

  console.log("jsonData", jsonData);
  const handleCreateChart = async () => {
    setModalOpen(false);
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER_URL}/chart/create`,
      { token: localStorage.getItem("jwt"), data: jsonData }
    );
    const res = response.data;
    if (res.success) {
      navigate(`/chart/${res.chart._id}`);
    } else {
      console.log("some error ocured");
    }
  };

  return (
    <div className="dashboard">
      <Navbar />
      {/* <CustomizationPanel /> */}
      <div className="main">
        <AntdCard
          className="card"
          hoverable
          onClick={() => setModalOpen(true)}
          cover={
            <MdAddchart
              style={{
                fontSize: "11.5rem",
                margin: "5%",
                width: "90%",
                // boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
              }}
            />
          }
        >
          <Meta title="Blank Chart" description={`Create a new chart `} />
        </AntdCard>
        <Modal
          title="Upload or select data for new Chart"
          centered
          open={modalOpen}
          onOk={() => handleCreateChart()}
          onCancel={() => setModalOpen(false)}
        >
          <p>
            This feature allows users to upload data and create a new chart with
            customized settings. Users can easily import their data in various
            formats such as CSV or Excel, and the system will automatically
            generate a chart based on the provided data points. This simplifies
            the process of visualizing and analyzing data, enabling users to
            make informed decisions.
          </p>
          <input
            type="file"
            accept=".csv"
            onChange={(e) =>
              handleCSVInputChange(e, setJsonData, setDataHeadings)
            }
          />
          {dataHeadings && (
            <>
              <h5>Data Headings</h5>
              {dataHeadings.map((heading) => {
                return <Tag>{heading}</Tag>;
              })}
            </>
          )}
        </Modal>
        {loading ? (
          <>
            <Skeleton loading={loading} avatar active></Skeleton>
            <Skeleton loading={loading} avatar active></Skeleton>
            <Skeleton loading={loading} avatar active></Skeleton>
            <Skeleton loading={loading} avatar active></Skeleton>
          </>
        ) : (
          <>
            {data.map((chart, i) => {
              console.log(i);
              return <Card chart={chart} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
