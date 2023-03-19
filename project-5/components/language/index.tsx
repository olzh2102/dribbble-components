import { useRouter } from 'next/router'

import { Lang } from 'common/types'

const labelConfig = {
  primary: {
    en: 'peer-checked/en:text-primary-200 dark:peer-checked/en:text-secondary-300',
    de: 'peer-checked/de:text-primary-200 dark:peer-checked/de:text-secondary-300',
    ru: 'peer-checked/ru:text-primary-200 dark:peer-checked/ru:text-secondary-300',
  },
  secondary: {
    en: 'peer-checked/en:text-primary-850 dark:peer-checked/en:text-primary-200',
    de: 'peer-checked/de:text-primary-850 dark:peer-checked/de:text-primary-200',
    ru: 'peer-checked/ru:text-primary-850 dark:peer-checked/ru:text-primary-200',
  },
}

export default function Language({
  lang,
  currentLang,
  onSelect,
  mobile,
}: {
  lang: Lang
  currentLang: Lang
  onSelect: (e: Lang) => void
  mobile?: boolean
}) {
  const { asPath } = useRouter()

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
        className={labelConfig[asPath == '/' && !mobile ? 'primary' : 'secondary'][lang]}
      >
        {lang}
      </label>
    </>
  )
}
