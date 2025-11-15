import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Sidebar() {
  const [showNewQuery, setShowNewQuery] = useState(false);

  // FORM STATE
  const [form, setForm] = useState({
    name: "",
    email: "",
    channel: "email",
    message: ""
  });

  // Handle Input Change
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // SUBMIT NEW QUERY TO BACKEND
  async function handleSubmit() {
    if (!form.name || !form.email || !form.message) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/queries/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (res.ok) {
        alert("Query added successfully!");

        // Clear form
        setForm({
          name: "",
          email: "",
          channel: "email",
          message: ""
        });

        setShowNewQuery(false);
      } else {
        alert("Error adding query");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="brand">
          
          {/* 🔥 ADDED YOUR ICON HERE */}
          <div 
            className="brand-logo" 
            style={{ display: "flex", alignItems: "center", gap: "10px" }}
          >
            <img 
              src="/icon.png" 
              alt="AQMS Logo" 
              style={{ width: 34, height: 34 }}
            />
            <span>AQMS</span>
          </div>

          <div className="brand-sub">Audience Manager</div>
        </div>

        <nav className="nav">
          <NavLink to="/dashboard" className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>Dashboard</NavLink>
          <NavLink to="/inbox" className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>Inbox</NavLink>
          <NavLink to="/rules" className={({ isActive }) => 'nav-item' + (isActive ? ' active' : '')}>Auto-Tag Rules</NavLink>
        </nav>
      </div>

      <div className="spacer" />

      <div className="sidebar-bottom">
        <button className="btn-primary" onClick={() => setShowNewQuery(true)}>New Query</button>
        <div style={{ height: 10 }} />
        <ThemeToggle />
      </div>

      {/* MODAL */}
      {showNewQuery && (
        <div className="modal-backdrop" onClick={() => setShowNewQuery(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0 }}>Create New Query</h3>

            <input
              className="modal-input"
              placeholder="Customer Name"
              name="name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              className="modal-input"
              placeholder="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />

            <select
              className="modal-input"
              name="channel"
              value={form.channel}
              onChange={handleChange}
            >
              <option value="email">Email</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="twitter">Twitter</option>
              <option value="facebook">Facebook</option>
              <option value="website">Website</option>
              <option value="live_chat">Live Chat</option>
              <option value="linkedin">LinkedIn</option>
            </select>

            <textarea
              className="modal-input"
              placeholder="Message"
              name="message"
              rows={3}
              value={form.message}
              onChange={handleChange}
            />

            <div className="modal-actions">
              <button className="btn-ghost" onClick={() => setShowNewQuery(false)}>Cancel</button>
              <button className="btn-success" onClick={handleSubmit}>Add</button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
