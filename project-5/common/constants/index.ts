export const LOGO_SUBTITLE = 'interiors'

export const ROUTES = [
  '/',
  '/projects',
  '/about',
  '/services',
  '/contact',
] as const

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

export const SERVICE_TYPES = ['design', 'branding', 'consulting'] as const

export const MOBILE_HEADER_VARIANTS = {
  open: {
    clipPath: 'circle(5000px at 100vw 0)',
    transition: {
      type: 'spring',
      stiffness: 20,
      damping: 20,
    },
  },
  closed: {
    clipPath: 'circle(1px at 100vw 0)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 60,
    },
  },
}

export const PROJECTS = ['project-1', 'project-2', 'project-3', 'project-4']
