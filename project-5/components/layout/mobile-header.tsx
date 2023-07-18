import { useContext, useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { motion } from 'framer-motion'

import { MOBILE_HEADER_VARIANTS, ROUTES } from 'common/constants'
import LangToggler from '~components/language'
import Logo from '~components/logo'
import MenuItem from '~components/navigation/menu-item'
import MenuToggler from '~components/navigation/menu-toggler'
import ThemeToggler from '~components/theme-toggler'
import { CursorContext } from '~contexts/cursor-provider'

export default function MobileHeaderContent() {
  const { asPath } = useRouter()
  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  const [isOpen, toggleOpen] = useState(false)

  useEffect(() => {
    toggleOpen(false)
  }, [asPath])

  return (
    <motion.div
      className="absolute w-full h-full z-50 pointer-events-none text-primary-zinc dark:text-primary-milk"
      animate={isOpen ? 'open' : 'closed'}
    >
      <motion.div
        data-test-id="header"
        variants={MOBILE_HEADER_VARIANTS}
        className="relative h-full grid place-content-center bg-primary-milk dark:bg-primary-zinc"
      >
        <nav className="pointer-events-auto">
          <ul
            className="text-4xl space-y-2 whitespace-nowrap"
            onMouseOver={onMouseOver('a')}
            onMouseOut={onMouseOut}
          >
            {ROUTES.map((route) => (
              <MenuItem key={route} route={route} mobile />
            ))}
          </ul>
        </nav>
        <div className="flex justify-between w-full absolute bottom-0 p-4 pointer-events-auto">
          <div
            className="space-x-2 text-primary-zinc dark:text-primary-milk text-base uppercase"
            onMouseOver={onMouseOver('label')}
            onMouseOut={onMouseOut}
          >
            <LangToggler mobile />
          </div>
          <div className="w-6 h-6 relative">
            <ThemeToggler textColor="text-primary-zinc dark:text-primary-milk" />
          </div>
        </div>
      </motion.div>
      <div
        className={`${
          asPath !== '/' ? 'bg-primary-milk dark:bg-primary-zinc' : ''
        } absolute z-50 top-0 w-[calc(100%-1rem)] h-12 flex justify-between items-center rounded-t-md mt-2 mx-2 px-2 pointer-events-auto`}
      >
        {asPath !== '/' ? <Logo /> : <span />}
        <MenuToggler toggle={() => toggleOpen(!isOpen)} />
      </div>
    </motion.div>
  )
}
