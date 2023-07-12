import { motion } from 'framer-motion'

export default function RoundedCorner({
  waveBackground,
  children,
}: {
  waveBackground: boolean
  children: React.ReactNode
}) {
  return (
    <div className="w-full h-full p-2 bg-primary-white dark:bg-primary-black">
      <motion.div
        animate={{ opacity: 1 }}
        transition={{ from: 0.5, duration: 1.5, delay: 2.5 }}
        className={`relative w-full h-full rounded-md overflow-hidden max-sm:pt-14 ${
          !waveBackground && 'bg-primary-milk dark:bg-primary-zinc'
        }`}
      >
        {children}
      </motion.div>
    </div>
  )
}
