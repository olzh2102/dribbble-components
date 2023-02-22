import { useContext } from 'react'

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

  const isHome = asPath === '/'

  return (
    <header
      className={`
      absolute top-1/2 -translate-y-1/2 z-10
      flex justify-between w-full h-48 
      uppercase
      pointer-events-none
    `}
    >
      {/* LEFT SIDE */}
      <motion.div
        animate={!isHome ? { translateX: '-100%' } : { translateX: 0 }}
        whileHover={!isHome ? { translateX: '-20%' } : {}}
        transition={{ type: 'just' }}
        role="left-side-header"
        className={`
          flex flex-col justify-between
          pointer-events-auto p-5 pl-7 rounded-r-md
          ${
            isHome
              ? 'text-primary-200/40 dark:text-secondary-300/40'
              : 'bg-secondary-100 dark:bg-primary-850 text-primary-850/40 dark:text-primary-200/40'
          }
        `}
      >
        <div
          data-test-id="language-toggler-wrapper"
          className="flex flex-col gap-1 pointer-events-auto font-semibold"
          onMouseOver={(e) => onMouseOver(e, 'label')}
          onMouseOut={(e) => onMouseOut(e, 'label')}
        >
          <LangToggler currentLang={locale as Lang} />
        </div>
        <div
          data-test-id="theme-toggler-wrapper"
          className="relative w-6 h-6"
          onMouseOver={(e) => onMouseOver(e, 'button')}
          onMouseOut={(e) => onMouseOut(e, 'button')}
        >
          <ThemeToggler
            textColor={
              !isHome
                ? 'text-primary-850 dark:text-secondary-100'
                : 'text-primary-200 dark:text-secondary-300'
            }
          />
        </div>
      </motion.div>

      {/* RIGHT SIDE */}
      <motion.nav
        animate={!isHome ? { translateX: '100%' } : { translateX: 0 }}
        whileHover={!isHome ? { translateX: '8%' } : {}}
        transition={{ type: 'just' }}
        role="right-side-header"
        className={`
          pointer-events-auto p-5 pr-7 rounded-l-md
          ${
            isHome
              ? 'text-primary-200 dark:text-secondary-300'
              : 'bg-secondary-100 dark:bg-primary-850 text-secondary-600 dark:text-secondary-100'
          }
        `}
      >
        <ul
          data-test-id="ul-nav-list"
          className="flex flex-col h-full justify-between whitespace-nowrap text-xl font-semibold"
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
