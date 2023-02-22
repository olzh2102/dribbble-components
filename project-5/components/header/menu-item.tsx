import Link from 'next/link'
import { useRouter } from 'next/router'

import { motion } from 'framer-motion'

import lang from 'common/lang.json'
import { Lang, RoutePath, TranslationKey } from 'common/types'

const activeVariants = {
  common: 'bg-gradient-to-l bg-clip-text text-transparent from-secondary-900',
  home: 'via-primary-200 to-primary-200 dark:via-secondary-300 dark:to-secondary-300',
  away: 'via-primary-850 to-primary-850 dark:via-secondary-100 dark:to-secondary-100',
}

export default function MenuItem({ route }: { route: RoutePath }) {
  const { locale, route: currentRoute } = useRouter()
  const t = lang[locale as Lang]

  const translationKey = route === '/' ? 'home' : (route.replace('/', '') as TranslationKey)

  return (
    <li className="relative w-min">
      <Link
        href={route}
        className={
          route === currentRoute
            ? activeVariants.common + ' ' + activeVariants[route === '/' ? 'home' : 'away']
            : ''
        }
      >
        {t.header[translationKey]}
      </Link>

      <motion.span
        role={route === currentRoute ? 'active-mark' : ''}
        animate={route === currentRoute ? 'show' : 'hidden'}
        transition={{ opacity: { duration: 1.2, type: 'spring' } }}
        variants={{ show: { opacity: 1 }, hidden: { opacity: 0 } }}
        className={`
          absolute top-2 -right-3 
          w-1 h-1 rounded-full bg-primary-900
          shadow-active-menu-item
        `}
      />
    </li>
  )
}
