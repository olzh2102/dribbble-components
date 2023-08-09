import useResponsive from '~hooks/use-responsive'

import DesktopHeaderContent from './desktop-header'
import MobileHeaderContent from './mobile-header'

export default function Header() {
  const isMobile = useResponsive('sm')

  return (
    <header className="text-xl">
      {!isMobile ? <DesktopHeaderContent /> : <MobileHeaderContent />}
    </header>
  )
}
