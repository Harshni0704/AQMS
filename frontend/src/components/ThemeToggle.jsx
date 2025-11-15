import React from 'react'
import { useTheme } from '../context/ThemeContext'

export default function ThemeToggle(){
  const { theme, toggle } = useTheme()
  return (
    <button className="theme-toggle" onClick={toggle}>
      {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
  )
}
