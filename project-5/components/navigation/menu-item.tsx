import Link from 'next/link'
import { useRouter } from 'next/router'

import clsx from 'clsx'
import { motion } from 'framer-motion'

import lang from 'common/lang.json'
import { RoutePath } from 'common/types'

export default function MenuItem({ route, mobile }: { route: RoutePath; mobile?: boolean }) {
  const { locale, route: currentRoute } = useRouter()
  const t = lang[locale]

  const translationKey = route === '/' ? 'home' : route.replace('/', '')

  const linkStyles = clsx({
    'bg-gradient-to-l bg-clip-text text-transparent from-action-peach dark:from-action-gold':
      route === currentRoute,
    'via-primary-zinc to-primary-zinc dark:via-primary-milk dark:to-primary-milk':
      route === '/' || mobile,
    'via-primary-milk to-primary-milk dark:via-primary-zinc dark:to-primary-zinc':
      route !== '/' && !mobile,
  })

  return (
    <li className="relative w-min">
      <Link href={route} className={linkStyles}>
        {t.header[translationKey]}
      </Link>

      <motion.span
        role={route === currentRoute ? 'active-mark' : ''}
        animate={route === currentRoute ? 'show' : 'hidden'}
        transition={{ opacity: { duration: 1.2, type: 'spring' } }}
        variants={{ show: { opacity: 1 }, hidden: { opacity: 0 } }}
        className="absolute top-2 -right-3 w-1 h-1 rounded-full bg-action-peach dark:bg-action-gold shadow-active-menu-item"
      />
    </li>
  )
}
