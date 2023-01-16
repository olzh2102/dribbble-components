import { useEffect } from 'react'

import { motion } from 'framer-motion'

export default function Preloader({
  duration,
  setLoading,
}: {
  duration: number
  setLoading: (val: boolean) => void
}) {
  useEffect(() => {
    setTimeout(() => setLoading(false), duration)
  }, [duration, setLoading])

  return (
    <div className="h-full z-10 relative bg-primary-400 dark:bg-secondary-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: duration / 1000 }}
        className="absolute text-neutral-900 dark:text-secondary-500 place-content-center text-2xl h-full w-full grid"
      >
        Natallia Raksha
      </motion.div>
      <motion.div
        className="h-full bg-secondary-300 dark:bg-primary-200"
        initial={{ width: 0 }}
        animate={{ width: '110%' }}
        transition={{ duration: duration / 1000 }}
      />
    </div>
  )
}
