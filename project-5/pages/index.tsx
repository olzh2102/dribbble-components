import withLayout from 'common/components/layout/with-layout'
import { Page } from 'common/types'
import { motion } from 'framer-motion'

const Home: Page = withLayout(() => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
      className={`
        h-full 
        grid place-content-center 
        text-8xl font-medium 
        text-secondary-400 dark:text-secondary-300 
        mix-blend-difference 
        pointer-events-none
      `}
    >
      NR
    </motion.div>
  )
})

export default Home

Home.waveBackground = true
