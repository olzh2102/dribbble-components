import { useContext } from 'react'

import { LANG } from 'common/constants'
import { Lang } from 'common/types'
import { LangContext } from '~contexts/lang-provider'

export default function LangToggler({ lang }: { lang: Lang }) {
  const setLang = useContext(LangContext)

  return (
    <div className="text-teal-600 dark:text-zinc-400">
      {/* english */}
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
        className="peer-checked/en:text-slate-900 dark:peer-checked/en:text-white"
      >
        en
      </label>{' '}
      <span>/</span>
      {/* german */}
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
        className="peer-checked/de:text-slate-900 dark:peer-checked/de:text-white"
      >
        {' '}
        de
      </label>{' '}
      <span>/</span>
      {/* russian */}
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
        className="peer-checked/ru:text-slate-900 dark:peer-checked/ru:text-white"
      >
        {' '}
        ru
      </label>
    </div>
  )
}
