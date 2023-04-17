import { NextPage } from 'next'

import { ROUTES, SERVICE_TYPES } from 'common/constants'

export type Theme = 'light' | 'dark'

export type Page = NextPage & { waveBackground?: boolean }

export type RoutePath = typeof ROUTES[number]

export type HTMLElementSelector = keyof HTMLElementTagNameMap

export type ServiceType = typeof SERVICE_TYPES[number]

export type ContactFormFields = {
  name: string
  email: string
  details: string
  serviceType?: ServiceType
}
