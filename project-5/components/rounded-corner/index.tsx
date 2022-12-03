import { motion } from 'framer-motion'

export default function RoundedCorner({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full h-full p-3 bg-[#1b1b1e] dark:bg-white pointer-events-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative w-full h-full p-3 rounded-xl bg-transparent"
      >
        {children}
      </motion.div>
    </div>
  )
}
