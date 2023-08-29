import React, { useContext, useEffect, useState } from "react";
import { BsBoxArrowLeft } from "react-icons/bs";
import { Collapse, ColorPicker, Divider, Input, Select, Space } from "antd";
import userContext from "../../context/userContext";
import { createNumberStringNames } from "../Helper/CommonHelper";

const BarChartCustomization = () => {
  const { data, customization, setCustomization } = useContext(userContext);
  const [optionsYaxis, setOptionsYaxis] = useState([]);
  const [optionsXaxis, setOptionsXaxis] = useState([]);
  const [optionsBars, setOptionsBars] = useState([]);

  const text = `A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.`;

  const handleChange = (value, axis) => {
    console.log(`selected ${value}`, typeof value);
    setCustomization((prev) => ({
      ...prev,
      [axis]: value,
    }));
  };

  const handleChangeBars = (value, b) => {
    console.log(`selected bar ${value}`, value);

    if (customization?.bars?.length === 0) {
      setCustomization((prev) => ({
        ...prev,
        bars: [
          ...value.map((e) => ({
            keyName: e,
            fill: "#8884d8",
          })),
        ],
      }));
      console.log("customization_", customization);
      return;
    }

    const updatedArr = value.map((name) => {
      const existingVendor = customization?.bars.find(
        (vendor) => vendor.keyName === name
      );
      if (existingVendor) {
        return existingVendor;
      } else {
        return { keyName: name, fill: "#8884d8" };
      }
    });

    console.log("updatedArr>", updatedArr, customization);
    setCustomization((prev) => ({
      ...prev,
      bars: updatedArr,
    }));
  };

  const handleColorChange = (color, index) => {
    // console.log(color.metaColor.r);
    const update = customization?.bars?.map((item, i) => {
      if (index == i) {
        item.fill = `rgba(${color.metaColor.r},${color.metaColor.g},${color.metaColor.b},${color.metaColor.a})`;
      }
      return item;
    });
    setCustomization((prev) => ({
      ...prev,
      bars: update,
    }));
  };

  const itemsNest = [
    {
      key: "1",
      label: "Choose data points for x and y axis",
      children: (
        <>
          {/* <Space.Compact style={{ marginBottom: "10px", width: "100%" }}>
            <Input style={{ width: "25%", cursor: "default" }} value="Y-Axis" />
            <Select
              allowClear
              style={{
                width: "75%",
              }}
              placeholder="Please select"
              onChange={(e) => handleChange(e, "yaxis")}
              options={optionsYaxis}
            />
          </Space.Compact> */}
          <Space.Compact style={{ marginBottom: "10px", width: "100%" }}>
            <Input
              style={{ width: "25%", cursor: "default" }}
              defaultValue="X-Axis"
            />
            <Select
              allowClear
              style={{
                width: "75%",
              }}
              placeholder="Please select"
              onChange={(e) => handleChange(e, "xaxis")}
              options={optionsXaxis}
            />
          </Space.Compact>
          <Space.Compact style={{ width: "100%" }}>
            <Input
              style={{ width: "25%", cursor: "default" }}
              defaultValue="Bar"
            />
            <Select
              mode="multiple"
              allowClear
              style={{
                width: "75%",
              }}
              placeholder="Please select"
              onChange={handleChangeBars}
              options={optionsBars}
            />
          </Space.Compact>
        </>
      ),
    },
  ];

  const BarCustomization = [
    {
      key: "1",
      label: "Add Dataset",
      children: <Collapse defaultActiveKey="1" items={itemsNest} />,
    },
    {
      key: "2",
      label: "Bar Chart Color",
      children: (
        <div
          style={{
            display: "grid",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          {customization?.bars?.map((item, i) => {
            return (
              <>
                <label>{item.keyName} : </label>
                <ColorPicker
                  showText
                  value={customization.bars[i].fill}
                  onChange={(e) => handleColorChange(e, i)}
                />
              </>
            );
          })}
        </div>
      ),
    },
    {
      key: "3",
      label: "Bar Chart border Color",
      children: <p>{text}</p>,
    },
    {
      key: "4",
      label: "This is panel header 3",
      children: <p>{text}</p>,
    },
    {
      key: "5",
      label: "This is panel header 3",
      children: <p>{text}</p>,
    },
    {
      key: "6",
      label: "This is panel header 3",
      children: <p>{text}</p>,
    },
  ];

  useEffect(() => {
    console.log("data>", data);
    createNumberStringNames(data, customization, setCustomization);
  }, []);

  useEffect(() => {
    const newOptionsXYaxis = [];
    console.log("customization>", customization);
    customization?.dataNames.forEach((e) => {
      newOptionsXYaxis.push({
        label: e,
        value: e,
      });
    });

    setOptionsYaxis(newOptionsXYaxis);
    setOptionsXaxis(newOptionsXYaxis);
    const newOptionsBars = [];
    customization?.numberNames.forEach((e) => {
      newOptionsBars.push({
        label: e,
        value: e,
      });
    });
    setOptionsBars(newOptionsBars);
  }, [customization]);

  return (
    <div>
      {customization?.dataNames && (
        <Collapse size="small" items={BarCustomization} />
      )}
    </div>
  );
};

export default BarChartCustomization;
