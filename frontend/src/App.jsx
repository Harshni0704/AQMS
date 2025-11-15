import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'
import InboxPage from './pages/InboxPage'
import DashboardPage from './pages/DashboardPage'
import RulesPage from './pages/RulesPage'
import QueryDetailsPage from './pages/QueryDetailsPage'

export default function App() {
  return (
    <div className="app-root">
      <Sidebar />
      <div className="main-column">
        <TopBar />
        <div className="content-area">
          <Routes>
            <Route path="/" element={<Navigate to="/inbox" replace />} />
            <Route path="/inbox" element={<InboxPage />} />
            <Route path="/inbox/:id" element={<QueryDetailsPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/rules" element={<RulesPage />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}
