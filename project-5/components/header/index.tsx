import { useEffect, useState } from 'react'

import { BREAKPOINTS } from 'common/constants'

import DesktopHeaderContent from './desktop-header-content'
import MobileHeaderContent from './mobile-header-content'

export default function Header() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = (e: UIEvent) => {
      const width = (e.target as Window).innerWidth

      setIsMobile(width <= BREAKPOINTS.sm)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <header>{!isMobile ? <DesktopHeaderContent /> : <MobileHeaderContent />}</header>
}
