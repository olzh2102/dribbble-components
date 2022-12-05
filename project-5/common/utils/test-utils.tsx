import React, { ReactElement } from 'react'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import LangProvider from '~contexts/lang-provider'
import ThemeProvider from '~contexts/theme-provider'

function render(ui: ReactElement, renderOptions?: Omit<RenderOptions, 'wrapper'>) {
  return rtlRender(ui, { wrapper: Providers, ...renderOptions })
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </LangProvider>
  )
}

export * from '@testing-library/react'
export { render, renderHook }