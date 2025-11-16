import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchQuery, updateQuery, updateQueryStatus, assignQuery } from '../lib/api'
import { useSearch } from '../context/SearchContext'

export default function QueryDetailsPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { term, trigger } = useSearch()

  const [doc, setDoc] = useState(null)
  const [message, setMessage] = useState('')
  const [assignTo, setAssignTo] = useState('')
  const [loading, setLoading] = useState(false)

  async function load() {
    setLoading(true)
    try {
      const d = await fetchQuery(id)
      setDoc(d)
      setMessage(d.message || '')
      setAssignTo(d.assignedTo || '')
    } catch (err) {
      console.error(err)
      alert("Failed to load query")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [id, term, trigger])

  async function save() {
    try {
      // First update the message
      await updateQuery(id, { message })

      // Then update assignment
      await assignQuery(id, { assignedTo: assignTo })

      alert("Saved successfully!")
      load()  // refresh UI
    } catch (err) {
      console.error(err)
      alert("Error saving data")
    }
  }

  async function setStatus(s) {
    try {
      const updated = await updateQueryStatus(id, { status: s })
      setDoc(updated)
    } catch (err) {
      console.error(err)
      alert("Failed to update status")
    }
  }

  if (!doc) return <div className="page">Loading…</div>

  return (
    <div className="page detail-page">
      <div className="detail-grid">
        <div className="detail-main">
          <div className="detail-header">
            <div>
              <h2 className="detail-title">{doc.name}</h2>
              <div className="detail-sub">@{doc.email} • {doc.channel}</div>
            </div>
            <div className="detail-actions">
              <button onClick={() => navigate('/inbox')} className="btn-ghost">Back</button>
              <button onClick={() => setStatus('in_progress')} className="btn-warning">In Progress</button>
              <button onClick={() => setStatus('resolved')} className="btn-success">Resolve</button>
            </div>
          </div>

          <div className="detail-message">
            <div className="message-box">{doc.message}</div>
          </div>

          <div className="reply-editor">
            <textarea 
              value={message}
              onChange={e => setMessage(e.target.value)}
            />

            <div className="reply-actions">
              <input 
                placeholder="Assign to"
                value={assignTo}
                onChange={e => setAssignTo(e.target.value)}
              />
              <button onClick={save} className="btn-primary">Save</button>
            </div>
          </div>
        </div>

        <aside className="detail-side">
          <div className="card">
            <h4>Details</h4>

            <div className="meta-row">
              <strong>ID</strong>
              <span>#{doc._id}</span>
            </div>

            <div className="meta-row">
              <strong>Status</strong>
              <select value={doc.status} onChange={e => setStatus(e.target.value)}>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>

            <div className="meta-row">
              <strong>Assignee</strong>
              <span>{doc.assignedTo || '—'}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}