import { useContext } from 'react'

import { LANG } from 'common/constants'
import { Lang } from 'common/types'
import { LangContext } from '~contexts/lang-provider'

export default function LangToggler({ lang, isHomePath }: { lang: Lang; isHomePath?: boolean }) {
  const { setLang } = useContext(LangContext)

  return (
    <>
      <input
        className={`hidden peer/en ${lang == LANG.EN ? 'checked' : ''}`}
        type="radio"
        name="lang"
        id="english"
        role="radio-en"
        value={LANG.EN}
        checked={lang == LANG.EN}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLang(e.target.value as Lang)}
      />
      <label
        htmlFor="english"
        className={
          isHomePath
            ? 'peer-checked/en:text-primary-200 dark:peer-checked/en:text-secondary-300'
            : 'peer-checked/en:text-primary-850 dark:peer-checked/en:text-primary-200'
        }
      >
        en
      </label>

      <input
        className={`hidden peer/de ${lang == LANG.DE ? 'checked' : ''}`}
        type="radio"
        name="lang"
        id="german"
        role="radio-de"
        value={LANG.DE}
        checked={lang == LANG.DE}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setLang(e.target.value as Lang)
        }}
      />
      <label
        htmlFor="german"
        className={
          isHomePath
            ? 'peer-checked/de:text-primary-200 dark:peer-checked/de:text-secondary-300'
            : 'peer-checked/de:text-primary-850 dark:peer-checked/de:text-primary-200'
        }
      >
        de
      </label>

      <input
        className={`hidden peer/ru ${lang == LANG.RU ? 'checked' : ''}`}
        type="radio"
        name="lang"
        id="russian"
        role="radio-ru"
        value={LANG.RU}
        checked={lang == LANG.RU}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLang(e.target.value as Lang)}
      />
      <label
        htmlFor="russian"
        className={
          isHomePath
            ? 'peer-checked/ru:text-primary-200 dark:peer-checked/ru:text-secondary-300'
            : 'peer-checked/ru:text-primary-850 dark:peer-checked/ru:text-primary-200'
        }
      >
        ru
      </label>
    </>
  )
}
