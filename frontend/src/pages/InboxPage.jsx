import React, { useEffect, useState } from 'react'
import { fetchQueries } from '../lib/api'
import { useSearch } from '../context/SearchContext'
import { useNavigate } from 'react-router-dom'

function Badge({ text, kind }) {
  return <span className={'badge ' + (kind || '')}>{text}</span>
}

export default function InboxPage() {
  const { term, trigger } = useSearch()
  const [items, setItems] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function load() {
    setLoading(true)
    try {
      const data = await fetchQueries({ search: term, page, limit: 12 })
      setItems(data.items || [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [term, trigger, page])

  return (
    <div className="page inbox-page">
      <div className="filters-row">
        <div className="chips">
          <button className="chip">Status: All</button>
          <button className="chip">Priority: All</button>
          <button className="chip">Channel: All</button>
        </div>
        <div className="total">Total: {items.length}</div>
      </div>

      <div className="inbox-grid">
        <div className="table-wrapper">
          <table className="inbox-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Query</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Channel</th>
                <th>Last Update</th>
              </tr>
            </thead>

            <tbody>
              {loading && (
                <tr><td colSpan="6" className="loading">Loading…</td></tr>
              )}

              {!loading && items.length === 0 && (
                <tr><td colSpan="6" className="empty">No queries found</td></tr>
              )}

              {items.map(item => (
                <tr key={item._id} className="row-click" onClick={() => navigate(`/inbox/${item._id}`)}>
                  <td className="customer-cell">
                    <div className="avatar" />
                    <span>{item.name}</span>
                  </td>
                  <td>{item.message.length > 120 ? item.message.slice(0, 120) + '...' : item.message}</td>
                  <td><Badge text={item.priority} kind={item.priority} /></td>
                  <td><Badge text={item.status} kind="status" /></td>
                  <td>{item.channel || 'website'}</td>
                  <td>{new Date(item.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <aside className="inbox-right">
          <div className="empty-detail">Select a query to view details</div>
        </aside>
      </div>

      <div className="pagination">
        <button onClick={() => setPage(p => Math.max(1, p - 1))} className="page-btn">Prev</button>
        <div className="page-info">Page {page}</div>
        <button onClick={() => setPage(p => p + 1)} className="page-btn">Next</button>
      </div>
    </div>
  )
}
