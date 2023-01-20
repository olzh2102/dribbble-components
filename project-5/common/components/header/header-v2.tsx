import { useContext, useEffect } from 'react'

import { Lang } from 'common/types'
import { motion, useCycle } from 'framer-motion'
import { useRouter } from 'next/router'

import MenuItem from './menu-item'
import MenuToggler from './menu-toggler'

import LangToggler from '~components/lang-toggler'
import ThemeToggler from '~components/theme-toggler'
import { CursorContext } from '~contexts/cursor-provider'

export default function Header() {
  const router = useRouter()
  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  const [isOpen, toggleOpen] = useCycle(false, true)

  const variants = {
    open: {
      clipPath: 'circle(2200px at 100vw 0)',
      transition: {
        type: 'spring',
        stiffness: 20,
      },
    },
    closed: {
      clipPath: 'circle(1px at 100vw 0)',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 40,
      },
    },
  }

  useEffect(() => {
    toggleOpen()
  }, [router.asPath, toggleOpen])

  return (
    <motion.header
      className="absolute w-full h-full z-20 pointer-events-none"
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
    >
      <motion.div
        variants={variants}
        className={`
          relative 
          h-full 
          bg-[#a9bcd0] 
          dark:bg-secondary-50 
          rounded-xl 
          grid place-content-center
        `}
      >
        <nav className="w-min pointer-events-auto">
          <ul
            className="text-primary-200 dark:text-secondary-300 text-5xl font-bold space-y-2"
            onMouseOver={(e) => onMouseOver(e, 'a')}
            onMouseOut={(e) => onMouseOut(e, 'a')}
          >
            <MenuItem route="/" />
            <MenuItem route="/projects" />
            <MenuItem route="/about" />
            <MenuItem route="/services" />
            <MenuItem route="/contact" />
          </ul>
        </nav>
        <div className="flex justify-between w-full dark:text-primary-300 absolute bottom-0 p-4">
          <LangToggler lang={router.locale as Lang} />
          <ThemeToggler />
        </div>
      </motion.div>
      <MenuToggler toggle={toggleOpen} />
    </motion.header>
  )
}
