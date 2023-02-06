import React, { useContext } from 'react'

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { motion } from 'framer-motion'

import { CursorContext } from '~contexts/cursor-provider'
import { ThemeContext } from '~contexts/theme-provider'
import useSoundOnToggle from '~hooks/use-sound-on-toggle'

export default function ThemeToggler() {
  const { theme, setTheme } = useContext(ThemeContext)
  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  const { playOn, playOff } = useSoundOnToggle({
    pathOn: '/sounds/light-on.mp3',
    pathOff: '/sounds/light-off.mp3',
  })

  const variants = {
    show: { opacity: 1, zIndex: 1, rotate: 0 },
    hidden: { opacity: 0, zIndex: 0, rotate: 120 },
  }

  const transition = {
    rotate: { type: 'spring', damping: 8, stiffness: 90 },
  }

  function toLight() {
    setTheme('light')
    playOn()
  }

  function toDark() {
    setTheme('dark')
    playOff()
  }

  return (
    <div
      className="relative w-6 h-6 pointer-events-auto"
      onMouseOver={(e) => onMouseOver(e, 'button')}
      onMouseOut={(e) => onMouseOut(e, 'button')}
    >
      <motion.button
        animate={theme === 'light' ? 'hidden' : 'show'}
        variants={variants}
        transition={transition}
        className="absolute bottom-1/2 -left-0.5"
        onClick={toLight}
        role="sun-btn"
      >
        <SunIcon className="h-8 w-8 text-primary-200 dark:text-secondary-300" />
      </motion.button>
      <motion.button
        animate={theme === 'dark' ? 'hidden' : 'show'}
        variants={variants}
        transition={transition}
        className="absolute bottom-1/2 left-0"
        onClick={toDark}
        role="moon-btn"
      >
        <MoonIcon className="h-7 w-7 text-primary-200 dark:text-secondary-300" />
      </motion.button>
    </div>
  )
}
