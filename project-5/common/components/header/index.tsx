import { ReactNode } from 'react'
import MenuItem from './menu-item'

export default function Header({ children }: { children: ReactNode }) {
  return (
    <header className="flex justify-between pointer-events-auto mt-4 items-center">
      <nav>
        <ul className="flex gap-6 ml-20 text-primary-200 dark:text-secondary-300">
          <MenuItem route="/" />
          <MenuItem route="/projects" />
          <MenuItem route="/about" />
          <MenuItem route="/services" />
          <MenuItem route="/contact" />
        </ul>
      </nav>
      <div className="flex gap-x-5 justify-end pr-6 pointer-events-auto text-primary-200 dark:text-secondary-300 dark:mix-blend-exclusion">
        {children}
      </div>
    </header>
  )
}
