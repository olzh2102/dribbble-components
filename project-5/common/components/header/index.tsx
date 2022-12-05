import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import lang from 'common/lang.json'
import { Lang } from 'common/types'

export const activeClassName =
  "relative after:content-[' '] after:absolute after:-top-0.5 after:-right-2 after:w-1.5 after:h-1.5 after:bg-[#0d00fc] after:rounded-full after:shadow-active-menu-item"

export default function Header({ children }: { children: ReactNode }) {
  const { locale } = useRouter()
  const t = lang[locale as Lang]
  const { route } = useRouter()

  return (
    <header className="flex justify-between pointer-events-auto mt-4 items-center">
      <nav>
        <ul className="flex gap-6 ml-20 text-black dark:text-white">
          <li className={route === '/' ? activeClassName : ''}>
            <Link href="/">{t.header_home}</Link>
          </li>
          <li className={route === '/projects' ? activeClassName : ''}>
            <Link href="/projects">{t.header_projects}</Link>
          </li>
          <li className={route === '/about' ? activeClassName : ''}>
            <Link href="/about">{t.header_about}</Link>
          </li>
          <li className={route === '/services' ? activeClassName : ''}>
            <Link href="/services">{t.header_services}</Link>
          </li>
          <li className={route === '/contact' ? activeClassName : ''}>
            <Link href="/contact">{t.header_contact}</Link>
          </li>
        </ul>
      </nav>
      <div className="flex gap-x-5 justify-end pr-6 pointer-events-auto text-black dark:text-white dark:mix-blend-exclusion">
        {children}
      </div>
    </header>
  )
}
