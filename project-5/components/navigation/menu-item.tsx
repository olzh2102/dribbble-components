import Link from 'next/link'
import { useRouter } from 'next/router'

import clsx from 'clsx'
import { motion } from 'framer-motion'

import lang from 'common/lang.json'
import { RoutePath } from 'common/types'

export default function MenuItem({ route, mobile }: { route: RoutePath; mobile?: boolean }) {
  const { locale, route: currentRoute } = useRouter()
  const t = lang[locale]

  const isHome = route === '/'
  const isActive = currentRoute.split('/')[1] === route.slice(1)
  const translationKey = isHome ? 'home' : route.slice(1)

  const linkStyles = clsx({
    'bg-gradient-to-l bg-clip-text text-transparent from-action-peach dark:from-action-gold':
      isActive && (isHome || mobile),
    'bg-gradient-to-l bg-clip-text text-transparent from-action-gold dark:from-action-peach':
      isActive && !isHome && !mobile,
    'via-primary-zinc to-primary-zinc dark:via-primary-milk dark:to-primary-milk': isHome || mobile,
    'via-primary-milk to-primary-milk dark:via-primary-zinc dark:to-primary-zinc':
      !isHome && !mobile,
  })

  const activeLinkDotStyles = clsx({
    'bg-action-peach dark:bg-action-gold': isHome || mobile,
    'bg-action-gold dark:bg-action-peach': !isHome && !mobile,
  })

  return (
    <li className="relative w-min">
      <Link href={route} className={linkStyles}>
        {t.header[translationKey]}
      </Link>

      <motion.span
        role={isActive ? 'active-mark' : ''}
        animate={isActive ? 'show' : 'hidden'}
        transition={{ opacity: { duration: 1.2, type: 'spring' } }}
        variants={{ show: { opacity: 1 }, hidden: { opacity: 0 } }}
        className={`absolute top-2 -right-3 w-1.5 h-1.5 rounded-full ${activeLinkDotStyles}`}
      />
    </li>
  )
}
