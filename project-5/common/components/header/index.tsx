import { useContext } from 'react'

import { Lang } from 'common/types'
import { useRouter } from 'next/router'

import MenuItem from './menu-item'

import LangToggler from '~components/lang-toggler'
import ThemeToggler from '~components/theme-toggler'
import { CursorContext } from '~contexts/cursor-provider'

export default function Header() {
  const locale = useRouter().locale
  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  return (
    <header
      className={`
        absolute 
        top-1/2 -translate-y-1/2 
        px-8 
        flex justify-between items-center 
        w-full
        pointer-events-none`}
    >
      <div
        className={`
        flex flex-col gap-3 
        text-center text-secondary-800 dark:text-primary-300
        pointer-events-auto
        `}
      >
        <LangToggler lang={locale as Lang} />
        <ThemeToggler />
      </div>
      <nav>
        <ul
          className="text-primary-200 dark:text-secondary-300 text-end text-2xl font-bold space-y-1 pointer-events-auto"
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
    </header>
  )
}
