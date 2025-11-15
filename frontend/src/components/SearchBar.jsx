import React, { useState } from 'react'
import { useSearch } from '../context/SearchContext'

export default function SearchBar() {
  const { setQuery } = useSearch()
  const [v, setV] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    setQuery(v.trim())
  }

  return (
    <form className="searchbar" onSubmit={onSubmit}>
      <input
        placeholder="Search by keyword, user, or ID..."
        value={v}
        onChange={e => setV(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-btn">Search</button>
    </form>
  )
}
