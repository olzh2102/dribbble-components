import { NextRouter } from 'next/router'

declare module 'next/router' {
  export type Locale = 'en' | 'de' | 'ru' | 'by'
  export function useRouter(): Omit<NextRouter, 'locale' | 'locales'> & {
    locale: Locale
    locales: Locale[]
    query: Omit<ParsedUrlQuery, 'project'> & { project: string }
  }
}
