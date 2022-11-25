import type { AppProps } from 'next/app'

import ThemeProvider from '~contexts/theme-provider'
import LangProvider from '~contexts/lang-provider'

import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LangProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </LangProvider>
  )
}
