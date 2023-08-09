import Image from 'next/image'

import { motion } from 'framer-motion'

import { getBlurImageURL, imageLoader } from 'common/utils'
import useInScroll from '~hooks/use-in-scroll'

export default function PageThree({ images }: { images: string[] }) {
  const { ref, animate, variants } = useInScroll()

  return (
    <motion.div
      ref={ref}
      animate={animate}
      variants={variants}
      transition={{ duration: 1, ease: 'easeOut' }}
      data-test-id="hs-item"
      className="flex justify-between flex-[0_0_100%] flex-col md:flex-row text-primary-zinc dark:text-primary-milk max-sm:space-y-4"
    >
      <div className="relative h-[500px] my-auto sm:w-3/12 grid place-content-center">
        <Image
          loader={imageLoader}
          src={images[0]}
          fill={true}
          alt="Profile picture"
          className="rounded object-cover"
          placeholder="blur"
          blurDataURL={getBlurImageURL(images[0])}
        />
      </div>
      <Image
        loader={imageLoader}
        src={images[1]}
        width="1000"
        height="2000"
        alt="Profile picture"
        className="sm:w-8/12 object-cover"
        placeholder="blur"
        blurDataURL={getBlurImageURL(images[1])}
      />
    </motion.div>
  )
}
