import { useContext } from 'react'

import { useRouter } from 'next/router'

import clsx from 'clsx'
import { motion } from 'framer-motion'

import { ROUTES } from 'common/constants'
import LangToggler from '~components/lang-toggler'
import MenuItem from '~components/navigation/menu-item'
import ThemeToggler from '~components/theme-toggler'
import { CursorContext } from '~contexts/cursor-provider'

export default function DesktopHeaderContent() {
  const { locale, asPath } = useRouter()
  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  const isHome = asPath === '/'

  const LHS = clsx(
    'flex flex-col justify-between pointer-events-auto p-5 pl-7 rounded-r-md font-medium',
    {
      'text-primary-zinc/40 dark:text-primary-milk/40': isHome,
      'bg-primary-zinc dark:bg-primary-milk text-primary-milk dark:text-primary-zinc': !isHome,
    }
  )

  const RHS = clsx('pointer-events-auto p-5 pr-7 rounded-l-md', {
    'text-primary-zinc dark:text-primary-milk': isHome,
    'bg-primary-zinc dark:bg-primary-milk text-primary-milk dark:text-primary-zinc': !isHome,
  })

  return (
    <div className="absolute top-1/2 -translate-y-1/2 z-10 flex justify-between w-full h-48 uppercase pointer-events-none">
      <motion.div
        role="left-side-header"
        className={LHS}
        transition={{ type: 'just' }}
        whileHover={!isHome ? { translateX: '-20%' } : {}}
        animate={!isHome ? { translateX: '-100%' } : { translateX: 0 }}
        onMouseOver={onMouseOver('label', 'button')}
        onMouseOut={onMouseOut}
      >
        <div
          data-test-id="language-toggler-wrapper"
          className="flex flex-col gap-1 pointer-events-auto"
        >
          <LangToggler currentLang={locale} />
        </div>
        <div data-test-id="theme-toggler-wrapper" className="relative w-6 h-6">
          <ThemeToggler
            textColor={clsx({
              'text-primary-zinc dark:text-primary-milk': isHome,
              'text-primary-milk dark:text-primary-zinc': !isHome,
            })}
          />
        </div>
      </motion.div>

      <motion.nav
        role="right-side-header"
        className={RHS}
        transition={{ type: 'just' }}
        whileHover={!isHome ? { translateX: '8%' } : {}}
        animate={!isHome ? { translateX: '100%' } : { translateX: 0 }}
        onMouseOver={onMouseOver('a')}
        onMouseOut={onMouseOut}
      >
        <ul
          data-test-id="ul-nav-list"
          className="flex flex-col h-full justify-between whitespace-nowrap text-xl font-medium"
        >
          {ROUTES.map((route) => (
            <MenuItem key={route} route={route} />
          ))}
        </ul>
      </motion.nav>
    </div>
  )
}
