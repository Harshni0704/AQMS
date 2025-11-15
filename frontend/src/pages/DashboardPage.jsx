import React, { useEffect, useState } from "react";
import { fetchQueries, analyticsSummary } from "../lib/api";
import { PriorityPieChart, StatusDonutChart, ChannelBarChart } from "../components/AnalyticsCharts";
import { useSearch } from "../context/SearchContext";
import QueriesLineChart from "../components/QueriesLineChart";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip
} from "recharts";

// ----------------------------
// fallback timeseries
// ----------------------------
function createFallbackSeries(total = 120, days = 30) {
  const out = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const label = d.toISOString().slice(0, 10);
    const base = Math.round(((Math.sin(i / 3.2) + 1.5) * (total / (days * 0.9))));
    const variance = Math.round(((i * 13) % 7) - 3);
    const value = Math.max(0, base + variance);
    out.push({ date: label, value });
  }
  return out;
}

// ==============================
// MAIN DASHBOARD PAGE
// ==============================
export default function DashboardPage() {
  const { term, trigger } = useSearch();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [series, setSeries] = useState(null);

  // ---------------------
  // fetch items
  // ---------------------
  async function loadItems(q = "") {
    setLoading(true);
    try {
      const res = await fetchQueries({ search: q, limit: 500 });
      setItems(res.items || []);
    } catch (err) {
      console.error("dashboard fetch error", err);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  // ---------------------
  // fetch analytics summary
  // ---------------------
  async function loadSummary(q = "") {
    try {
      const a = await analyticsSummary({ search: q });
      setSummary(a);

      if (a?.timeseries && a.timeseries.length) {
        setSeries(a.timeseries.map(t => ({ date: t.date, value: t.value })));
      } else {
        setSeries(createFallbackSeries(a?.total ?? 120));
      }
    } catch (err) {
      console.warn("analytics summary failed", err);
      setSummary(null);
      setSeries(createFallbackSeries(120));
    }
  }

  useEffect(() => {
    loadItems(term || "");
    loadSummary(term || "");
  }, [term, trigger]);

  // =====================================
  // RENDER
  // =====================================
  return (
    <div className="page dashboard-page">
      <h1 className="page-title">Performance Analytics</h1>

      {/* ------------------------------------ */}
      {/* STAT CARDS */}
      {/* ------------------------------------ */}
      <div className="cards-row">
        <div className="stat-card">
          <div className="stat-title">Avg. First Response</div>
          <div className="stat-value">
            {summary?.avgResponseMs
              ? `${Math.round(summary.avgResponseMs / 3600000)}h`
              : "—"}
          </div>
          <div className="stat-note">based on filtered results</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Total Queries</div>
          <div className="stat-value">{summary?.total ?? items.length}</div>
          <div className="stat-note">filtered by search</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">Unresolved</div>
          <div className="stat-value">
            {summary?.unresolved ??
              items.filter(i => i.status !== "resolved").length}
          </div>
          <div className="stat-note">needs attention</div>
        </div>

        <div className="stat-card">
          <div className="stat-title">CSAT</div>
          <div className="stat-value">4.5/5</div>
          <div className="stat-note">demo</div>
        </div>
      </div>

      {/* ------------------------------------ */}
      {/* CHART ROW 1 */}
      {/* ------------------------------------ */}
      <div className="chart-row" style={{ gap: 16 }}>
        <div style={{ flex: 1 }}>
          {/* LINE CHART PLACEHOLDER */}
          <div className="chart-panel">
  <div className="panel-title">Queries Over Time</div>

  {/* FIXED: CHART MUST BE DIRECT CHILD WITH HEIGHT */}
  <div style={{ width: "100%", height: 300 }}>
    <QueriesLineChart series={series || []} />
  </div>
</div>

          
        </div>

        {/* DONUT RIGHT SIDE */}
        <div style={{ width: 420 }}>
          <div className="panel">
            <div className="panel-title">Query Types</div>
            <div
              style={{
                height: 260,
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <QueryTypesArea items={items} summary={summary} />
            </div>
            <div
              style={{ marginTop: 10, color: "var(--muted)", textAlign: "center" }}
            >
              {summary?.total ?? items.length} Total
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------ */}
      {/* CHART ROW 2 */}
      {/* ------------------------------------ */}
      <div className="chart-row" style={{ marginTop: 12 }}>
       <div className="chart-panel" style={{ flex: 2, minHeight: 300 }}>
  <div className="panel-title">Channel Breakdown</div>
  <div style={{
    height: 260,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }}>
    <ChannelBarChart items={items} />
  </div>
</div>


        {/* TEAM PERFORMANCE */}
        <div className="panel" style={{ flex: 1 }}>
          <h3 style={{ marginTop: 0 }}>Team Performance</h3>
          <table className="leaderboard">
            <thead>
              <tr>
                <th>Agent</th>
                <th>Assigned</th>
                <th>Resolved</th>
                <th>Avg Response</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Alex J.</td><td>120</td><td>115</td><td>1h 45m</td></tr>
              <tr><td>Maria G.</td><td>112</td><td>108</td><td>2h 05m</td></tr>
              <tr><td>David S.</td><td>105</td><td>98</td><td>2h 30m</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ======================================================
// QUERY TYPES DONUT (small doughnut chart)
// ======================================================
function QueryTypesArea({ items = [], summary }) {
  const types = summary?.byType || [
    { _id: "question", count: items.filter(i => (i.type || "").toLowerCase() === "question").length },
    { _id: "request", count: items.filter(i => (i.type || "").toLowerCase() === "request").length },
    { _id: "complaint", count: items.filter(i => (i.type || "").toLowerCase() === "complaint").length }
  ];

  return (
    <div style={{ width: 220, height: 220 }}>
      <QueryTypesDoughnutInner types={types} />
    </div>
  );
}

function QueryTypesDoughnutInner({ types = [] }) {
  const data = types.map(t => ({ name: t._id, value: t.count }));

  const palette = ["#34d399", "#f59e0b", "#f87171", "#60a5fa", "#c084fc"];

  return (
    <PieChart width={220} height={220}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        outerRadius={70}
        innerRadius={28}
        label
      >
        {data.map((_, i) => (
          <Cell key={i} fill={palette[i % palette.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
}
