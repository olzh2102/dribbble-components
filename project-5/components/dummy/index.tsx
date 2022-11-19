'use client'

import React, { useContext } from 'react'
import { ThemeContext } from '../../contexts/theme-provider'

export default function Dummy() {
  const { setTheme } = useContext(ThemeContext)

  return (
    <>
      <button className="hidden dark:inline dark:text-white" onClick={() => setTheme('light')}>
        Light
      </button>
      <button className="dark:hidden" onClick={() => setTheme('dark')}>
        Dark
      </button>
    </>
  )
}
