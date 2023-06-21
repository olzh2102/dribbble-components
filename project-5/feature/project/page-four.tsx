import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { motion } from 'framer-motion'

import { Project } from 'common/types'
import { imageLoader } from 'common/utils'
import useInScroll from '~hooks/use-in-scroll'

export default function PageFour({
  projects,
  imageSrc,
}: {
  imageSrc: string
  projects: Project[]
}) {
  const { slug } = useRouter().query
  const restProjects = projects.filter((p) => p.slug !== slug)
  const { ref, animate, variants } = useInScroll()

  return (
    <motion.div
      ref={ref}
      animate={animate}
      variants={variants}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="flex sm:flex-row flex-col justify-between flex-[0_0_100%] text-primary-zinc dark:text-primary-milk"
    >
      <Image
        loader={imageLoader}
        src={imageSrc}
        width="1000"
        height="2000"
        alt="Profile picture"
        className="md:w-6/12 object-cover object-left"
      />

      <h3 className="sm:hidden text-center text-2xl italic uppercase mt-20">projects</h3>

      <div className="flex flex-wrap my-auto sm:flex-col gap-2 sm:mr-5 font-medium uppercase">
        {restProjects.map((project) => (
          <Link
            href={project.slug}
            key={project._id}
            className="flex flex-grow flex-shrink items-start max-sm:w-1/3 gap-2"
          >
            <div className="max-sm:hidden text-right">
              <h3 className="capitalized">{project.name}</h3>
              <span>Some description</span>
            </div>
            <Image
              loader={imageLoader}
              src={`${project.slug}.jpg`}
              width="200"
              height="100"
              alt="Profile picture"
              className="max-sm:w-full max-sm:h-80 rounded sm:grayscale hover:grayscale-0 object-cover object-bottom"
            />
          </Link>
        ))}
      </div>
    </motion.div>
  )
}
