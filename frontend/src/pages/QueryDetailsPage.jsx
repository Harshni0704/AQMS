import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { fetchQuery, updateQueryStatus } from '../lib/api'
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
    if (!id) return
    setLoading(true)
    try {
      const d = await fetchQuery(id)
      setDoc(d)
      setMessage(d.message || '')
      setAssignTo(d.assignedTo || '')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [id, term, trigger])

  async function save() {
    alert('To persist message/assignee add a PUT /api/queries/:id endpoint in backend. Current backend supports status updates only.')
  }

  async function setStatus(s) {
    try {
      const updated = await updateQueryStatus(id, { status: s })
      setDoc(updated)
    } catch (err) {
      console.error(err)
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
              <button onClick={() => setStatus('in_progress')} className="btn-warning">Mark In Progress</button>
              <button onClick={() => setStatus('resolved')} className="btn-success">Resolve</button>
            </div>
          </div>

          <div className="detail-message">
            <div className="message-box">{doc.message}</div>
          </div>

          <div className="reply-editor">
            <textarea value={message} onChange={e => setMessage(e.target.value)} />
            <div className="reply-actions">
              <input placeholder="Assign to" value={assignTo} onChange={e => setAssignTo(e.target.value)} />
              <button onClick={save} className="btn-primary">Save</button>
            </div>
          </div>
        </div>

        <aside className="detail-side">
          <div className="card">
            <h4>Details</h4>
            <div className="meta-row"><strong>Query ID</strong><span>#{doc._id}</span></div>
            <div className="meta-row"><strong>Status</strong>
              <select value={doc.status} onChange={e => setStatus(e.target.value)}>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            <div className="meta-row"><strong>Assignee</strong><span>{doc.assignedTo || '—'}</span></div>
            <div className="meta-row"><strong>Channel</strong><span>{doc.channel}</span></div>
          </div>

          <div className="card history">
            <h4>History</h4>
            <ul>
              <li>Message received: {new Date(doc.createdAt).toLocaleString()}</li>
              <li>Status: {doc.status}</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
