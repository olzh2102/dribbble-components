import { createContext, ReactNode } from 'react'

import useTheme from 'hooks/use-theme'

import { Theme } from 'common/types'

export const ThemeContext = createContext<{ theme: Theme; setTheme: (theme: Theme) => void }>({
  theme: 'light',
  setTheme: () => null,
})

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme, setTheme } = useTheme()

  return (
    <ThemeContext.Provider value={{ theme: theme || 'light', setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
