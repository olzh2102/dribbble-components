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
      absolute top-1/2 -translate-y-1/2 
      flex justify-between w-full
      uppercase text-xl font-semibold
      pointer-events-none
    `}
    >
      <motion.div
        animate={!isHome ? { translateX: '-100%' } : { translateX: 0 }}
        whileHover={!isHome ? { translateX: '-20%' } : {}}
        transition={{ type: 'just' }}
        className={`
          flex flex-col justify-between
          text-secondary-800 dark:text-primary-300
          pointer-events-auto h-48 p-5 pl-7 rounded-r-md
          ${getNavigationClassnames(isHome)}
        `}
      >
        <div
          className="flex flex-col gap-1 pointer-events-auto text-base"
          onMouseOver={(e) => onMouseOver(e, 'label')}
          onMouseOut={(e) => onMouseOut(e, 'label')}
        >
          <LangToggler currentLang={locale as Lang} />
        </div>
        <ThemeToggler
          textColor={
            !isHome
              ? 'text-primary-850 dark:text-secondary-100'
              : 'text-primary-200 dark:text-secondary-300'
          }
        />
      </motion.div>

      <motion.nav
        animate={!isHome ? { translateX: '100%' } : { translateX: 0 }}
        whileHover={!isHome ? { translateX: '8%' } : {}}
        transition={{ type: 'just' }}
        className={`
          pointer-events-auto h-48 p-5 pr-7 rounded-l-md
          ${getNavigationClassnames(isHome)} 
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

function getNavigationClassnames(predicate: boolean) {
  return predicate
    ? 'text-primary-200 dark:text-secondary-300'
    : 'bg-secondary-100 dark:bg-primary-850 text-secondary-600 dark:text-secondary-100'
}
