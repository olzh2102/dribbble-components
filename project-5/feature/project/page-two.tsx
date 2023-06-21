import Image from 'next/image'

import { motion } from 'framer-motion'

import { imageLoader } from 'common/utils'
import useInScroll from '~hooks/use-in-scroll'

export default function PageTwo() {
  const { ref, animate, variants } = useInScroll()

  return (
    <motion.div
      ref={ref}
      animate={animate}
      variants={variants}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="sm:flex flex-[0_0_100%] text-primary-zinc dark:text-primary-milk"
    >
      <div className="w-full flex flex-col px-2 py-5 sm:order-2">
        <div className="hidden sm:block flex-1 relative">
          <Image
            loader={imageLoader}
            src={`project-3.jpg`}
            width="300"
            height="200"
            alt="Profile picture"
            className="rounded absolute top-40 right-40"
          />
        </div>
        <div>
          <h2 className="text-5xl uppercase font-semibold italic">Living Room</h2>
          <p className="text-lg">
            Living room design refers to the arrangement and styling of furniture, decor, lighting,
            and other elements in a space typically used for socializing, relaxation, and
            entertainment.
          </p>
        </div>
      </div>
      <Image
        loader={imageLoader}
        src={`project-2.jpg`}
        width="1000"
        height="2000"
        alt="Profile picture"
        className="md:w-5/12 object-cover object-left sm:order-1"
      />
    </motion.div>
  )
}
