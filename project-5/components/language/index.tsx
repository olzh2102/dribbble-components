import { useRouter } from 'next/router'

import Language from './radio-input'

export default function LangToggler({ mobile = false }: { mobile?: boolean }) {
  const { locales, push, route } = useRouter()

  return (
    <>
      {locales.map((lang) => (
        <Language
          key={lang}
          lang={lang}
          mobile={mobile}
          onSelect={(lang) => push(route, undefined, { locale: lang })}
        />
      ))}
    </>
  )
}
