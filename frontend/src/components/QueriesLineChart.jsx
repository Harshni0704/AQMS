import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function QueriesLineChart({ series = [] }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer>
        <LineChart
          data={series}
          margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
        >
          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />

         <XAxis
  dataKey="date"
  tickLine={false}
  axisLine={{ stroke: "var(--border)", opacity: 0.3 }}
  height={25}
  tickMargin={10}
  tickFormatter={(value) => {
    if (!value) return "";
    // Convert yyyy-mm-dd → mm-dd
    const parts = value.split("-");
    return parts.length === 3 ? `${parts[1]}-${parts[2]}` : value;
  }}
  tick={{ fill: "rgba(255,255,255,0.6)" , fontSize: 12 }}
/>




          {/* Y axis */}
          <YAxis
            tick={{ fill: "rgba(255,255,255,0.6)" }}   // 🌟 lighter text
            stroke="rgba(255,255,255,0.3)"
            allowDecimals={false}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              color: "var(--text)"
            }}
            labelStyle={{ color: "var(--text-light)" }} // 🌟 lighter tooltip date
          />

          {/* Line */}
          <Line
            type="monotone"
            dataKey="value"
            stroke="#4f9fff"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
