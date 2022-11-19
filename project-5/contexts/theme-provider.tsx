'use client'

import { createContext, ReactNode, useEffect, useState } from 'react'

const DEFAULT_VALUES = {
  theme: 'light',
  setTheme: (_: string) => {},
}

export const ThemeContext = createContext(DEFAULT_VALUES)

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(
    () => (typeof window != 'undefined' && localStorage.getItem('theme')) || DEFAULT_VALUES.theme
  )

  useEffect(() => {
    document.documentElement.className = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
