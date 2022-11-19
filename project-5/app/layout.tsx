import React from 'react'
import ThemeProvider from '../contexts/theme-provider'

import '../styles/globals.css'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body className="bg-white dark:bg-slate-900">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}
