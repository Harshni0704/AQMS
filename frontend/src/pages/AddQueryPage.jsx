import React, { useState } from "react";
import { createQuery } from "../lib/api";
import { useNavigate } from "react-router-dom";

export default function AddQueryPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    priority: "low",
    channel: "website",
  });

  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!form.name || !form.email || !form.message) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      await createQuery(form);
      alert("Query added successfully!");
      navigate("/inbox");
    } catch (err) {
      console.error(err);
      alert("Failed to add query");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <h2 className="page-title">Create New Query</h2>

      <div className="form-grid">

        <label>Name *</label>
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Customer Name"
        />

        <label>Email *</label>
        <input
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
        />

        <label>Message *</label>
        <textarea
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="Customer Complaint / Query"
        />

        <label>Priority</label>
        <select
          value={form.priority}
          onChange={(e) => setForm({ ...form, priority: e.target.value })}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <label>Channel</label>
        <select
          value={form.channel}
          onChange={(e) => setForm({ ...form, channel: e.target.value })}
        >
          <option value="website">Website</option>
          <option value="email">Email</option>
          <option value="facebook">Facebook</option>
          <option value="whatsapp">WhatsApp</option>
        </select>

        <button
          className="btn-primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Query"}
        </button>
      </div>
    </div>
  );
}