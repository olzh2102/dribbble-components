import { NextPage } from 'next'

export type Lang = 'en' | 'de' | 'ru'

export type LangContextType = {
  lang: Lang
  setLang: (lang: Lang) => void
}

export type Theme = 'light' | 'dark'
export type Page = NextPage & { waveBackground?: boolean }

export type RoutePath = '/' | '/projects' | '/about' | '/services' | '/contact'
export type TranslationKey = 'home' | 'projects' | 'about' | 'services' | 'contact'
