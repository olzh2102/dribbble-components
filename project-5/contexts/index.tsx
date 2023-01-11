import CursorProvider from './cursor-provider'
import LangProvider from './lang-provider'
import ThemeProvider from './theme-provider'

export default function ThemeLangCursorProvider({ children }) {
  return (
    <LangProvider>
      <ThemeProvider>
        <CursorProvider>{children}</CursorProvider>
      </ThemeProvider>
    </LangProvider>
  )
}
