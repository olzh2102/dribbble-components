import { useContext } from 'react'

import { LANG } from 'common/constants'
import { Lang } from 'common/types'
import { CursorContext } from '~contexts/cursor-provider'
import { LangContext } from '~contexts/lang-provider'

export default function LangToggler({ lang }: { lang: Lang }) {
  const setLang = useContext(LangContext)
  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  return (
    <div
      className="flex flex-col"
      onMouseOver={(e) => onMouseOver(e, 'label')}
      onMouseOut={(e) => onMouseOut(e, 'label')}
    >
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
        className="peer-checked/en:text-primary-200 dark:peer-checked/en:text-secondary-300"
      >
        en
      </label>{' '}
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
        className="peer-checked/de:text-primary-200 dark:peer-checked/de:text-secondary-300"
      >
        {' '}
        de
      </label>{' '}
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
        className="peer-checked/ru:text-primary-200 dark:peer-checked/ru:text-secondary-300"
      >
        {' '}
        ru
      </label>
    </div>
  )
}
