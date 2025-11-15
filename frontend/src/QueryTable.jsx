import React from "react";

export default function QueryTable({ rows = [] }) {
  return (
    <table className="query-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Type</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Message</th>
          <th>Created At</th>
        </tr>
      </thead>

      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
              No queries found
            </td>
          </tr>
        ) : (
          rows.map((q) => (
            <tr key={q._id}>
              <td>{q.name}</td>
              <td>{q.email}</td>
              <td>{q.type}</td>
              <td>{q.priority}</td>
              <td>{q.status}</td>
              <td>{q.message}</td>
              <td>{new Date(q.createdAt).toLocaleString()}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
