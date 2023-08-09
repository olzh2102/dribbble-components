import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { motion } from 'framer-motion'

import { Project } from 'common/types'
import { getBlurImageURL, imageLoader } from 'common/utils'
import useInScroll from '~hooks/use-in-scroll'

export default function PageLast({ projects, images }: { images: string[]; projects: Project[] }) {
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
      {images.length > 1 ? (
        <>
          <div className="relative h-[500px] w-4/12 m-auto">
            <Image
              loader={imageLoader}
              src={images[0]}
              fill={true}
              alt="Profile picture"
              className="object-cover"
              placeholder="blur"
              blurDataURL={getBlurImageURL(images[0])}
            />
          </div>
          <div className="relative h-[500px] w-4/12 m-auto">
            <Image
              loader={imageLoader}
              src={images[1]}
              fill={true}
              alt="Profile picture"
              className="object-cover"
              placeholder="blur"
              blurDataURL={getBlurImageURL(images[0])}
            />
          </div>
        </>
      ) : (
        <Image
          loader={imageLoader}
          src={images[0]}
          width="1000"
          height="2000"
          alt="Profile picture"
          className="sm:w-7/12 object-cover"
          placeholder="blur"
          blurDataURL={getBlurImageURL(images[0])}
        />
      )}

      <h3 className="sm:hidden text-center text-2xl italic uppercase mt-10 mb-1">projects</h3>

      <div className="flex sm:flex-col flex-wrap my-auto items-end gap-2 sm:mr-5 font-medium uppercase">
        {restProjects.map((project) => (
          <Link
            href={project.slug}
            key={project._id}
            className="flex flex-grow flex-shrink items-start max-sm:w-1/3 gap-2"
          >
            <h3 className="max-sm:hidden text-right capitalized">{project.name}</h3>
            <Image
              loader={imageLoader}
              src={`${project.slug}.jpg`}
              width="200"
              height="100"
              alt="Profile picture"
              className="max-sm:w-full max-sm:h-80 rounded sm:grayscale hover:grayscale-0 object-cover object-bottom"
              placeholder="blur"
              blurDataURL={getBlurImageURL(images[0])}
            />
          </Link>
        ))}
      </div>
    </motion.div>
  )
}
