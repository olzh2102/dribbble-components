import Image from 'next/image'

import { motion } from 'framer-motion'

import { getBlurImageURL, imageLoader } from 'common/utils'
import useInScroll from '~hooks/use-in-scroll'

export default function PageFour({ images }: { images: string[] }) {
  const { ref, animate, variants } = useInScroll()

  return (
    <motion.div
      ref={ref}
      animate={animate}
      variants={variants}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="flex sm:flex-row flex-col flex-[0_0_100%] text-primary-zinc dark:text-primary-milk max-sm:space-y-4"
    >
      <div className="w-3/12 my-auto">
        <div className="relative h-[500px] sm:w-2/3 mx-auto">
          <Image
            loader={imageLoader}
            src={images[0]}
            placeholder="blur"
            blurDataURL={getBlurImageURL(images[0])}
            fill={true}
            alt="Profile picture"
            className="rounded object-cover max-sm:w-full"
          />
        </div>
      </div>

      <Image
        loader={imageLoader}
        src={images[1]}
        width="300"
        height="500"
        alt="Profile picture"
        className="sm:w-6/12 object-cover max-sm:w-full"
      />

      <div className="w-3/12 my-auto">
        <div className="relative h-[500px] sm:w-2/3 mx-auto">
          <Image
            loader={imageLoader}
            src={images[2]}
            fill={true}
            alt="Profile picture"
            className="rounded object-cover max-sm:w-full"
          />
        </div>
      </div>
    </motion.div>
  )
}
