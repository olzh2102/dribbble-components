import { useContext } from 'react'

import { useRouter } from 'next/router'

import { Lang } from 'common/types'
import LangToggler from '~components/lang-toggler'
import ThemeToggler from '~components/theme-toggler'
import { CursorContext } from '~contexts/cursor-provider'

import MenuItem from './menu-item'

export default function Header() {
  const locale = useRouter().locale
  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  return (
    <header
      className={`
        absolute 
        top-1/2 -translate-y-1/2 
        px-5 
        flex justify-between items-center 
        w-full`}
    >
      <div
        className={`
        flex flex-col gap-3 
        text-center text-secondary-800 dark:text-primary-300
        `}
      >
        <LangToggler lang={locale as Lang} />
        <ThemeToggler />
      </div>
      <nav>
        <ul
          className="text-primary-200 dark:text-secondary-300 text-end text-4xl font-semibol space-y-1"
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
