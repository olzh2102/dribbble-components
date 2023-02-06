import { useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { motion } from 'framer-motion'

import { Lang } from 'common/types'
import LangToggler from '~components/lang-toggler'
import ThemeToggler from '~components/theme-toggler'
import { CursorContext } from '~contexts/cursor-provider'

import MenuItem from './menu-item'

export default function Header() {
  const router = useRouter()
  const { onMouseOver, onMouseOut } = useContext(CursorContext)
  const [isHidden, setIsHidden] = useState(false)

  useEffect(() => {
    setIsHidden(router.asPath !== '/')
  }, [router.asPath])

  return (
    <header
      className={`
        absolute z-10 
        top-1/2 -translate-y-1/2 
        flex justify-between
        w-full
        pointer-events-none`}
    >
      <motion.div
        animate={isHidden ? { translateX: '-100%' } : { translateX: 0 }}
        whileHover={isHidden ? { translateX: '-20%' } : {}}
        transition={{ type: 'just' }}
        className={`
          flex flex-col justify-between
          text-secondary-800 dark:text-primary-300
          pointer-events-auto
          h-52
          ${isHidden ? 'bg-primary-800 dark:bg-primary-250' : ''}
          p-5
          rounded-r-md
        `}
      >
        <LangToggler lang={router.locale as Lang} />
        <ThemeToggler />
      </motion.div>
      <motion.nav
        animate={isHidden ? { translateX: '100%' } : { translateX: 0 }}
        whileHover={isHidden ? { translateX: '8%' } : {}}
        transition={{ type: 'just' }}
        className={`pointer-events-auto h-52 ${
          isHidden ? 'bg-primary-800 dark:bg-primary-250' : ''
        } p-5 rounded-l-md`}
      >
        <ul
          className={`
            flex flex-col h-full justify-between
            text-primary-200 dark:text-secondary-300 
            text-2xl font-bold 
            whitespace-nowrap
          `}
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
