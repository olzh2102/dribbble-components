import React, { useContext } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'

import { ThemeContext } from '~contexts/theme-provider'

export default function ThemeToggler() {
  const { setTheme } = useContext(ThemeContext)

  return (
    <>
      <button className="hidden dark:inline" onClick={() => setTheme('light')}>
        <SunIcon className="h-6 w-6 text-white" />
      </button>
      <button className="dark:hidden" onClick={() => setTheme('dark')}>
        <MoonIcon className="h-5 w-5 text-slate-900" />
      </button>
    </>
  )
}
