import React, { useContext, useEffect, useState } from "react";
import userContext from "../../context/userContext";
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
  Brush,
  PieChart,
  Pie,
} from "recharts";

const PieChartComponent = () => {
  const { data, customization, setCustomization } = useContext(userContext);
  let minimum = 0,
    maximum = 0;
  customization.bars.map((item) => {
    data.map((e) => {
      // console.log("e", e[item.keyName]);
      maximum = Math.max(maximum, e[item.keyName]);
      minimum = Math.min(minimum, e[item.keyName]);
    });
  });

  {
    /* <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={customization?.xaxis} />
      <YAxis
        dataKey={customization?.yaxis}
        type="number"
        domain={[minimum, maximum]}
      />
      {customization.tooltip.visible && (
        <Tooltip
          contentStyle={{
            color: customization?.tooltip?.color,
            backgroundColor: customization?.tooltip?.backgroundColor,
            borderColor: customization?.tooltip?.borderColor,
            borderWidth: customization?.tooltip?.borderWidth,
            borderRadius: customization?.tooltip?.borderRadius,
            borderStyle: customization?.tooltip?.borderStyle,
          }}
        />
      )}
      <Legend />
      {customization?.bars?.map((item, i) => {
        return (
          <Bar
            dataKey={item.keyName}
            // stackId={i % 2 ? "a" : "b"}
            fill={item.fill}
            stroke={item.stroke}
            strokeWidth={item?.strokeWidth ? item.strokeWidth : 0}
            // strokeDasharray={i % 2 ? "10 10" : "50 10"}
          />
        );
      })}
      <Brush
        height={30}
        onChange={(e) => {
          console.log(e);
          setCustomization((prev) => {
            return {
              ...prev,
              brush: {
                ...prev.brush,
                startIndex: e.startIndex,
                endIndex: e.endIndex,
              },
            };
          });
        }}
        startIndex={customization?.brush?.startIndex}
        endIndex={customization?.brush?.endIndex}
        stroke={customization?.brush?.stroke}
      />
    </BarChart> */
  }
  //   const [pieData, setPieData] = useState(data);
  //   useEffect(() => {
  //     setPieData(
  //       data.map((item) => {
  //         let newItem = {};
  //         const isNumeric = (num) =>
  //           (typeof num === "number" ||
  //             (typeof num === "string" && num.trim() !== "")) &&
  //           !isNaN(num);
  //         for (const key in item) {
  //           newItem[key] = item[key];
  //           if (isNumeric(item[key])) {
  //             newItem[key] = parseFloat(item[key]);
  //           }
  //         }
  //         return newItem;
  //       })
  //     );
  //     console.log(

  //     );
  //   }, []);

  return (
    <ResponsiveContainer>
      <PieChart>
        <CartesianGrid strokeDasharray="5 5" />
        {/* <XAxis dataKey={customization?.xaxis} /> */}
        {/* <YAxis
          dataKey={customization?.yaxis}
          type="number"
          domain={[minimum, maximum]}
        /> */}
        {customization.tooltip.visible && (
          <Tooltip
            contentStyle={{
              color: customization?.tooltip?.color,
              backgroundColor: customization?.tooltip?.backgroundColor,
              borderColor: customization?.tooltip?.borderColor,
              borderWidth: customization?.tooltip?.borderWidth,
              borderRadius: customization?.tooltip?.borderRadius,
              borderStyle: customization?.tooltip?.borderStyle,
            }}
          />
        )}
        {/* <Legend /> */}
        {customization?.pie?.map((item, i, length) => {
          console.log(
            "item->",
            item,
            i,
            length,
            length.length,
            i * (300 / length.length)
          );
          return (
            <Pie
              data={data}
              type="monotone"
              outerRadius={(i + 1) * (300 / length.length) - 5}
              innerRadius={i * (300 / length.length)}
              //   dataKey={"value"}
              dataKey={item.keyName}
              // stackId={i % 2 ? "a" : "b"}
              fill={item.fill}
              activeDot={{ r: 1, fill: "red" }}
              stroke={item.stroke}
              strokeWidth={item?.strokeWidth ? item.strokeWidth : 0}
              // strokeDasharray={i % 2 ? "10 10" : "50 10"}
            />
          );
        })}
        <Brush
          height={30}
          onChange={(e) => {
            console.log(e);
            setCustomization((prev) => {
              return {
                ...prev,
                brush: {
                  ...prev.brush,
                  startIndex: e.startIndex,
                  endIndex: e.endIndex,
                },
              };
            });
          }}
          startIndex={customization?.brush?.startIndex}
          endIndex={customization?.brush?.endIndex}
          stroke={customization?.brush?.stroke}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
