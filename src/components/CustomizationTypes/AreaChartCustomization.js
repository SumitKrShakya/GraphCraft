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
import { createNumberStringNames, update } from "../Helper/CommonHelper";

const AreaChartCustomization = () => {
  const { data, graph, setGraph, setUpdating } = useContext(userContext);
  const [optionsYaxis, setOptionsYaxis] = useState([]);
  const [optionsXaxis, setOptionsXaxis] = useState([]);
  const [optionsBars, setOptionsBars] = useState([]);

  const text = `A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.`;

  const handleChange = (value, axis) => {
    // console.log(`selected ${value}`, typeof value);
    setGraph((prev) => ({
      ...prev,
      area: {
        ...prev.area,
        [axis]: value,
      },
    }));
    update(
      {
        ...graph,
        area: {
          ...graph.area,
          [axis]: value,
        },
      },
      setUpdating
    );
    // setCustomization((prev) => ({
    //   ...prev,
    //   [axis]: value,
    // }));
  };

  const handleChangeBars = (value, b) => {
    console.log(`selected line ${value}`, value, graph.area?.areas?.length);

    if (graph.area?.areas?.length === 0 || !graph.area?.areas?.length) {
      setGraph((prev) => ({
        ...prev,
        area: {
          ...prev.area,
          areas: [
            ...value.map((e) => ({
              keyName: e,
              fill: "#8884d8",
              stroke: "#8884d8",
              strokeWidth: 1,
            })),
          ],
        },
      }));
      update(
        {
          ...graph,
          area: {
            ...graph.area,
            areas: [
              ...value.map((e) => ({
                keyName: e,
                fill: "#8884d8",
                stroke: "#8884d8",
                strokeWidth: 1,
              })),
            ],
          },
        },
        setUpdating
      );
      // setCustomization((prev) => ({
      //   ...prev,
      //   area: [
      //     ...value.map((e) => ({
      //       keyName: e,
      //       fill: "#8884d8",
      //       stroke: "#8884d8",
      //       strokeWidth: 1,
      //     })),
      //   ],
      // }));
      // console.log("customization_", graph);
      return;
    }

    const updatedArr = value.map((name) => {
      const existingVendor = graph.area?.area.find(
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

    console.log("updatedArr>", updatedArr);

    setGraph((prev) => ({
      ...prev,
      area: {
        ...prev.area,
        areas: updatedArr,
      },
    }));
    update(
      {
        ...graph,
        area: {
          ...graph.area,
          areas: updatedArr,
        },
      },
      setUpdating
    );

    // setCustomization((prev) => ({
    //   ...prev,
    //   area: updatedArr,
    // }));
  };

  const handleBarPropertyChange = (color, index, property) => {
    const update = graph?.area?.areas?.map((item, i) => {
      if (index == i) {
        item[
          property
        ] = `rgba(${color.metaColor.r},${color.metaColor.g},${color.metaColor.b},${color.metaColor.a})`;
      }
      return item;
    });
    setGraph((prev) => ({
      ...prev,
      area: {
        ...prev.area,
        areas: update,
      },
    }));

    // setCustomization((prev) => ({
    //   ...prev,
    //   area: update,
    // }));
  };

  const handleStrokeWidthChange = (value, index) => {
    const update = graph?.area?.areas?.map((item, i) => {
      if (index == i) {
        item.strokeWidth = value;
      }
      return item;
    });
    setGraph((prev) => ({
      ...prev,
      area: {
        ...prev.area,
        areas: update,
      },
    }));
    update(
      {
        ...graph,
        area: {
          ...graph.area,
          areas: update,
        },
      },
      setUpdating
    );

    // setCustomization((prev) => ({
    //   ...prev,
    //   area: update,
    // }));
  };

  const handleTooltipChange = (color, property) => {
    setGraph((prev) => ({
      ...prev,
      area: {
        ...prev.area,
        tooltip: {
          ...prev.tooltip,
          [property]: `rgba(${color.metaColor.r},${color.metaColor.g},${color.metaColor.b},${color.metaColor.a})`,
        },
      },
    }));
    // setCustomization((prev) => ({
    //   ...prev,
    //   tooltip: {
    //     ...prev.tooltip,
    //     [property]: `rgba(${color.metaColor.r},${color.metaColor.g},${color.metaColor.b},${color.metaColor.a})`,
    //   },
    // }));
  };

  const handleTooltipNumberChange = (value, property) => {
    setGraph((prev) => ({
      ...prev,
      area: {
        ...prev.area,
        tooltip: {
          ...prev.tooltip,
          [property]: value,
        },
      },
    }));
    update(
      {
        ...graph,
        area: {
          ...graph.area,
          tooltip: {
            ...graph.tooltip,
            [property]: value,
          },
        },
      },
      setUpdating
    );

    // setCustomization((prev) => ({
    //   ...prev,
    //   tooltip: {
    //     ...prev.tooltip,
    //     [property]: value,
    //   },
    // }));
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
              value={graph.area?.xaxis}
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
              value={graph?.area?.areas?.map((item, i) => item.keyName)}
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
              graph?.area?.areas?.length > 0 ? "1fr 1fr 1fr" : ""
            }`,
          }}
        >
          {graph?.area?.areas?.length == 0 ? (
            <span>Please select atleast one Line to customize its color.</span>
          ) : (
            <>
              <strong>Line</strong>
              <strong>Color</strong>
              <strong>Stroke</strong>
              <strong>Stroke Width</strong>
            </>
          )}
          {graph?.area?.areas?.map((item, i) => {
            return (
              <>
                <label>{item.keyName}</label>
                <ColorPicker
                  // showText
                  style={{ width: 0 }}
                  value={graph.area.areas[i]?.fill}
                  onOpenChange={(e) => {
                    if (e === false) {
                      update(graph, setUpdating);
                    }
                  }}
                  onChange={(e) => handleBarPropertyChange(e, i, "fill")}
                />
                <ColorPicker
                  style={{ width: 0 }}
                  value={graph?.area?.areas[i].stroke}
                  onOpenChange={(e) => {
                    if (e === false) {
                      update(graph, setUpdating);
                    }
                  }}
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
              onClick={() => {
                setGraph((prev) => ({
                  ...prev,
                  area: {
                    ...prev.area,
                    tooltip: {
                      ...prev.tooltip,
                      visible: !prev.tooltip.visible,
                    },
                  },
                }));
                update(
                  {
                    ...graph,
                    area: {
                      ...graph.area,
                      tooltip: {
                        ...graph.tooltip,
                        visible: !graph.tooltip.visible,
                      },
                    },
                  },
                  setUpdating
                );
              }}
              defaultChecked={graph.area.tooltip.visible}
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
                color: graph.area.tooltip.visible
                  ? "black"
                  : "rgb(100,100,100)",
              }}
            >
              Heading Text Color
            </span>
            <ColorPicker
              showText
              disabled={!graph.area.tooltip.visible}
              style={{ width: 110 }}
              value={graph.area?.tooltip?.color}
              onChange={(e) => handleTooltipChange(e, "color")}
              onOpenChange={(e) => {
                if (e === false) {
                  update(graph, setUpdating);
                }
              }}
            />
            <span
              style={{
                color: graph.area.tooltip.visible
                  ? "black"
                  : "rgb(100,100,100)",
              }}
            >
              Background Color
            </span>
            <ColorPicker
              showText
              disabled={!graph.area.tooltip.visible}
              style={{ width: 110 }}
              value={graph.area?.tooltip?.backgroundColor}
              onChange={(e) => handleTooltipChange(e, "backgroundColor")}
              onOpenChange={(e) => {
                if (e === false) {
                  update(graph, setUpdating);
                }
              }}
            />
            <span
              style={{
                color: graph.area.tooltip.visible
                  ? "black"
                  : "rgb(100,100,100)",
              }}
            >
              Border color
            </span>
            <ColorPicker
              showText
              disabled={!graph.area.tooltip.visible}
              style={{ width: 110 }}
              value={graph.area?.tooltip?.borderColor}
              onChange={(e) => handleTooltipChange(e, "borderColor")}
              onOpenChange={(e) => {
                if (e === false) {
                  update(graph, setUpdating);
                }
              }}
            />
            <span
              style={{
                color: graph.area.tooltip.visible
                  ? "black"
                  : "rgb(100,100,100)",
              }}
            >
              Border width
            </span>
            <InputNumber
              disabled={!graph.area.tooltip.visible}
              style={{ width: 110 }}
              min={0}
              max={20}
              value={graph.area?.tooltip?.borderWidth}
              onChange={(e) => handleTooltipNumberChange(e, "borderWidth")}
            />

            <span
              style={{
                color: graph.area.tooltip.visible
                  ? "black"
                  : "rgb(100,100,100)",
              }}
            >
              Border Radius
            </span>
            <InputNumber
              disabled={!graph.area.tooltip.visible}
              style={{ width: 110 }}
              min={0}
              value={graph.area?.tooltip?.borderRadius}
              onChange={(e) => handleTooltipNumberChange(e, "borderRadius")}
            />

            <span
              style={{
                color: graph.area.tooltip.visible
                  ? "black"
                  : "rgb(100,100,100)",
              }}
            >
              Border Type
            </span>
            <Select
              disabled={!graph.area.tooltip.visible}
              style={{ width: 110 }}
              min={0}
              value={graph.area?.tooltip?.borderStyle}
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
                setGraph((prev) => ({
                  ...prev,
                  area: {
                    ...prev.area,
                    tooltip: {
                      ...prev.tooltip,
                      borderStyle: e,
                    },
                  },
                }));
                update(
                  {
                    ...graph,
                    area: {
                      ...graph.area,
                      tooltip: {
                        ...graph.tooltip,
                        borderStyle: e,
                      },
                    },
                  },
                  setUpdating
                );
                // setCustomization((prev) => ({
                //   ...prev,
                //   tooltip: {
                //     ...prev.tooltip,
                //     borderStyle: e,
                //   },
                // }));
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
              graph?.area?.areas?.length > 0 ? "1fr 1fr" : ""
            }`,
          }}
        >
          {graph?.area?.areas?.length == 0 ? (
            <span>Please select atleast one Line to customize its color.</span>
          ) : (
            <>
              <strong>Line</strong>
              {/* <strong>Color</strong> */}
              <strong>Stroke</strong>
              <strong>Stroke Width</strong>
            </>
          )}
          {graph?.area?.areas?.map((item, i) => {
            return (
              <>
                <label>{item.keyName}</label>
                <ColorPicker
                  style={{ width: 0 }}
                  value={graph?.area?.areas[i].stroke}
                  onChange={(e) => handleBarPropertyChange(e, i, "stroke")}
                  onOpenChange={(e) => {
                    if (e === false) {
                      update(graph, setUpdating);
                    }
                  }}
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
              graph?.area?.areas?.length > 0 ? "1fr 1fr" : ""
            }`,
          }}
        >
          {graph?.area?.areas?.length == 0 ? (
            <span>Please select atleast one Line to customize its color.</span>
          ) : (
            <>
              <strong>Line</strong>
              {/* <strong>Color</strong> */}
              <strong>Stroke</strong>
              <strong>Stroke Width</strong>
            </>
          )}
          {graph?.area?.areas?.map((item, i) => {
            return (
              <>
                <label>{item.keyName}</label>
                <ColorPicker
                  style={{ width: 0 }}
                  value={graph?.area?.areas[i].stroke}
                  onChange={(e) => handleBarPropertyChange(e, i, "stroke")}
                  onOpenChange={(e) => {
                    if (e === false) {
                      update(graph, setUpdating);
                    }
                  }}
                />
                <InputNumber
                  style={{ width: 50 }}
                  min={0}
                  max={10}
                  value={graph?.area?.areas[i].strokeWidth}
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
    createNumberStringNames(data, graph, setGraph);
  }, []);

  useEffect(() => {
    const newOptionsXYaxis = [];
    // console.log("graph.area>", graph.area);
    graph.dataNames.forEach((e) => {
      newOptionsXYaxis.push({
        label: e,
        value: e,
      });
    });

    setOptionsYaxis(newOptionsXYaxis);
    setOptionsXaxis(newOptionsXYaxis);
    const newOptionsBars = [];
    graph?.numberNames.forEach((e) => {
      newOptionsBars.push({
        label: e,
        value: e,
      });
    });
    setOptionsBars(newOptionsBars);
  }, [graph.area]);

  return (
    <div>
      {graph.dataNames && <Collapse size="small" items={BarCustomization} />}
    </div>
  );
};

export default AreaChartCustomization;
