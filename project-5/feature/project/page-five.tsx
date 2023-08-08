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
      className="flex sm:flex-row flex-col justify-between flex-[0_0_100%] text-primary-zinc dark:text-primary-milk max-sm:space-y-4"
    >
      <div className="relative h-[500px] m-auto sm:w-6/12 rounded">
        <Image
          loader={imageLoader}
          src={images[0]}
          fill={true}
          alt="Profile picture"
          className="object-cover"
        />
      </div>

      <Image
        loader={imageLoader}
        src={images[1]}
        width="1000"
        height="2000"
        alt="Profile picture"
        className="sm:w-4/12 object-cover"
      />
    </motion.div>
  )
}
