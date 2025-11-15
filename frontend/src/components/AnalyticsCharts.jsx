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
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

const COLORS = ["#3F51B5", "#FF5252", "#4CAF50", "#FFC107", "#9C27B0"];

/* --------------------------------------------------
   PRIORITY PIE CHART
-------------------------------------------------- */
export function PriorityPieChart({ items = [] }) {
  const data = [
    { name: "High", value: items.filter(i => (i.priority || "").toLowerCase() === "high").length },
    { name: "Medium", value: items.filter(i => (i.priority || "").toLowerCase() === "medium").length },
    { name: "Low", value: items.filter(i => (i.priority || "").toLowerCase() === "low").length }
  ];

  return (
    <div className="chart-card" style={{ width: "100%", minHeight: 300 }}>
      <h3>Priority Chart</h3>
      <PieChart width={280} height={240}>
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={80} label>
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

/* --------------------------------------------------
   STATUS DONUT CHART
-------------------------------------------------- */
export function StatusDonutChart({ items = [] }) {
  const data = [
    { name: "Open", value: items.filter(i => (i.status || "").toLowerCase() === "open").length },
    { name: "In Progress", value: items.filter(i => (i.status || "").toLowerCase() === "in_progress" || (i.status || "").toLowerCase() === "in progress").length },
    { name: "Resolved", value: items.filter(i => (i.status || "").toLowerCase() === "resolved").length }
  ];

  return (
    <div className="chart-card" style={{ width: "100%", minHeight: 300 }}>
      <h3>Status Chart</h3>
      <PieChart width={280} height={240}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={40}
          outerRadius={80}
          label
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

/* --------------------------------------------------
   CHANNEL BAR CHART (FULLY RESPONSIVE & FIXED)
-------------------------------------------------- */
export function ChannelBarChart({ items = [] }) {
  const known = ["email", "whatsapp", "twitter", "facebook", "website", "live_chat", "call", "linkedin"];

  const data = known.map(ch => ({
    channel: ch[0].toUpperCase() + ch.slice(1).replace("_", " "),
    count: items.filter(i => (i.channel || "").toLowerCase() === ch).length
  }));

  return (
    <div className="chart-card" style={{ width: "100%", height: "100%" }}>
      <h3 style={{ textAlign: "center", marginBottom: 10 }}>Channel Chart</h3>

      <div style={{ width: "100%", height: 260 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis dataKey="channel" tick={{ fill: "#D1D5DB" }} />
            <YAxis allowDecimals={false} tick={{ fill: "var(--text)" }} />

            <Tooltip
              contentStyle={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                color: "var(--text)"
              }}
            />

            <Legend />
            <Bar dataKey="count" fill="#3F8CFF" barSize={35} radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
