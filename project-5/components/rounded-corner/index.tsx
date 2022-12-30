import { motion } from 'framer-motion'

export default function RoundedCorner({
  waveBackground,
  children,
}: {
  waveBackground: boolean
  children: React.ReactNode
}) {
  return (
    <div className="w-full h-full p-3 bg-primary-200 dark:bg-secondary-300">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className={`relative w-full h-full p-3 rounded-xl ${
          !waveBackground && 'bg-secondary-300 dark:bg-secondary-100'
        }`}
      >
        {children}
      </motion.div>
    </div>
  )
}
