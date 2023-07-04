import Image from 'next/image'

import { motion } from 'framer-motion'

import { imageLoader } from 'common/utils'
import useInScroll from '~hooks/use-in-scroll'

export default function PageFive({ images }: { images: string[] }) {
  const { ref, animate, variants } = useInScroll()

  return (
    <motion.div
      ref={ref}
      animate={animate}
      variants={variants}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="flex sm:flex-row flex-col justify-between flex-[0_0_100%] text-primary-zinc dark:text-primary-milk"
    >
      <div className="w-1/4 grid place-content-center">
        <Image
          loader={imageLoader}
          src={images[0]}
          width="300"
          height="500"
          alt="Profile picture"
          className="object-cover"
        />
      </div>
      <div className="w-3/4 grid place-content-center">
        <Image
          loader={imageLoader}
          src={images[1]}
          width="500"
          height="300"
          alt="Profile picture"
          className="w-3/4 object-cover mx-auto"
        />
      </div>
    </motion.div>
  )
}
