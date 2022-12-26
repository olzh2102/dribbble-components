import React, { ReactElement } from 'react'

import {
  render as rtlRender,
  RenderOptions,
  renderHook as rtlRenderHook,
} from '@testing-library/react'

import CursorProvider from '~contexts/cursor-provider'
import LangProvider from '~contexts/lang-provider'
import ThemeProvider from '~contexts/theme-provider'

function render(ui: ReactElement, renderOptions?: Omit<RenderOptions, 'wrapper'>) {
  return rtlRender(ui, { wrapper: Providers, ...renderOptions })
}

function renderHook<T, P>(hook: (props: T) => P, renderOptions?: Omit<RenderOptions, 'wrapper'>) {
  return rtlRenderHook(hook, { wrapper: Providers, ...renderOptions })
}

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LangProvider>
      <ThemeProvider>
        <CursorProvider>{children}</CursorProvider>
      </ThemeProvider>
    </LangProvider>
  )
}

export * from '@testing-library/react'
export { render, renderHook }
