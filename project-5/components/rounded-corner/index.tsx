import { motion } from 'framer-motion'

export default function RoundedCorner({
  waveBackground,
  children,
}: {
  waveBackground: boolean
  children: React.ReactNode
}) {
  return (
    <div className="w-full h-full p-2 bg-secondary-300 dark:bg-primary-200">
      <motion.div
        animate={{ opacity: 1 }}
        transition={{ from: 0.5, duration: 1.5, delay: 2.5 }}
        className={`relative w-full h-full rounded-md ${
          !waveBackground && 'bg-primary-850 dark:bg-secondary-100'
        }`}
      >
        {children}
      </motion.div>
    </div>
  )
}
