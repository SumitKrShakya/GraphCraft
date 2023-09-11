import React, { useContext } from "react";
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
} from "recharts";
import { update } from "../Helper/CommonHelper";

const BarChartComponent = () => {
  const { data, graph, setGraph, setUpdating } = useContext(userContext);
  let minimum = 0,
    maximum = 0;
  graph.bar.bars.map((item) => {
    data.map((e) => {
      // console.log("e", e[item.keyName]);
      maximum = Math.max(maximum, e[item.keyName]);
      minimum = Math.min(minimum, e[item.keyName]);
    });
  });

  return (
    <ResponsiveContainer>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={graph.bar?.xaxis} />
        <YAxis
          dataKey={graph.bar?.yaxis}
          type="number"
          domain={[minimum, maximum]}
        />
        {graph.bar.tooltip.visible && (
          <Tooltip
            contentStyle={{
              color: graph.bar?.tooltip?.color,
              backgroundColor: graph.bar?.tooltip?.backgroundColor,
              borderColor: graph.bar?.tooltip?.borderColor,
              borderWidth: graph.bar?.tooltip?.borderWidth,
              borderRadius: graph.bar?.tooltip?.borderRadius,
              borderStyle: graph.bar?.tooltip?.borderStyle,
            }}
          />
        )}
        <Legend />
        {/* {console.log("graph.bar>>", graph.bar)} */}
        {graph.bar?.bars?.map((item, i) => {
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
            if (
              e.startIndex === graph.bar?.brush?.startIndex &&
              e.endIndex === graph.bar?.brush?.endIndex
            )
              return;
            setGraph((prev) => {
              return {
                ...prev,
                bar: {
                  ...prev.bar,
                  brush: {
                    ...prev.bar.brush,
                    startIndex: e.startIndex,
                    endIndex: e.endIndex,
                  },
                },
              };
            });
            update(
              {
                ...graph,
                bar: {
                  ...graph.bar,
                  brush: {
                    ...graph.bar.brush,
                    startIndex: e.startIndex,
                    endIndex: e.endIndex,
                  },
                },
              },
              setUpdating
            );
          }}
          startIndex={graph.bar?.brush?.startIndex}
          endIndex={graph.bar?.brush?.endIndex}
          stroke={graph.bar?.brush?.stroke}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
