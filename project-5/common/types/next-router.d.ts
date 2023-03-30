import { NextRouter } from 'next/router'

declare module 'next/router' {
  export type Locale = 'en' | 'de' | 'ru'
  export function useRouter(): Omit<NextRouter, 'locale' | 'locales'> & {
    locale: Locale
    locales: Locale[]
  }
}
