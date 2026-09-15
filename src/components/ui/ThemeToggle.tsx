import { useState } from 'react'
import { Moon, Sun } from 'lucide-react'

import { getNextTheme, saveTheme, type Theme } from '../../lib/theme'
import './ThemeToggle.css'

function getActiveTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(getActiveTheme)
  const nextTheme = getNextTheme(theme)
  const label = `Switch to ${nextTheme} theme`

  const toggleTheme = () => {
    saveTheme(nextTheme)
    setTheme(nextTheme)
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        {theme === 'dark' ? <Sun /> : <Moon />}
      </span>
      <span className="theme-toggle-label">{nextTheme}</span>
    </button>
  )
}
