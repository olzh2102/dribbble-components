import { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

export default function Preloader({ duration }: { duration: number }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => setLoading(false), duration)
  }, [duration])

  if (!loading) return null

  return (
    <div
      data-testid="preloader"
      className={`
      h-full z-50 
      relative text-2xl 
      bg-primary-white dark:bg-primary-black 
      text-primary-zinc dark:text-primary-milk
    `}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration / 1000 }}
        className="absolute h-full w-full grid place-content-center"
      >
        <h1>Natallia Raksha</h1>
      </motion.div>
      <motion.div
        className="h-full bg-primary-milk dark:bg-primary-zinc"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: duration / 1000 }}
      />
    </div>
  )
}
