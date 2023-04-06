import Image from 'next/image'

import { motion } from 'framer-motion'

import { LOGO_SUBTITLE } from 'common/constants'
import { withPageTransition } from '~components/layout'

const Home = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5, delay: 0.5 }}
  >
    <div
      className={`
          absolute top-1/2 left-1/2 
          -translate-x-1/2 -translate-y-1/2
          mix-blend-difference 
          pointer-events-none
          text-primary-milk font-medium uppercase
        `}
    >
      <Image className="mb-2" src="/nr-logo.svg" width="170" height="150" alt="logo" />

      <div className="flex justify-between">
        {LOGO_SUBTITLE.split('').map((letter, i) => (
          <span key={`${i}-${letter}`}>{letter}</span>
        ))}
      </div>
    </div>
  </motion.div>
)

export default withPageTransition(Home)

Home.waveBackground = true
