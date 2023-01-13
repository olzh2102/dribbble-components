import { useContext } from 'react'

import lang from 'common/lang.json'
import { Lang, RoutePath, Theme, TranslationKey } from 'common/types'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ThemeContext } from '~contexts/theme-provider'

function mapActiveClassname(isActive: boolean, theme: Theme) {
  let res = ''

  if (isActive) {
    res = 'bg-gradient-to-l bg-clip-text text-transparent '
    if (theme == 'dark') res += 'from-secondary-900 to-secondary-300'
    else res += 'from-primary-150 to-primary-200'
  }

  return res
}

export default function MenuItem({ route }: { route: RoutePath }) {
  const theme = useContext(ThemeContext).theme
  const { locale, route: currentRoute } = useRouter()
  const t = lang[locale as Lang]

  const variants = {
    show: { opacity: 1 },
    hidden: { opacity: 0 },
  }

  const transition = {
    opacity: {
      duration: 1.2,
      type: 'spring',
    },
  }

  const translationKey =
    route === '/' ? 'home' : (route.replace('/', '') as TranslationKey)

  return (
    <li className="relative uppercase">
      <Link
        href={route}
        className={mapActiveClassname(route === currentRoute, theme)}
      >
        {t.header[translationKey]}
      </Link>
      <motion.span
        role={route === currentRoute ? 'active-mark' : ''}
        animate={route === currentRoute ? 'show' : 'hidden'}
        transition={transition}
        variants={variants}
        className={`
          absolute top-2 -right-3 
          w-1 h-1 
          rounded-full 
          bg-primary-100 dark:bg-primary-900 
          shadow-active-menu-item dark:shadow-dark-active-menu-item
        `}
      />
    </li>
  )
}
