import React from 'react'

import { motion } from 'framer-motion'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 30,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  )
}
