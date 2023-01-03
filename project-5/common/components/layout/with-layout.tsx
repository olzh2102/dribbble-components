import { motion } from 'framer-motion'
import { AppProps } from 'next/app'

import { Page } from 'common/types'

export default function withLayout(Component: any): Page {
  const displayName = Component.displayName || 'Component'

  const ComponentWithPageTransition = (props: AppProps) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 30,
        damping: 20,
      }}
    >
      <Component {...props} />
    </motion.div>
  )

  ComponentWithPageTransition.displayName = `withLayout(${displayName})`

  return ComponentWithPageTransition as any
}
