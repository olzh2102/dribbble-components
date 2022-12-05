import Link from 'next/link'
import { useRouter } from 'next/router'
import { ReactNode } from 'react'

import lang from 'common/lang.json'
import { Lang } from 'common/types'

export default function Header({ children }: { children: ReactNode }) {
  const locale = useRouter().locale
  const t = lang[locale as Lang]

  return (
    <header className="flex justify-between pointer-events-auto mt-4 items-center">
      <nav>
        <ul className="flex gap-6 ml-20 text-black dark:text-white">
          <li>
            <Link href="/">{t.header_home}</Link>
          </li>
          <li>
            <Link href="/projects">{t.header_projects}</Link>
          </li>
          <li>
            <Link href="/about">{t.header_about}</Link>
          </li>
          <li>
            <Link href="/services">{t.header_services}</Link>
          </li>
          <li>
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
