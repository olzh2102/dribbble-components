import Image from 'next/image'

import { motion } from 'framer-motion'

import { imageLoader } from 'common/utils'
import useInScroll from '~hooks/use-in-scroll'

export default function PageFour({ images }: { images: string[] }) {
  const { ref, animate, variants } = useInScroll()

  return (
    <motion.div
      ref={ref}
      animate={animate}
      variants={variants}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="flex sm:flex-row flex-col justify-between flex-[0_0_100%] text-primary-zinc dark:text-primary-milk max-sm:space-y-4"
    >
      <div className="sm:w-1/3 grid place-content-center">
        <Image
          loader={imageLoader}
          src={images[0]}
          width="250"
          height="350"
          alt="Profile picture"
          className="object-cover max-sm:w-full"
        />
      </div>
      <Image
        loader={imageLoader}
        src={images[1]}
        width="300"
        height="500"
        alt="Profile picture"
        className="sm:w-1/3 object-cover max-sm:w-full"
      />
      <div className="sm:w-1/3 grid place-content-center">
        <Image
          loader={imageLoader}
          src={images[2]}
          width="250"
          height="350"
          alt="Profile picture"
          className="object-cover max-sm:w-full"
        />
      </div>
    </motion.div>
  )
}
