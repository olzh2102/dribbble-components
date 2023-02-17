import { useRouter } from 'next/router'

import { LANG } from 'common/constants'
import { Lang } from 'common/types'

export default function Language({
  lang,
  currentLang,
  onSelect,
}: {
  lang: Lang
  currentLang: Lang
  onSelect: (e: Lang) => void
}) {
  const { asPath } = useRouter()

  return (
    <>
      <input
        className={`hidden peer/${lang} ${currentLang == LANG[lang] ? 'checked' : ''}`}
        type="radio"
        name="lang"
        id={lang}
        role={`radio-${lang}`}
        value={LANG[lang]}
        checked={currentLang == LANG[lang]}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSelect(e.target.value as Lang)}
      />
      <label htmlFor={lang} className={getLabelClassName(asPath == '/', lang)}>
        {lang}
      </label>
    </>
  )
}

function getLabelClassName(predicate: boolean, lang: Lang) {
  return predicate
    ? 'peer-checked/' + lang + ':text-primary-200 dark:peer-checked/' + lang + ':text-secondary-300'
    : 'peer-checked/' + lang + ':text-primary-850 dark:peer-checked/' + lang + ':text-primary-200'
}
