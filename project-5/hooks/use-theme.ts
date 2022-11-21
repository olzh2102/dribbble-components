import { useEffect, useState } from 'react'

import { Theme } from 'common/types'

const useTheme = () => {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) setTheme(savedTheme as 'light' | 'dark')
  }, [])

  useEffect(() => {
    if (theme) {
      document.documentElement.className = theme
      localStorage.setItem('theme', theme)
    }
  }, [theme])

  return { theme, setTheme }
}

export default useTheme
