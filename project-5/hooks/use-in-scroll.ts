import { useRef } from 'react'

import { useInView } from 'framer-motion'

export default function useInScroll() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })

  return {
    ref,
    animate: inView ? 'visible' : 'hidden',
    variants: {
      visible: { opacity: 1, scale: 1, y: 0 },
      hidden: {
        opacity: 0,
        scale: 0.65,
        y: 50,
      },
    },
  }
}
