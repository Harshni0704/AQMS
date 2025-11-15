import React, { useState } from "react";

export default function RulesPage() {
  const [rules, setRules] = useState([
    { id: 1, name: "Refund Requests", cond: "Message contains 'refund'", tag: "refund" },
    { id: 2, name: "Urgent Issues", cond: "Message contains 'urgent' or 'asap'", tag: "urgent" },
    { id: 3, name: "Feature Requests", cond: "Message contains 'feature' or 'please add'", tag: "feature_request" }
  ]);

  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    cond: "",
    tag: "",
  });

  const filteredRules = rules.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase()) ||
    r.tag.toLowerCase().includes(search.toLowerCase()) ||
    r.cond.toLowerCase().includes(search.toLowerCase())
  );

  function addRule() {
    if (!form.name.trim() || !form.cond.trim() || !form.tag.trim()) return;

    const newRule = {
      id: Date.now(),
      name: form.name,
      cond: form.cond,
      tag: form.tag,
    };

    setRules([...rules, newRule]);
    setForm({ name: "", cond: "", tag: "" });
    setModalOpen(false);
  }

  return (
    <div className="page rules-page">

      <h1 className="page-title">Auto-Tagging Rules</h1>

      {/* TOP BAR */}
      <div className="rules-top">
        <input
          className="rules-search"
          placeholder="Search rules..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="btn-primary" onClick={() => setModalOpen(true)}>
          Add New Rule
        </button>
      </div>

      {/* TABLE */}
      <div className="rules-table">
        <div className="rules-head">
          <div>Rule Name</div>
          <div>Conditions</div>
          <div>Tags Applied</div>
          <div>Actions</div>
        </div>

        {filteredRules.map((r) => (
          <div key={r.id} className="rules-row">
            <div>{r.name}</div>
            <div className="muted">{r.cond}</div>
            <div><span className="tag-pill">{r.tag}</span></div>
            <div><a>Edit</a></div>
          </div>
        ))}

        {filteredRules.length === 0 && (
          <div className="empty">No rules found</div>
        )}
      </div>

      {/* MODAL */}
      {modalOpen && (
        <div className="modal-backdrop">
          <div className="modal-box">

            <h2>Add New Rule</h2>

            <label>Rule Name</label>
            <input
              className="modal-input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <label>Condition</label>
            <input
              className="modal-input"
              value={form.cond}
              onChange={(e) => setForm({ ...form, cond: e.target.value })}
            />

            <label>Tag to Apply</label>
            <input
              className="modal-input"
              value={form.tag}
              onChange={(e) => setForm({ ...form, tag: e.target.value })}
            />

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setModalOpen(false)}>
                Cancel
              </button>

              <button className="btn-primary" onClick={addRule}>
                Save Rule
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
