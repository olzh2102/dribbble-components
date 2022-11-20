import type { AppProps } from 'next/app'
import ThemeProvider from '../contexts/theme-provider'

import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
