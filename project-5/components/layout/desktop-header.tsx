import { useContext } from 'react'

import { useRouter } from 'next/router'

import clsx from 'clsx'
import { motion } from 'framer-motion'

import { ROUTES } from 'common/constants'
import LangToggler from '~components/language'
import MenuItem from '~components/navigation/menu-item'
import ThemeToggler from '~components/theme-toggler'
import { CursorContext } from '~contexts/cursor-provider'

export default function DesktopHeaderContent() {
  const { asPath } = useRouter()
  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  const isHome = asPath === '/'

  const LHS = clsx('flex flex-col justify-between p-5 pl-10 h-full rounded-r-md ', {
    'text-primary-zinc/40 dark:text-primary-milk/40': isHome,
    'bg-primary-zinc dark:bg-primary-milk text-primary-milk dark:text-primary-zinc': !isHome,
  })

  const RHS = clsx('p-5 pr-10 h-full rounded-l-md', {
    'text-primary-zinc dark:text-primary-milk': isHome,
    'bg-primary-zinc dark:bg-primary-milk text-primary-milk dark:text-primary-zinc': !isHome,
  })

  return (
    <div className="absolute top-1/2 -translate-y-1/2 z-10 flex justify-between w-full h-48 uppercase pointer-events-none">
      <motion.div
        className="pr-4 pointer-events-auto"
        transition={{ type: 'just' }}
        whileHover={!isHome ? { translateX: '-20%' } : {}}
        animate={!isHome ? { translateX: '-74%' } : { translateX: 0 }}
        onMouseOver={onMouseOver('label', 'button')}
        onMouseOut={onMouseOut}
      >
        <div className={LHS} data-cy="language-and-theme-toggler-container">
          <div
            data-cy="language-toggler-container"
            className="flex flex-col gap-1 pointer-events-auto"
          >
            <LangToggler />
          </div>
          <div data-cy="theme-toggler-container" className="relative w-6 h-6">
            <ThemeToggler
              textColor={clsx({
                'text-primary-zinc dark:text-primary-milk': isHome,
                'text-primary-milk dark:text-primary-zinc': !isHome,
              })}
            />
          </div>
        </div>
      </motion.div>

      <motion.div
        className="pl-4 pointer-events-auto"
        transition={{ type: 'just' }}
        whileHover={!isHome ? { translateX: '5%' } : {}}
        animate={!isHome ? { translateX: '85.2%' } : { translateX: 0 }}
        onMouseOver={onMouseOver('a')}
        onMouseOut={onMouseOut}
      >
        <nav className={RHS} data-cy="navigation-menu">
          <ul
            data-cy="navigation-menu-list"
            className="flex flex-col h-full justify-between whitespace-nowrap text-xl"
          >
            {ROUTES.map((route) => (
              <MenuItem key={route} route={route} />
            ))}
          </ul>
        </nav>
      </motion.div>
    </div>
  )
}
