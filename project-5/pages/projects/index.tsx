import Image from 'next/image'

import { motion } from 'framer-motion'

import withLayout from '~components/layout/with-layout'

import LogoIcon from '../../public/nr-logo.svg'

const Projects = () => (
  <div className="flex flex-col h-full p-2">
    <Image src={LogoIcon} width={40} alt="logo" className="absolute mix-blend-difference" />
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
