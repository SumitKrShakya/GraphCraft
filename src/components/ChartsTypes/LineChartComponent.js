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
  LineChart,
  Line,
} from "recharts";

const LineChartComponent = () => {
  const { data, graph, setGraph } = useContext(userContext);
  console.log("graph line", graph);
  let minimum = 0,
    maximum = 0;
  graph.line.lines.map((item) => {
    data.map((e) => {
      // console.log("e", e[item.keyName]);
      maximum = Math.max(maximum, e[item.keyName]);
      minimum = Math.min(minimum, e[item.keyName]);
    });
  });

  return (
    <ResponsiveContainer>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey={graph.line?.xaxis} />
        <YAxis
          dataKey={graph.line?.yaxis}
          type="number"
          domain={[minimum, maximum]}
        />
        {graph.line?.tooltip?.visible && (
          <Tooltip
            contentStyle={{
              color: graph.line?.tooltip?.color,
              backgroundColor: graph.line?.tooltip?.backgroundColor,
              borderColor: graph.line?.tooltip?.borderColor,
              borderWidth: graph.line?.tooltip?.borderWidth,
              borderRadius: graph.line?.tooltip?.borderRadius,
              borderStyle: graph.line?.tooltip?.borderStyle,
            }}
          />
        )}
        <Legend />
        {graph.line?.lines?.map((item, i) => {
          return (
            <Line
              type="monotone"
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
            setGraph((prev) => {
              return {
                ...prev,
                line: {
                  ...prev.line,
                  brush: {
                    ...prev.brush,
                    startIndex: e.startIndex,
                    endIndex: e.endIndex,
                  },
                },
              };
            });
          }}
          startIndex={graph.line?.brush?.startIndex}
          endIndex={graph.line?.brush?.endIndex}
          stroke={graph.line?.brush?.stroke}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
