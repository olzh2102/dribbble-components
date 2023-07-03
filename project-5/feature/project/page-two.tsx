import Image from 'next/image'

import { motion } from 'framer-motion'

import { imageLoader } from 'common/utils'
import useInScroll from '~hooks/use-in-scroll'

export default function PageTwo({ images }: { images: string[] }) {
  const { ref, animate, variants } = useInScroll()

  return (
    <motion.div
      ref={ref}
      animate={animate}
      variants={variants}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="sm:flex flex-[0_0_100%] text-primary-zinc dark:text-primary-milk"
    >
      <Image
        loader={imageLoader}
        src={images[1]}
        width="1000"
        height="2000"
        alt="Profile picture"
        className="w-4/12 object-cover object-left"
      />
      <div className="w-8/12 grid place-content-center">
        <Image
          loader={imageLoader}
          src={images[0]}
          width="700"
          height="500"
          alt="Profile picture"
          className="rounded object-cover"
        />
      </div>
    </motion.div>
  )
}
