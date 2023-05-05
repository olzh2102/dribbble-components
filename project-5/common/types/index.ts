import { NextPage } from 'next'

import { ROUTES } from 'common/constants'

export type Theme = 'light' | 'dark'

export type Page = NextPage & { waveBackground?: boolean; hasLogo?: boolean }

export type RoutePath = typeof ROUTES[number]

export type HTMLElementSelector = keyof HTMLElementTagNameMap

export type ContactFormFields = {
  name: string
  email: string
  details: string
}
