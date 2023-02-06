import { useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { motion } from 'framer-motion'

import { Lang } from 'common/types'
import LangToggler from '~components/lang-toggler'
import ThemeToggler from '~components/theme-toggler'
import { CursorContext } from '~contexts/cursor-provider'

import MenuItem from './menu-item'
import MenuToggler from './menu-toggler'

export default function Header() {
  const router = useRouter()
  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  const [isOpen, toggleOpen] = useState(true)

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
    toggleOpen(!isOpen)
  }, [router.asPath])

  return (
    <motion.header
      className="absolute w-full h-full z-20 pointer-events-none"
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
    >
      <motion.div
        data-test-id="header"
        variants={variants}
        className={`
          relative 
          h-full 
          bg-secondary-400 
          dark:bg-secondary-50 
          rounded-md 
          grid place-content-center
        `}
      >
        <nav className="w-min pointer-events-auto">
          <ul
            className="text-primary-200 dark:text-secondary-300 text-5xl font-semibold space-y-2"
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
      <MenuToggler toggle={() => toggleOpen(!isOpen)} />
    </motion.header>
  )
}
