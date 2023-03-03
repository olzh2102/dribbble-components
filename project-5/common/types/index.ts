import { NextPage } from 'next'

import { ROUTES } from 'common/constants'

export type Lang = 'en' | 'de' | 'ru'

export type Theme = 'light' | 'dark'
export type Page = NextPage & { waveBackground?: boolean }

export type RoutePath = typeof ROUTES[number]
export type TranslationKey =
  | 'home'
  | 'projects'
  | 'about'
  | 'services'
  | 'contact'
  | 'pageNotFound'
  | 'search'
  | 'notHere'
  | 'goBack'

export type HTMLElementSelector = keyof HTMLElementTagNameMap
