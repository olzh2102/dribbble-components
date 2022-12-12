import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'

import { Lang, RoutePath, TranslationKey } from 'common/types'

import lang from 'common/lang.json'

export default function MenuItem({ route }: { route: RoutePath }) {
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

  const translationKey = route === '/' ? 'home' : (route.replace('/', '') as TranslationKey)

  return (
    <li className="relative">
      <Link href={route}>{t.header[translationKey]}</Link>
      <motion.span
        animate={route === currentRoute ? 'show' : 'hidden'}
        transition={transition}
        variants={variants}
        className="absolute -top-0.5 -right-1.5 w-1 h-1 bg-primary-100 dark:bg-primary-900 rounded-full shadow-active-menu-item dark:shadow-dark-active-menu-item"
        role={route === currentRoute ? 'active-mark' : ''}
      />
    </li>
  )
}
