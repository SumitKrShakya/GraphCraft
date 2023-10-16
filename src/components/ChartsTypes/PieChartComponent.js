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
import { update } from "../Helper/CommonHelper";

const PieChartComponent = () => {
  const { data, graph, setGraph, setUpdating } = useContext(userContext);
  let minimum = 0,
    maximum = 0;
  graph.pie.pies.map((item) => {
    data.map((e) => {
      // console.log("e", e[item.keyName]);
      maximum = Math.max(maximum, e[item.keyName]);
      minimum = Math.min(minimum, e[item.keyName]);
    });
  });

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
        {graph.pie.tooltip.visible && (
          <Tooltip
            contentStyle={{
              color: graph.pie?.tooltip?.color,
              backgroundColor: graph.pie?.tooltip?.backgroundColor,
              borderColor: graph.pie?.tooltip?.borderColor,
              borderWidth: graph.pie?.tooltip?.borderWidth,
              borderRadius: graph.pie?.tooltip?.borderRadius,
              borderStyle: graph.pie?.tooltip?.borderStyle,
            }}
          />
        )}
        {/* <Legend /> */}
        {graph.pie?.pies?.map((item, i, length) => {
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
          // onChange={(e) => {
          //   console.log(e);
          //   setGraph((prev) => {
          //     return {
          //       ...prev,
          //       pie: {
          //         ...prev.pie,
          //         brush: {
          //           ...prev.pie.brush,
          //           startIndex: e.startIndex,
          //           endIndex: e.endIndex,
          //         },
          //       },
          //     };
          //   });
          // }}
          onChange={(e) => {
            console.log(e);
            if (
              e.startIndex === graph.pie?.brush?.startIndex &&
              e.endIndex === graph.pie?.brush?.endIndex
            )
              return;
            setGraph((prev) => {
              return {
                ...prev,
                pie: {
                  ...prev.pie,
                  brush: {
                    ...prev.pie.brush,
                    startIndex: e.startIndex,
                    endIndex: e.endIndex,
                  },
                },
              };
            });
            update(
              {
                ...graph,
                pie: {
                  ...graph.pie,
                  brush: {
                    ...graph.pie.brush,
                    startIndex: e.startIndex,
                    endIndex: e.endIndex,
                  },
                },
              },
              setUpdating
            );
          }}
          startIndex={graph.pie?.brush?.startIndex}
          endIndex={graph.pie?.brush?.endIndex}
          stroke={graph.pie?.brush?.stroke}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartComponent;
