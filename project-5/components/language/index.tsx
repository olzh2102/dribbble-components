import clsx from 'clsx'
import Link from 'next/link'
import { Locale, useRouter } from 'next/router'

export default function Languages({ mobile = false }: { mobile?: boolean }) {
  const { locales, locale, asPath } = useRouter()

  const styles = (lang: Locale) =>
    clsx({
      'text-primary-zinc dark:text-primary-milk': locale == lang,
      'text-primary-milk/40 dark:text-primary-zinc/40':
        locale == lang && asPath !== '/',
    })

  return (
    <>
      {locales.map((lang) => (
        <Link className={styles(lang)} href={asPath} locale={lang}>
          {lang}
        </Link>
      ))}
    </>
  )
}
