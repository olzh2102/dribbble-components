import { useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { motion } from 'framer-motion'

import { Lang } from 'common/types'
import LangToggler from '~components/lang-toggler'
import ThemeToggler from '~components/theme-toggler'
import { CursorContext } from '~contexts/cursor-provider'

import MenuItem from './menu-item'

export default function Header() {
  const { locale, asPath } = useRouter()

  const { onMouseOver, onMouseOut } = useContext(CursorContext)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    setIsHidden(asPath !== '/')
  }, [asPath])

  return (
    <header
      className={`
      absolute top-1/2 -translate-y-1/2 
      flex justify-between
      uppercase text-xl font-semibold
      z-10 w-full pointer-events-none
    `}
    >
      <motion.div
        animate={isHidden ? { translateX: '-100%' } : { translateX: 0 }}
        whileHover={isHidden ? { translateX: '-20%' } : {}}
        transition={{ type: 'just' }}
        className={`
          flex flex-col justify-between
          text-secondary-800 dark:text-primary-300
          pointer-events-auto h-48 p-5 pl-7 rounded-r-md
          ${
            isHidden
              ? 'bg-secondary-100 dark:bg-primary-850 text-secondary-600 dark:text-secondary-100'
              : 'text-primary-200 dark:text-secondary-300'
          }
        `}
      >
        <LangToggler lang={locale as Lang} isHomePath={asPath === '/'} />
        <ThemeToggler
          textColor={
            isHidden
              ? 'text-primary-850 dark:text-secondary-100'
              : 'text-primary-200 dark:text-secondary-300'
          }
        />
      </motion.div>

      <motion.nav
        animate={isHidden ? { translateX: '100%' } : { translateX: 0 }}
        whileHover={isHidden ? { translateX: '8%' } : {}}
        transition={{ type: 'just' }}
        className={`
          pointer-events-auto h-48 p-5 pr-7 rounded-l-md
          ${
            isHidden
              ? 'bg-secondary-100 dark:bg-primary-850 text-primary-850 dark:text-secondary-100'
              : 'text-primary-200 dark:text-secondary-300'
          } 
        `}
      >
        <ul
          className="flex flex-col h-full justify-between whitespace-nowrap"
          onMouseOver={(e) => onMouseOver(e, 'a')}
          onMouseOut={(e) => onMouseOut(e, 'a')}
        >
          <MenuItem route="/" />
          <MenuItem route="/projects" />
          <MenuItem route="/about" />
          <MenuItem route="/services" />
          <MenuItem route="/contact" />
        </ul>
      </motion.nav>
    </header>
  )
}
