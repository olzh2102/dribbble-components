import { NextPage } from 'next'

import { Locale } from 'next/router'

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

export type Project = {
  _id: string
  name: string
  slug: string
  area: number
  year: number
  location: Record<Locale, string>
  images: string[]
  category: Record<Locale, string>
  description: Record<Locale, string>
  photo: Record<Locale, string>
}
