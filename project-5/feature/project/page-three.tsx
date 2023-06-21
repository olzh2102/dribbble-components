import Image from 'next/image'

import { motion } from 'framer-motion'

import { imageLoader } from 'common/utils'
import useInScroll from '~hooks/use-in-scroll'

export default function PageThree() {
  const { ref, animate, variants } = useInScroll()

  return (
    <motion.div
      ref={ref}
      animate={animate}
      variants={variants}
      transition={{ duration: 1, ease: 'easeOut' }}
      data-test-id="hs-item"
      className="flex flex-[0_0_100%] flex-col md:flex-row text-primary-zinc dark:text-primary-milk"
    >
      <div className="w-full sm:w-5/12 text-xl sm:text-4xl uppercase sm:ml-10 my-auto relative flex sm:block items-center justify-around">
        <h2 className="w-1/2 italic">Creating a Haven: The Art of Interior Design</h2>
        <Image
          loader={imageLoader}
          src={`project-4.jpg`}
          width="200"
          height="200"
          alt="Profile picture"
          className="w-36 sm:w-52 rounded sm:absolute top-10 sm:top-32 left-full sm:left-1/2"
        />
      </div>
      <div className="md:w-2/12 flex flex-col mt-5">
        <span>Design Style: Bohemian</span>
        <span>Location: Minsk, Belarus</span>
        <span>Year: 2019</span>
      </div>
      <Image
        loader={imageLoader}
        src={`project-1.jpg`}
        width="1000"
        height="2000"
        alt="Profile picture"
        className="md:w-5/12 object-cover object-left"
      />
    </motion.div>
  )
}
