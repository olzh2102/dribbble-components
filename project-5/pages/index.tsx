import Image from 'next/image'

import { motion } from 'framer-motion'

import { LOGO_SUBTITLE } from 'common/constants'
import { withPageTransition } from '~components/layout'

const Home = withPageTransition(() => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5, delay: 0.5 }}
    className="h-full w-full grid place-content-center pt-1"
  >
    <div className="mix-blend-difference pointer-events-none text-primary-milk font-medium">
      <Image className="mb-3" src="/nr-logo.svg" width="190" height="170" alt="logo" />

      <div className="text-logo flex justify-between">
        {LOGO_SUBTITLE.split('').map((letter, i) => (
          <span key={`${i}-${letter}`}>{letter}</span>
        ))}
      </div>
    </div>
  </motion.div>
))

export default Home

Home.waveBackground = true
Home.hasLogo = false
