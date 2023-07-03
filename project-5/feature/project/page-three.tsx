import Image from 'next/image'

import { motion } from 'framer-motion'

import { imageLoader } from 'common/utils'
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
      className="flex flex-[0_0_100%] flex-col md:flex-row text-primary-zinc dark:text-primary-milk"
    >
      <div className="w-4/12 grid place-content-center">
        <Image
          loader={imageLoader}
          src={images[0]}
          width="250"
          height="350"
          alt="Profile picture"
          className="rounded object-cover"
        />
      </div>
      <Image
        loader={imageLoader}
        src={images[1]}
        width="1000"
        height="2000"
        alt="Profile picture"
        className="w-8/12 object-cover object-left"
      />
    </motion.div>
  )
}
