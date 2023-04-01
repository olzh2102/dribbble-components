import { useContext, useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import { motion } from 'framer-motion'

import { ROUTES } from 'common/constants'
import LangToggler from '~components/lang-toggler'
import ThemeToggler from '~components/theme-toggler'
import { CursorContext } from '~contexts/cursor-provider'

import MenuItem from './menu-item'
import MenuToggler from './menu-toggler'

export default function MobileHeaderContent() {
  const { asPath, locale } = useRouter()
  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  const [isOpen, toggleOpen] = useState(false)

  const variants = {
    open: {
      clipPath: 'circle(5000px at 100vw 0)',
      transition: {
        type: 'spring',
        stiffness: 20,
        damping: 20,
      },
    },
    closed: {
      clipPath: 'circle(1px at 100vw 0)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 60,
      },
    },
  }

  useEffect(() => {
    toggleOpen(false)
  }, [asPath])

  return (
    <motion.div
      className="absolute w-full h-full z-50 pointer-events-none"
      animate={isOpen ? 'open' : 'closed'}
    >
      <motion.div
        data-test-id="header"
        variants={variants}
        className={`
          relative 
          h-full 
          text-primary-zinc dark:text-primary-milk
          bg-primary-milk dark:bg-primary-zinc
          grid place-content-center
          rounded-md 
        `}
      >
        <nav className="pointer-events-auto">
          <ul
            className="text-5xl font-medium space-y-2 whitespace-nowrap"
            onMouseOver={(e) => onMouseOver(e, 'a')}
            onMouseOut={(e) => onMouseOut(e, 'a')}
          >
            {ROUTES.map((route) => (
              <MenuItem key={route} route={route} mobile />
            ))}
          </ul>
        </nav>
        <div className="flex justify-between w-full absolute bottom-0 p-4 pointer-events-auto">
          <div
            className={`
              flex gap-2
              text-primary-zinc dark:text-primary-milk
              text-base uppercase font-medium
            `}
            onMouseOver={(e) => onMouseOver(e, 'label')}
            onMouseOut={(e) => onMouseOut(e, 'label')}
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
