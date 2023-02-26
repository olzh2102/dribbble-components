import useResponsive from '~hooks/use-responsive'

import DesktopHeaderContent from './desktop-header-content'
import MobileHeaderContent from './mobile-header-content'

export default function Header() {
  const isMobile = useResponsive('sm')

  return <header>{!isMobile ? <DesktopHeaderContent /> : <MobileHeaderContent />}</header>
}
