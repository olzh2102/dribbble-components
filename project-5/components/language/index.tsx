import { useContext } from 'react'

import { LANGS } from 'common/constants'
import { Lang } from 'common/types'
import { LangContext } from '~contexts/lang-provider'

import Language from './radio-input'

export default function LangToggler({
  currentLang,
  mobile = false,
}: {
  currentLang: Lang
  mobile?: boolean
}) {
  const { setLang } = useContext(LangContext)

  return (
    <>
      {LANGS.map((lang) => (
        <Language
          key={lang}
          currentLang={currentLang}
          lang={lang}
          onSelect={setLang}
          mobile={mobile}
        />
      ))}
    </>
  )
}
