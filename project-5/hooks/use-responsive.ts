import { useEffect, useState } from 'react'

import { BREAKPOINTS } from 'common/constants'

export default function useResponsive(size: keyof typeof BREAKPOINTS) {
  const [isChangeSize, setIsChangeSize] = useState(false)

  useEffect(() => {
    setIsChangeSize(window.innerWidth <= BREAKPOINTS[size])

    const handleResize = (e: UIEvent) => {
      const width = (e.target as Window).innerWidth
      setIsChangeSize(width <= BREAKPOINTS[size])
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [size])

  return isChangeSize
}
