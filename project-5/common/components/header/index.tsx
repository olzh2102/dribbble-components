import Link from 'next/link'
import { ReactNode } from 'react'

export default function Header({ children }: { children: ReactNode }) {
  return (
    <header className="flex justify-between pointer-events-auto mt-4 items-center">
      <nav>
        <ul className="flex gap-6 ml-20 text-black dark:text-white">
          <li>
            <Link href="/projects">Projects</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
          <li>
            <Link href="/services">Services</Link>
          </li>
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="flex gap-x-5 justify-end pr-6 pointer-events-auto text-black dark:text-white dark:mix-blend-exclusion">
        {children}
      </div>
    </header>
  )
}
