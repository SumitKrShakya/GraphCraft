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
  AreaChart,
  Area,
} from "recharts";
const AreaChartComponent = () => {
  const { data, graph, setGraph } = useContext(userContext);
  let minimum = 0,
    maximum = 0;
  graph.area.areas.map((item) => {
    data.map((e) => {
      // console.log("e", e[item.keyName]);
      maximum = Math.max(maximum, e[item.keyName]);
      minimum = Math.min(minimum, e[item.keyName]);
    });
  });

  return (
    <ResponsiveContainer>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey={graph.area?.xaxis} />
        <YAxis
          dataKey={graph.area?.yaxis}
          type="number"
          domain={[minimum, maximum]}
        />
        {graph.area.tooltip.visible && (
          <Tooltip
            contentStyle={{
              color: graph.area?.tooltip?.color,
              backgroundColor: graph.area?.tooltip?.backgroundColor,
              borderColor: graph.area?.tooltip?.borderColor,
              borderWidth: graph.area?.tooltip?.borderWidth,
              borderRadius: graph.area?.tooltip?.borderRadius,
              borderStyle: graph.area?.tooltip?.borderStyle,
            }}
          />
        )}
        <Legend />
        {graph.area?.areas?.map((item, i) => {
          return (
            <Area
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
                area: {
                  ...prev.area,
                  brush: {
                    ...prev.area.brush,
                    startIndex: e.startIndex,
                    endIndex: e.endIndex,
                  },
                },
              };
            });
          }}
          startIndex={graph.area?.brush?.startIndex}
          endIndex={graph.area?.brush?.endIndex}
          stroke={graph.area?.brush?.stroke}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
