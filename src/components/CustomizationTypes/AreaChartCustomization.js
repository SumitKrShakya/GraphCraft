import React, { useContext, useEffect, useState } from "react";
import { BsBoxArrowLeft } from "react-icons/bs";
import {
  Collapse,
  ColorPicker,
  Divider,
  Input,
  InputNumber,
  Select,
  Space,
  Switch,
} from "antd";
import userContext from "../../context/userContext";
import { createNumberStringNames } from "../Helper/CommonHelper";

const AreaChartCustomization = () => {
  const { data, customization, setCustomization } = useContext(userContext);
  const [optionsYaxis, setOptionsYaxis] = useState([]);
  const [optionsXaxis, setOptionsXaxis] = useState([]);
  const [optionsBars, setOptionsBars] = useState([]);

  const text = `A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.`;

  const handleChange = (value, axis) => {
    // console.log(`selected ${value}`, typeof value);
    setCustomization((prev) => ({
      ...prev,
      [axis]: value,
    }));
  };

  const handleChangeBars = (value, b) => {
    console.log(`selected line ${value}`, value, customization?.area?.length);

    if (customization?.area?.length === 0 || !customization?.area?.length) {
      setCustomization((prev) => ({
        ...prev,
        area: [
          ...value.map((e) => ({
            keyName: e,
            fill: "#8884d8",
            stroke: "#8884d8",
            strokeWidth: 1,
          })),
        ],
      }));
      // console.log("customization_", customization);
      return;
    }

    const updatedArr = value.map((name) => {
      const existingVendor = customization?.area.find(
        (vendor) => vendor.keyName === name
      );
      if (existingVendor) {
        return existingVendor;
      } else {
        return {
          keyName: name,
          fill: "#8884d8",
          stroke: "#8884d8",
          strokeWidth: 1,
        };
      }
    });

    console.log("updatedArr>", updatedArr, customization);
    setCustomization((prev) => ({
      ...prev,
      area: updatedArr,
    }));
  };

  const handleBarPropertyChange = (color, index, property) => {
    const update = customization?.area?.map((item, i) => {
      if (index == i) {
        item[
          property
        ] = `rgba(${color.metaColor.r},${color.metaColor.g},${color.metaColor.b},${color.metaColor.a})`;
      }
      return item;
    });
    setCustomization((prev) => ({
      ...prev,
      area: update,
    }));
  };

  const handleStrokeWidthChange = (value, index) => {
    const update = customization?.area?.map((item, i) => {
      if (index == i) {
        item.strokeWidth = value;
      }
      return item;
    });
    setCustomization((prev) => ({
      ...prev,
      area: update,
    }));
  };

  const handleTooltipChange = (color, property) => {
    setCustomization((prev) => ({
      ...prev,
      tooltip: {
        ...prev.tooltip,
        [property]: `rgba(${color.metaColor.r},${color.metaColor.g},${color.metaColor.b},${color.metaColor.a})`,
      },
    }));
  };

  const handleTooltipNumberChange = (value, property) => {
    setCustomization((prev) => ({
      ...prev,
      tooltip: {
        ...prev.tooltip,
        [property]: value,
      },
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
              value={customization?.area?.map((item, i) => item.keyName)}
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
      label: "Line Chart Color",
      children: (
        <div
          style={{
            display: "grid",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
            gridTemplateColumns: `3fr ${
              customization?.area?.length > 0 ? "1fr 1fr 1fr" : ""
            }`,
          }}
        >
          {customization?.area?.length == 0 ? (
            <span>Please select atleast one Line to customize its color.</span>
          ) : (
            <>
              <strong>Line</strong>
              <strong>Color</strong>
              <strong>Stroke</strong>
              <strong>Stroke Width</strong>
            </>
          )}
          {customization?.area?.map((item, i) => {
            return (
              <>
                <label>{item.keyName}</label>
                <ColorPicker
                  // showText
                  style={{ width: 0 }}
                  value={customization.bars[i]?.fill}
                  onChange={(e) => handleBarPropertyChange(e, i, "fill")}
                />
                <ColorPicker
                  style={{ width: 0 }}
                  value={customization.area[i].stroke}
                  onChange={(e) => handleBarPropertyChange(e, i, "stroke")}
                />
                <InputNumber
                  style={{ width: 50 }}
                  min={0}
                  max={10}
                  defaultValue={0}
                  onChange={(e) => handleStrokeWidthChange(e, i)}
                />
              </>
            );
          })}
        </div>
      ),
    },
    {
      key: "3",
      label: "Tooltip Customization",
      children: (
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <strong>Tooltip Visible </strong>
            <Switch
              onClick={() =>
                setCustomization((prev) => {
                  return {
                    ...prev,
                    tooltip: {
                      ...prev.tooltip,
                      visible: !prev.tooltip.visible,
                    },
                  };
                })
              }
              defaultChecked={customization.tooltip.visible}
              checkedChildren="On"
              unCheckedChildren="Off"
            />
          </div>

          <div
            style={{
              display: "grid",
              gap: "1rem",
              marginTop: "1rem",
              justifyContent: "center",
              alignItems: "center",
              gridTemplateColumns: `3fr 2fr`,
            }}
          >
            <span
              style={{
                color: customization.tooltip.visible
                  ? "black"
                  : "rgb(100,100,100)",
              }}
            >
              Heading Text Color
            </span>
            <ColorPicker
              showText
              disabled={!customization.tooltip.visible}
              style={{ width: 110 }}
              value={customization?.tooltip?.color}
              onChange={(e) => handleTooltipChange(e, "color")}
            />
            <span
              style={{
                color: customization.tooltip.visible
                  ? "black"
                  : "rgb(100,100,100)",
              }}
            >
              Background Color
            </span>
            <ColorPicker
              showText
              disabled={!customization.tooltip.visible}
              style={{ width: 110 }}
              value={customization?.tooltip?.backgroundColor}
              onChange={(e) => handleTooltipChange(e, "backgroundColor")}
            />
            <span
              style={{
                color: customization.tooltip.visible
                  ? "black"
                  : "rgb(100,100,100)",
              }}
            >
              Border color
            </span>
            <ColorPicker
              showText
              disabled={!customization.tooltip.visible}
              style={{ width: 110 }}
              value={customization?.tooltip?.borderColor}
              onChange={(e) => handleTooltipChange(e, "borderColor")}
            />
            <span
              style={{
                color: customization.tooltip.visible
                  ? "black"
                  : "rgb(100,100,100)",
              }}
            >
              Border width
            </span>
            <InputNumber
              disabled={!customization.tooltip.visible}
              style={{ width: 110 }}
              min={0}
              max={20}
              value={customization?.tooltip?.borderWidth}
              onChange={(e) => handleTooltipNumberChange(e, "borderWidth")}
            />

            <span
              style={{
                color: customization.tooltip.visible
                  ? "black"
                  : "rgb(100,100,100)",
              }}
            >
              Border Radius
            </span>
            <InputNumber
              disabled={!customization.tooltip.visible}
              style={{ width: 110 }}
              min={0}
              value={customization?.tooltip?.borderRadius}
              onChange={(e) => handleTooltipNumberChange(e, "borderRadius")}
            />

            <span
              style={{
                color: customization.tooltip.visible
                  ? "black"
                  : "rgb(100,100,100)",
              }}
            >
              Border Type
            </span>
            <Select
              disabled={!customization.tooltip.visible}
              style={{ width: 110 }}
              min={0}
              value={customization?.tooltip?.borderStyle}
              options={[
                { value: "dotted", label: "Dotted" },
                { value: "dashed", label: "Dashed" },
                { value: "solid", label: "Solid" },
                { value: "double", label: "Double" },
                { value: "groove", label: "Groove" },
                { value: "ridge", label: "Ridge" },
                { value: "inset", label: "Inset" },
                { value: "outset", label: "Outset" },
                { value: "none", label: "None" },
                { value: "hidden", label: "Hidden" },
              ]}
              onChange={(e) => {
                setCustomization((prev) => ({
                  ...prev,
                  tooltip: {
                    ...prev.tooltip,
                    borderStyle: e,
                  },
                }));
              }}
            />
          </div>
        </div>
      ),
    },
    {
      key: "4",
      label: "Dots in area",
      children: (
        <div
          style={{
            display: "grid",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
            gridTemplateColumns: `2fr ${
              customization?.area?.length > 0 ? "1fr 1fr" : ""
            }`,
          }}
        >
          {customization?.area?.length == 0 ? (
            <span>Please select atleast one Line to customize its color.</span>
          ) : (
            <>
              <strong>Line</strong>
              {/* <strong>Color</strong> */}
              <strong>Stroke</strong>
              <strong>Stroke Width</strong>
            </>
          )}
          {customization?.area?.map((item, i) => {
            return (
              <>
                <label>{item.keyName}</label>
                <ColorPicker
                  style={{ width: 0 }}
                  value={customization.area[i].stroke}
                  onChange={(e) => handleBarPropertyChange(e, i, "stroke")}
                />
                <InputNumber
                  style={{ width: 50 }}
                  min={0}
                  max={10}
                  defaultValue={0}
                  onChange={(e) => handleStrokeWidthChange(e, i)}
                />
              </>
            );
          })}
        </div>
      ),
    },
    {
      key: "5",
      label: "Active Dots in area",
      children: (
        <div
          style={{
            display: "grid",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
            gridTemplateColumns: `2fr ${
              customization?.area?.length > 0 ? "1fr 1fr" : ""
            }`,
          }}
        >
          {customization?.area?.length == 0 ? (
            <span>Please select atleast one Line to customize its color.</span>
          ) : (
            <>
              <strong>Line</strong>
              {/* <strong>Color</strong> */}
              <strong>Stroke</strong>
              <strong>Stroke Width</strong>
            </>
          )}
          {customization?.area?.map((item, i) => {
            return (
              <>
                <label>{item.keyName}</label>
                <ColorPicker
                  style={{ width: 0 }}
                  value={customization.area[i].stroke}
                  onChange={(e) => handleBarPropertyChange(e, i, "stroke")}
                />
                <InputNumber
                  style={{ width: 50 }}
                  min={0}
                  max={10}
                  value={customization.area[i].strokeWidth}
                  onChange={(e) => handleStrokeWidthChange(e, i)}
                />
              </>
            );
          })}
        </div>
      ),
    },
  ];

  useEffect(() => {
    // console.log("data>", data);
    createNumberStringNames(data, customization, setCustomization);
  }, []);

  useEffect(() => {
    const newOptionsXYaxis = [];
    // console.log("customization>", customization);
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

export default AreaChartCustomization;
