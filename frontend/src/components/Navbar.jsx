import React from "react";
import { useSearch } from "../context/SearchContext";

export default function Navbar() {
  const { updateTerm } = useSearch();

  return (
    <nav className="navbar">
      <div className="logo">AQMS</div>

      <input
        type="text"
        placeholder="Search queries, customers, messages…"
        className="search-input"
        onChange={(e) => updateTerm(e.target.value)}
      />
    </nav>
  );
}
