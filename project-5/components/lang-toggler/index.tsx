import { useContext } from 'react'

import { LANGS } from 'common/constants'
import { Lang } from 'common/types'
import Language from '~components/language'
import { LangContext } from '~contexts/lang-provider'

export default function LangToggler({
  currentLang,
  mobile,
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
