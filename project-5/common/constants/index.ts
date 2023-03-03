import { Lang } from 'common/types'

export const LANG: Record<Lang, Lang> = {
  en: 'en',
  de: 'de',
  ru: 'ru',
}

export const LOGO_SUBTITLE = 'interiors'

export const ROUTES = ['/', '/projects', '/about', '/services', '/contact'] as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}
