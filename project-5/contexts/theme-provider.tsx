import { createContext, ReactNode } from 'react'

import { Theme } from 'common/types'
import useTheme from '~hooks/use-theme'

const DEFAULT_VALUES: { theme: Theme; setTheme: (_: Theme) => void } = {
  theme: 'light',
  setTheme: () => {},
}

export const ThemeContext = createContext(DEFAULT_VALUES)

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme()

  return (
    <ThemeContext.Provider value={{ theme: theme || DEFAULT_VALUES.theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
