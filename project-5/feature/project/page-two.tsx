import Image from 'next/image'

import { motion } from 'framer-motion'

import { getBlurImageURL, imageLoader } from 'common/utils'
import useInScroll from '~hooks/use-in-scroll'

export default function PageTwo({ images }: { images: string[] }) {
  const { ref, animate, variants } = useInScroll()

  return (
    <motion.div
      ref={ref}
      animate={animate}
      variants={variants}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="sm:flex flex-[0_0_100%] text-primary-zinc dark:text-primary-milk max-sm:space-y-4"
    >
      <Image
        loader={imageLoader}
        src={images[0]}
        placeholder="blur"
        blurDataURL={getBlurImageURL(images[0])}
        width="1000"
        height="2000"
        alt="Profile picture"
        className="sm:w-4/12 object-cover"
      />
      {/* empty div to give some space between two images */}
      <div className="max-sm:hidden sm:w-1/12" />
      <div className="relative sm:w-6/12 grid place-content-center h-[500px] my-auto">
        <Image
          loader={imageLoader}
          src={images[1]}
          placeholder="blur"
          blurDataURL={getBlurImageURL(images[1])}
          fill={true}
          alt="Profile picture"
          className="rounded object-cover"
        />
      </div>
    </motion.div>
  )
}
