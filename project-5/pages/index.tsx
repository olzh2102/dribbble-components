import Image from 'next/image'

import { motion } from 'framer-motion'

import withLayout from 'common/components/layout/with-layout'
import Marquee from 'common/components/marquee'
import { Page } from 'common/types'

import LogoIcon from '../public/NR.svg'

const Home: Page = withLayout(() => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5, delay: 0.5 }}
      className="h-full flex flex-col"
    >
      <div className="flex-auto grid place-content-center mix-blend-difference pointer-events-none">
        <Image src={LogoIcon} width={200} alt="logo" />
        <div className="flex justify-between">
          {'interiors'.split('').map((l, i) => (
            <span key={`${i}-${l}`} className="text-base text-center font-semibold uppercase">
              {l}
            </span>
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
