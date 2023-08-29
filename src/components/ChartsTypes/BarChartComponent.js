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
} from "recharts";

const BarChartComponent = () => {
  const { data, customization } = useContext(userContext);
  let minimum = 0,
    maximum = 0;
  customization.bars.map((item) => {
    data.map((e) => {
      console.log("e", e[item.keyName]);
      maximum = Math.max(maximum, e[item.keyName]);
      minimum = Math.min(minimum, e[item.keyName]);
    });
  });

  return (
    <ResponsiveContainer>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={customization?.xaxis} />
        <YAxis
          dataKey={customization?.yaxis}
          type="number"
          domain={[minimum, maximum]}
        />
        <Tooltip />
        <Legend />
        {console.log("customization>>", customization)}
        {customization?.bars?.map((item) => {
          return <Bar dataKey={item.keyName} fill={item.fill} />;
        })}
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
