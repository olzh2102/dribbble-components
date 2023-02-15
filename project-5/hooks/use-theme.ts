import { useEffect, useState } from 'react'

import { Theme } from 'common/types'

const useTheme = () => {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme
    if (savedTheme) setTheme(savedTheme)
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
