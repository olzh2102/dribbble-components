import { ReactNode, useContext } from 'react'

import { CursorContext } from '~contexts/cursor-provider'

import MenuItem from './menu-item'

export default function Header({ children }: { children: ReactNode }) {
  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  return (
    <header className="flex pt-5 pr-3 justify-between items-center">
      <nav>
        <ul
          className="flex gap-6 ml-20 text-primary-200 dark:text-secondary-300"
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
      <div className="flex gap-x-5 justify-end pr-6 text-secondary-400 dark:text-secondary-300 mix-blend-exclusion">
        {children}
      </div>
    </header>
  )
}
