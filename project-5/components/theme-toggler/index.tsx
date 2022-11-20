'use client'

import React, { useContext } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { ThemeContext } from '../../contexts/theme-provider'

export default function ThemeToggler() {
  const { setTheme } = useContext(ThemeContext)

  return (
    <>
      <button className="hidden dark:inline" onClick={() => setTheme('light')}>
        <SunIcon className="h-8 w-8 text-yellow-500" />
      </button>
      <button className="dark:hidden" onClick={() => setTheme('dark')}>
        <MoonIcon className="h-7 w-7 text-slate-700" />
      </button>
    </>
  )
}
