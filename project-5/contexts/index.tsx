import CursorProvider from './cursor-provider'
import ThemeProvider from './theme-provider'

export default function ThemeLangCursorProvider({ children }) {
  return (
    <ThemeProvider>
      <CursorProvider>{children}</CursorProvider>
    </ThemeProvider>
  )
}
