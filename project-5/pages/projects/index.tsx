import Image from 'next/image'

import { motion } from 'framer-motion'

import withLayout from '~components/layout/with-layout'

const Projects = () => (
  <div className="flex flex-col h-full">
    <Image
      src="/nr-logo.svg"
      width={40}
      height={40}
      alt="logo"
      className="absolute mix-blend-difference m-2"
    />
    <div className="flex justify-center gap-4 my-auto">
      {[1, 2, 3, 4].map((i) => (
        <motion.img
          key={i}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ damping: 50, stiffness: 100 }}
          src="https://picsum.photos/300/500"
          alt="Picture of project"
          className="rounded"
        />
      ))}
    </div>
  </div>
)

export default withLayout(Projects)
