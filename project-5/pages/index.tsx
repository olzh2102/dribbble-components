import Image from 'next/image'

import { motion } from 'framer-motion'

import { LOGO_SUBTITLE } from 'common/constants'
import { Page } from 'common/types'
import withLayout from '~components/layout/with-layout'
import Marquee from '~components/marquee'

const Home: Page = withLayout(() => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
    >
      <div
        className={`
          absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          mix-blend-difference pointer-events-none
        `}
      >
        <Image className="mb-2" src="/nr-logo.svg" width={170} height={150} alt="logo" />
        <div className="flex justify-between text-secondary-300 font-semibold uppercase text-base">
          {LOGO_SUBTITLE.split('').map((l, i) => (
            <span key={`${i}-${l}`}>{l}</span>
          ))}
        </div>
      </div>

      {/* <Marquee>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
                    <Image
                      key={i}
                      src="https://picsum.photos/250/150"
                      alt="Picture of project"
                      width={250}
                      height={150}
                      className={`
                        grayscale hover:grayscale-0
                        text-xs
                        border-solid border-neutral-900 rounded
                        mx-0.5
                      `}
                    />
                  ))}
                </Marquee> */}
    </motion.div>
  )
})

export default Home

Home.waveBackground = true
