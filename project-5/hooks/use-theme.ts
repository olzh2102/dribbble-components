import { useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'

const useTheme = (defaultTheme: 'light' | 'dark') => {
  const [status, setStatus] = useState<'loading' | 'success'>('loading')
  const [theme, setTheme] = useState(defaultTheme)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme && status === 'loading') {
      setTheme(savedTheme as 'light' | 'dark')
    } else {
      document.documentElement.className = theme
      localStorage.setItem('theme', theme)
    }

    setStatus('success')
  }, [status, theme])

  return {
    theme,
    setTheme,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
  }
}

export default useTheme
