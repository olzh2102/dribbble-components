import AlertProvider from './alert-provider'
import CursorProvider from './cursor-provider'
import LangProvider from './lang-provider'
import ThemeProvider from './theme-provider'

export default function ThemeLangCursorProvider({ children }) {
  return (
    <LangProvider>
      <ThemeProvider>
        <CursorProvider>
          <AlertProvider>{children}</AlertProvider>
        </CursorProvider>
      </ThemeProvider>
    </LangProvider>
  )
}
