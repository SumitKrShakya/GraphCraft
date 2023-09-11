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

const BarChartCustomization = () => {
  const { data, graph, setGraph, setUpdating } = useContext(userContext);
  const [optionsYaxis, setOptionsYaxis] = useState([]);
  const [optionsXaxis, setOptionsXaxis] = useState([]);
  const [optionsBars, setOptionsBars] = useState([]);
  console.log("graph bar", graph);

  const handleChange = (value, axis) => {
    // console.log(`selected ${value}`, typeof value);
    setGraph((prev) => {
      return {
        ...prev,
        bar: {
          ...prev.bar,
          [axis]: value,
        },
      };
    });
    update(
      {
        ...graph,
        bar: {
          ...graph.bar,
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
    // console.log(`selected bar ${value}`, value);

    if (graph?.bar?.bars?.length === 0) {
      setGraph((prev) => {
        return {
          ...prev,
          bar: {
            ...prev.bar,
            bars: [
              ...value.map((e) => ({
                keyName: e,
                fill: "#8884d8",
                stroke: "#8884d8",
                strokeWidth: 0,
              })),
            ],
          },
        };
      });
      console.log("...> graph", graph);
      update(
        {
          ...graph,
          bar: {
            ...graph.bar,
            bars: [
              ...value.map((e) => ({
                keyName: e,
                fill: "#8884d8",
                stroke: "#8884d8",
                strokeWidth: 0,
              })),
            ],
          },
        },
        setUpdating
      );
      // setCustomization((prev) => ({
      //   ...prev,
      //   bars: [
      //     ...value.map((e) => ({
      //       keyName: e,
      //       fill: "#8884d8",
      //       stroke: "#8884d8",
      //       strokeWidth: 0,
      //     })),
      //   ],
      // }));
      // console.log("customization_", customization);
      return;
    }

    const updatedArr = value.map((name) => {
      const existingVendor = graph.bar?.bars.find(
        (vendor) => vendor.keyName === name
      );
      if (existingVendor) {
        return existingVendor;
      } else {
        return {
          keyName: name,
          fill: "#8884d8",
          stroke: "#8884d8",
          strokeWidth: 0,
        };
      }
    });

    // console.log("updatedArr>", updatedArr, customization);
    setGraph((prev) => ({
      ...prev,
      bar: {
        ...prev.bar,
        bars: updatedArr,
      },
    }));

    update(
      {
        ...graph,
        bar: {
          ...graph.bar,
          bars: updatedArr,
        },
      },
      setUpdating
    );
  };

  const handleBarPropertyChange = (color, index, property) => {
    const newUpdate = graph.bar?.bars?.map((item, i) => {
      if (index == i) {
        item[
          property
        ] = `rgba(${color.metaColor.r},${color.metaColor.g},${color.metaColor.b},${color.metaColor.a})`;
      }
      return item;
    });
    setGraph((prev) => ({
      ...prev,
      bar: {
        ...prev.bar,
        bars: newUpdate,
      },
    }));

    // setCustomization((prev) => ({
    //   ...prev,
    //   bars: update,
    // }));
  };

  const handleStrokeWidthChange = (value, index) => {
    const newUpdate = graph.bar?.bars?.map((item, i) => {
      if (index == i) {
        item.strokeWidth = value;
      }
      return item;
    });
    setGraph((prev) => ({
      ...prev,
      bar: {
        ...prev.bar,
        bars: newUpdate,
      },
    }));
    update(
      {
        ...graph,
        bar: {
          ...graph.bar,
          bars: newUpdate,
        },
      },
      setUpdating
    );
    // setCustomization((prev) => ({
    //   ...prev,
    //   bars: update,
    // }));
  };

  const handleTooltipChange = (color, property) => {
    setGraph((prev) => ({
      ...prev,
      bar: {
        ...prev.bar,
        tooltip: {
          ...prev.bar.tooltip,
          [property]: `rgba(${color.metaColor.r},${color.metaColor.g},${color.metaColor.b},${color.metaColor.a})`,
        },
      },
    }));
    console.log("here");
    // update(
    //   {
    //     ...graph,
    //     bar: {
    //       ...graph.bar,
    //       tooltip: {
    //         ...graph.bar.tooltip,
    //         [property]: `rgba(${color.metaColor.r},${color.metaColor.g},${color.metaColor.b},${color.metaColor.a})`,
    //       },
    //     },
    //   },
    //   setUpdating
    // );

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
      bar: {
        ...prev.bar,
        tooltip: {
          ...prev.bar.tooltip,
          [property]: value,
        },
      },
    }));
    update(
      {
        ...graph,
        bar: {
          ...graph.bar,
          tooltip: {
            ...graph.bar.tooltip,
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
              value={graph.bar?.xaxis}
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
              value={graph.bar?.bars?.map((item, i) => item.keyName)}
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
            gridTemplateColumns: `3fr ${
              graph.bar?.bars?.length > 0 ? "1fr 1fr 1fr" : ""
            }`,
          }}
        >
          {graph.bar?.bars?.length == 0 ? (
            <span>Please select atleast one bar to customize its color.</span>
          ) : (
            <>
              <strong>Bar</strong>
              <strong>Color</strong>
              <strong>Stroke</strong>
              <strong>Stroke Width</strong>
            </>
          )}
          {graph.bar?.bars?.map((item, i) => {
            return (
              <>
                <label>{item.keyName}</label>
                <ColorPicker
                  // showText
                  style={{ width: 0 }}
                  value={graph.bar.bars[i].fill}
                  onOpenChange={(e) => {
                    if (e === false) {
                      update(graph, setUpdating);
                    }
                  }}
                  onChange={(e) => handleBarPropertyChange(e, i, "fill")}
                />
                <ColorPicker
                  // showText
                  style={{ width: 0 }}
                  value={graph.bar.bars[i].stroke}
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
                  value={graph.bar.bars[i].strokeWidth}
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
              onClick={
                () => {
                  setGraph((prev) => ({
                    ...prev,
                    bar: {
                      ...prev.bar,
                      tooltip: {
                        ...prev.bar.tooltip,
                        visible: !prev.bar.tooltip.visible,
                      },
                    },
                  }));
                  update(
                    {
                      ...graph,
                      bar: {
                        ...graph.bar,
                        tooltip: {
                          ...graph.bar.tooltip,
                          visible: !graph.bar.tooltip.visible,
                        },
                      },
                    },
                    setUpdating
                  );
                }

                // setCustomization((prev) => {
                //   return {
                //     ...prev,
                //     tooltip: {
                //       ...prev.tooltip,
                //       visible: !prev.tooltip.visible,
                //     },
                //   };
                // })
              }
              defaultChecked={graph.bar.tooltip.visible}
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
                color: graph.bar.tooltip.visible ? "black" : "rgb(100,100,100)",
              }}
            >
              Heading Text Color
            </span>
            <ColorPicker
              showText
              disabled={!graph.bar.tooltip.visible}
              style={{ width: 110 }}
              value={graph.bar?.tooltip?.color}
              onChange={(e) => handleTooltipChange(e, "color")}
              onOpenChange={(e) => {
                if (e === false) {
                  update(graph, setUpdating);
                }
              }}
            />
            <span
              style={{
                color: graph.bar.tooltip.visible ? "black" : "rgb(100,100,100)",
              }}
            >
              Background Color
            </span>
            <ColorPicker
              showText
              disabled={!graph.bar.tooltip.visible}
              style={{ width: 110 }}
              value={graph.bar?.tooltip?.backgroundColor}
              onChange={(e) => handleTooltipChange(e, "backgroundColor")}
              onOpenChange={(e) => {
                if (e === false) {
                  update(graph, setUpdating);
                }
              }}
            />
            <span
              style={{
                color: graph.bar.tooltip.visible ? "black" : "rgb(100,100,100)",
              }}
            >
              Border color
            </span>
            <ColorPicker
              showText
              disabled={!graph.bar.tooltip.visible}
              style={{ width: 110 }}
              value={graph.bar?.tooltip?.borderColor}
              onChange={(e) => handleTooltipChange(e, "borderColor")}
              onOpenChange={(e) => {
                if (e === false) {
                  update(graph, setUpdating);
                }
              }}
            />
            <span
              style={{
                color: graph.bar.tooltip.visible ? "black" : "rgb(100,100,100)",
              }}
            >
              Border width
            </span>
            <InputNumber
              disabled={!graph.bar.tooltip.visible}
              style={{ width: 110 }}
              min={0}
              max={20}
              value={graph.bar?.tooltip?.borderWidth}
              onChange={(e) => handleTooltipNumberChange(e, "borderWidth")}
            />

            <span
              style={{
                color: graph.bar.tooltip.visible ? "black" : "rgb(100,100,100)",
              }}
            >
              Border Radius
            </span>
            <InputNumber
              disabled={!graph.bar.tooltip.visible}
              style={{ width: 110 }}
              min={0}
              value={graph.bar?.tooltip?.borderRadius}
              onChange={(e) => handleTooltipNumberChange(e, "borderRadius")}
            />

            <span
              style={{
                color: graph.bar.tooltip.visible ? "black" : "rgb(100,100,100)",
              }}
            >
              Border Type
            </span>
            <Select
              disabled={!graph.bar.tooltip.visible}
              style={{ width: 110 }}
              min={0}
              value={graph.bar?.tooltip?.borderStyle}
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
                  bar: {
                    ...prev.bar,
                    tooltip: {
                      ...prev.bar.tooltip,
                      borderStyle: e,
                    },
                  },
                }));
                update(
                  {
                    ...graph,
                    bar: {
                      ...graph.bar,
                      tooltip: {
                        ...graph.bar.tooltip,
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
  ];

  useEffect(() => {
    // console.log("data>", data);
  }, [graph.bar]);

  useEffect(() => {
    const { stringNames, numberNames } = createNumberStringNames(
      data,
      graph,
      setGraph
    );
    const newOptionsXYaxis = [];
    console.log("graphHere", graph);
    // console.log("customization>", customization);
    stringNames.forEach((e) => {
      newOptionsXYaxis.push({
        label: e,
        value: e,
      });
    });
    console.log("graph?.dataNames", graph?.dataNames);
    setOptionsYaxis(newOptionsXYaxis);
    setOptionsXaxis(newOptionsXYaxis);
    const newOptionsBars = [];
    numberNames.forEach((e) => {
      newOptionsBars.push({
        label: e,
        value: e,
      });
    });
    setOptionsBars(newOptionsBars);
  }, [graph.bar]);

  return (
    <div>
      {graph?.dataNames && <Collapse size="small" items={BarCustomization} />}
    </div>
  );
};

export default BarChartCustomization;
