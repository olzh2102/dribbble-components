import { createContext, ReactNode } from 'react'

import { useRouter } from 'next/router'

import { Lang } from 'common/types'

export const LangContext = createContext<any>({
  setLang: () => {},
})

export default function LangProvider({ children }: { children: ReactNode }) {
  const router = useRouter()

  function setLang(lang: Lang) {
    router.push(router.route, undefined, { locale: lang })
  }

  return <LangContext.Provider value={setLang}>{children}</LangContext.Provider>
}
