import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getQueryById, updateQuery } from "../lib/api";

export default function QueryDetailsPage() {
  const { id } = useParams();

  const [doc, setDoc] = useState(null);
  const [message, setMessage] = useState("");
  const [assignTo, setAssignTo] = useState("");

  // Fetch query details
  useEffect(() => {
    async function load() {
      try {
        const data = await getQueryById(id);
        setDoc(data);
        setMessage(data.message || "");
        setAssignTo(data.assignedTo || "");
      } catch (err) {
        console.error("Error fetching query:", err);
      }
    }
    load();
  }, [id]);

  // SAVE updated query
  async function save() {
    try {
      const payload = {
        name: doc.name,
        email: doc.email,
        channel: doc.channel,
        type: doc.type,
        priority: doc.priority,
        status: doc.status,
        message,
        assignedTo: assignTo,
      };

      const updated = await updateQuery(id, payload);
      setDoc(updated);
      alert("Saved Successfully!");
    } catch (err) {
      console.error("Error saving:", err);
      alert("Error saving data");
    }
  }

  if (!doc) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Query Details</h1>

      <div className="space-y-3">
        <p><strong>Name:</strong> {doc.name}</p>
        <p><strong>Email:</strong> {doc.email}</p>
        <p><strong>Channel:</strong> {doc.channel}</p>
        <p><strong>Type:</strong> {doc.type}</p>
        <p><strong>Priority:</strong> {doc.priority}</p>

        {/* Status */}
        <div>
          <label className="font-semibold">Status:</label>
          <select
            value={doc.status}
            onChange={(e) => setDoc({ ...doc, status: e.target.value })}
            className="border p-2 rounded ml-2"
          >
            <option value="Open">Open</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Resolved">Resolved</option>
            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Message */}
        <div>
          <label className="font-semibold block">Message:</label>
          <textarea
            className="border p-2 w-full rounded"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Assigned To */}
        <div>
          <label className="font-semibold block">Assigned To:</label>
          <input
            type="text"
            className="border p-2 w-full rounded"
            value={assignTo}
            onChange={(e) => setAssignTo(e.target.value)}
          />
        </div>

        {/* SAVE BUTTON */}
        <button
          onClick={save}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
        >
          Save
        </button>
      </div>
    </div>
  );
}