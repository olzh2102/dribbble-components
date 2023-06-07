import Link from 'next/link'
import { Locale, useRouter } from 'next/router'

import clsx from 'clsx'

export default function Languages({ mobile = false }: { mobile?: boolean }) {
  const { locales, locale, asPath } = useRouter()

  const styles = (lang: Locale) =>
    clsx({
      'text-action-peach dark:text-action-gold': locale == lang && mobile,
      'text-primary-gold dark:text-primary-milk': locale == lang && !mobile,
      'text-primary-milk/40 dark:text-primary-zinc/40': locale == lang && asPath !== '/' && !mobile,
    })

  return (
    <>
      {locales.map((lang) => (
        <Link key={lang} className={styles(lang)} href={asPath} locale={lang}>
          {lang}
        </Link>
      ))}
    </>
  )
}
