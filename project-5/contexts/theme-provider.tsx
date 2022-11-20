'use client'

import { createContext, ReactNode } from 'react'
import Loading from '../app/loading'
import useTheme, { Theme } from '../hooks/use-theme'

const DEFAULT_VALUES: { theme: Theme; setTheme: (_: Theme) => void } = {
  theme: 'light',
  setTheme: () => {},
}

export const ThemeContext = createContext(DEFAULT_VALUES)

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme, setTheme, isLoading } = useTheme(DEFAULT_VALUES.theme)

  if (isLoading) return <Loading />

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}
