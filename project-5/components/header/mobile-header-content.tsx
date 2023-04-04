import { useContext, useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import { motion } from 'framer-motion'

import { MOBILE_HEADER_VARIANTS, ROUTES } from 'common/constants'
import LangToggler from '~components/lang-toggler'
import ThemeToggler from '~components/theme-toggler'
import { CursorContext } from '~contexts/cursor-provider'

import MenuItem from './menu-item'
import MenuToggler from './menu-toggler'

export default function MobileHeaderContent() {
  const { asPath, locale } = useRouter()
  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  const [isOpen, toggleOpen] = useState(false)

  useEffect(() => {
    toggleOpen(false)
  }, [asPath])

  return (
    <motion.div
      className="absolute w-full h-full z-50 pointer-events-none text-primary-zinc dark:text-primary-milk"
      animate={isOpen ? 'open' : 'closed'}
    >
      <motion.div
        data-test-id="header"
        variants={MOBILE_HEADER_VARIANTS}
        className="relative h-full grid place-content-center rounded-md bg-primary-milk dark:bg-primary-zinc"
      >
        <nav className="pointer-events-auto">
          <ul
            className="text-4xl font-medium space-y-2 whitespace-nowrap"
            onMouseOver={onMouseOver('a')}
            onMouseOut={onMouseOut}
          >
            {ROUTES.map((route) => (
              <MenuItem key={route} route={route} mobile />
            ))}
          </ul>
        </nav>
        <div className="flex justify-between w-full absolute bottom-0 p-4 pointer-events-auto">
          <div
            className="space-x-2 text-primary-zinc dark:text-primary-milk text-base uppercase font-medium"
            onMouseOver={onMouseOver('label')}
            onMouseOut={onMouseOut}
          >
            <LangToggler currentLang={locale} mobile />
          </div>
          <div className="w-6 h-6">
            <ThemeToggler textColor="text-primary-zinc dark:text-primary-milk" />
          </div>
        </div>
      </motion.div>
      <div className="absolute top-2 w-full flex justify-between items-start p-2">
        <Image src="/nr-logo.svg" width={40} height={40} alt="logo" />
        <MenuToggler toggle={() => toggleOpen(!isOpen)} />
      </div>
    </motion.div>
  )
}
