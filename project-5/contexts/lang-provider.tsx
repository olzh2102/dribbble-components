import { createContext, ReactNode } from 'react'

import { useRouter } from 'next/router'

import { Lang } from 'common/types'

export const LangContext = createContext<{ setLang: (lang: Lang) => void }>({
  setLang: () => null,
})

export default function LangProvider({ children }: { children: ReactNode }) {
  const router = useRouter()

  return (
    <LangContext.Provider
      value={{ setLang: (lang) => router.push(router.route, undefined, { locale: lang }) }}
    >
      {children}
    </LangContext.Provider>
  )
}
