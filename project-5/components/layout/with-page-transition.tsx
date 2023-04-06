import { AppProps } from 'next/app'

import { motion } from 'framer-motion'

import { Page } from 'common/types'

export default function withPageTransition(Component: any): Page {
  const displayName = Component.displayName || 'Component'

  const ComponentWithPageTransition = (props: AppProps) => (
    <motion.div
      className="h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 100,
        damping: 20,
      }}
    >
      <Component {...props} />
    </motion.div>
  )

  ComponentWithPageTransition.displayName = `withPageTransition(${displayName})`

  return ComponentWithPageTransition as any
}