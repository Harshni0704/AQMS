import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

// Auto-generate colors
const COLORS = ["#3D5AFE", "#FF5252", "#00C853", "#FFAB00", "#7C4DFF"];


// ----------------------------
// PRIORITY PIE CHART
// ----------------------------
export function PriorityPieChart({ items }) {
  const data = [
    { name: "High", value: items.filter(i => i.priority === "High").length },
    { name: "Medium", value: items.filter(i => i.priority === "Medium").length },
    { name: "Low", value: items.filter(i => i.priority === "Low").length }
  ];

  return (
    <div className="chart-card">
      <h3>Priority Distribution</h3>
      <PieChart width={300} height={260}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          label
          outerRadius={90}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}


// ----------------------------
// STATUS DONUT CHART
// ----------------------------
export function StatusDonutChart({ items }) {
  const data = [
    { name: "Open", value: items.filter(i => i.status === "Open").length },
    { name: "Pending", value: items.filter(i => i.status === "Pending").length },
    { name: "Resolved", value: items.filter(i => i.status === "Resolved").length }
  ];

  return (
    <div className="chart-card">
      <h3>Status Overview</h3>
      <PieChart width={300} height={260}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={90}
          label
          fill="#82ca9d"
          dataKey="value"
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}


// ----------------------------
// CHANNEL BAR CHART
// ----------------------------
export function ChannelBarChart({ items }) {
  const channels = ["Email", "WhatsApp", "Call", "Web"];
  const data = channels.map(ch => ({
    channel: ch,
    count: items.filter(i => i.channel === ch).length
  }));

  return (
    <div className="chart-card">
      <h3>Channel Usage</h3>
      <BarChart width={350} height={260} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="channel" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#3D5AFE" />
      </BarChart>
    </div>
  );
}
