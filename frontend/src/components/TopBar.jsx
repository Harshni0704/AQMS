import React from 'react'
import SearchBar from './SearchBar'

export default function TopBar(){
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h1 className="page-title">Audience Query Manager</h1>
      </div>
      <div className="topbar-right">
        <SearchBar />
      </div>
    </header>
  )
}
