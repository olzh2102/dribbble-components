import withLayout from 'common/components/layout/with-layout'
import { Page } from 'common/types'
import { motion } from 'framer-motion'
import Image from 'next/image'

const Home: Page = withLayout(() => {
  const mockProjects = [1, 2, 3, 4, 5]

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
      <span>NR</span>
      <span className="text-base text-center tracking-[.33rem]">interiors</span>
      <div className="mb-2 mx-2 relative flex overflow-x-hidden">
        <div className="py-12 flex animate-marquee">
          {mockProjects.map((_, i) => (
            <Image
              key={i}
              className="text-xs border-solid border-2 border-neutral-900 rounded mx-4"
              src="https://via.placeholder.com/200x150"
              alt="Picture of project"
              width={250}
              height={170}
            />
          ))}
        </div>
        <div className="absolute flex top-0 py-12 animate-marquee2">
          {mockProjects.map((_, i) => (
            <Image
              key={i}
              className="text-xs border-solid border-2 border-neutral-900 rounded mx-4"
              src="https://via.placeholder.com/200x150"
              alt="Picture of project"
              width={250}
              height={170}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
})

export default Home

Home.waveBackground = true
