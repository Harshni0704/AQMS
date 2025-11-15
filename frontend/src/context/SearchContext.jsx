import React, { createContext, useContext, useState } from 'react'

const SearchContext = createContext()

export function SearchProvider({ children }) {
  const [term, setTerm] = useState('')
  const [trigger, setTrigger] = useState(0)

  function setQuery(q) {
    setTerm(q)
    setTrigger(t => t + 1)
  }

  return (
    <SearchContext.Provider value={{ term, trigger, setQuery }}>
      {children}
    </SearchContext.Provider>
  )
}

export function useSearch() {
  return useContext(SearchContext)
}
