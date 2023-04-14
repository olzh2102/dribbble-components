import CursorProvider from './cursor-provider'
import ThemeProvider from './theme-provider'

export default function ThemeCursorProvider({ children }) {
  return (
    <ThemeProvider>
      <CursorProvider>{children}</CursorProvider>
    </ThemeProvider>
  )
}
