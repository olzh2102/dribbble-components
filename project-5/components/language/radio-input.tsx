import { useRouter } from 'next/router'

import { Lang } from 'common/types'

const labelConfig = {
  en: 'peer-checked/en:text-primary-milk/40 dark:peer-checked/en:text-primary-zinc/40',
  de: 'peer-checked/de:text-primary-milk/40 dark:peer-checked/de:text-primary-zinc/40',
  ru: 'peer-checked/ru:text-primary-milk/40 dark:peer-checked/ru:text-primary-zinc/40',
  home: {
    en: 'peer-checked/en:text-primary-zinc dark:peer-checked/en:text-primary-milk',
    de: 'peer-checked/de:text-primary-zinc dark:peer-checked/de:text-primary-milk',
    ru: 'peer-checked/ru:text-primary-zinc dark:peer-checked/ru:text-primary-milk',
  },
}

export default function Language({
  lang,
  currentLang,
  onSelect,
  mobile = false,
}: {
  lang: Lang
  currentLang: Lang
  onSelect: (e: Lang) => void
  mobile?: boolean
}) {
  const isHomePage = useRouter().asPath == '/'

  return (
    <>
      <input
        className={`hidden peer/${lang}`}
        type="radio"
        name="lang"
        id={lang}
        role={`radio-${lang}`}
        value={lang}
        checked={currentLang == lang}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSelect(e.target.value as Lang)}
      />
      <label
        htmlFor={lang}
        className={isHomePage || mobile ? labelConfig['home'][lang] : labelConfig[lang]}
      >
        {lang}
      </label>
    </>
  )
}
