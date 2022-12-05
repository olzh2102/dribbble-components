import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import lang from 'common/lang.json'
import { Lang } from 'common/types'

const activeMenuItem =
  "relative after:content-[' '] after:absolute after:-top-0.5 after:-right-2 after:w-1.5 after:h-1.5 after:bg-[#0d00fc] after:rounded-full after:shadow-active-menu-item"

export default function Header({ children }: { children: ReactNode }) {
  const locale = useRouter().locale
  const t = lang[locale as Lang]
  const { route } = useRouter()

  return (
    <header className="flex justify-between pointer-events-auto mt-4 items-center">
      <nav>
        <ul className="flex gap-6 ml-20 text-black dark:text-white">
          <li className={route === '/' ? activeMenuItem : ''}>
            <Link href="/">{t.header_home}</Link>
          </li>
          <li className={route === '/projects' ? activeMenuItem : ''}>
            <Link href="/projects">{t.header_projects}</Link>
          </li>
          <li className={route === '/about' ? activeMenuItem : ''}>
            <Link href="/about">{t.header_about}</Link>
          </li>
          <li className={route === '/services' ? activeMenuItem : ''}>
            <Link href="/services">{t.header_services}</Link>
          </li>
          <li className={route === '/contact' ? activeMenuItem : ''}>
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
