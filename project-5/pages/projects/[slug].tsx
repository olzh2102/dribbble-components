import { useContext } from 'react'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { motion } from 'framer-motion'

import { PROJECTS } from 'common/constants'
import { imageLoader } from 'common/utils'
import { ScrollWrapper, withPageTransition } from '~components/layout'
import { CursorContext } from '~contexts/cursor-provider'
import useInScroll from '~hooks/use-in-scroll'
import useResponsive from '~hooks/use-responsive'

import { client } from '~sanity/lib/client'

const Project = withPageTransition(({ project }: { project: any }) => {
  const { locale } = useRouter()
  console.log('🚀 ~ file: [project].tsx:19 ~ Project ~ project:', project)
  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  const isMobile = useResponsive('sm')

  // if (!PROJECTS.includes(project))
  //   return (
  //     <div className="grid place-content-center w-full h-full">
  //       <h1>Unfortunately there isn&apos;t such a project.</h1>
  //       <Link
  //         href="/projects"
  //         onMouseOver={onMouseOver('a')}
  //         onMouseOut={onMouseOut}
  //         className="uppercase font-medium text-action-peach dark:text-action-gold text-lg"
  //       >
  //         Available projects
  //       </Link>
  //     </div>
  //   )

  return (
    <ScrollWrapper direction={isMobile ? 'vertical' : 'horizontal'}>
      <PageOne
        name={project.name}
        area={project.area}
        location={project.location[locale]}
        year={project.year}
      />
      <PageTwo />
      <PageThree />
      <PageFour />
    </ScrollWrapper>
  )
})

export default Project

Project.hasLogo = false

export async function getStaticPaths() {
  const paths = await client.fetch(`*[_type == "project" && defined(slug.current)][].slug.current`)
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}

export async function getStaticProps(ctx: any) {
  const { slug = '' } = ctx.params
  const project = await client.fetch(`*[_type == "project" && defined(slug.current == $slug)][0]`, {
    slug,
  })
  return {
    props: { project },
  }
}

function PageOne({
  name,
  area,
  location,
  year,
}: {
  name: string
  area: number
  location: string
  year: number
}) {
  return (
    <div
      data-test-id="hs-item"
      className="flex flex-[0_0_100%] flex-col md:flex-row text-primary-zinc dark:text-primary-milk"
    >
      <div className="w-5/12 sm:text-4xl max-sm:font-medium text-xl uppercase sm:ml-10 max-sm:mt-12 my-auto p-2">
        <h1 className="italic">{name}</h1>
        <span>{area} SQM.</span>
      </div>
      <div className="md:w-2/12 flex flex-col sm:mt-5 p-2">
        <span>Design Style: Bohemian</span>
        <span>Location: {location}</span>
        <span>Year: {year}</span>
      </div>
      <Image
        loader={imageLoader}
        src={`project-1.jpg`}
        width="1000"
        height="2000"
        alt="Profile picture"
        className="md:w-5/12 object-cover object-left"
      />
    </div>
  )
}

function PageTwo() {
  const { ref, animate, variants } = useInScroll()

  return (
    <motion.div
      ref={ref}
      animate={animate}
      variants={variants}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="sm:flex flex-[0_0_100%] text-primary-zinc dark:text-primary-milk"
    >
      <div className="w-full flex flex-col px-2 py-5 sm:order-2">
        <div className="hidden sm:block flex-1 relative">
          <Image
            loader={imageLoader}
            src={`project-3.jpg`}
            width="300"
            height="200"
            alt="Profile picture"
            className="rounded absolute top-40 right-40"
          />
        </div>
        <div>
          <h2 className="text-5xl uppercase font-semibold italic">Living Room</h2>
          <p className="text-lg">
            Living room design refers to the arrangement and styling of furniture, decor, lighting,
            and other elements in a space typically used for socializing, relaxation, and
            entertainment.
          </p>
        </div>
      </div>
      <Image
        loader={imageLoader}
        src={`project-2.jpg`}
        width="1000"
        height="2000"
        alt="Profile picture"
        className="md:w-5/12 object-cover object-left sm:order-1"
      />
    </motion.div>
  )
}

function PageThree() {
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
      <div className="w-full sm:w-5/12 text-xl sm:text-4xl uppercase sm:ml-10 my-auto relative flex sm:block items-center justify-around">
        <h2 className="w-1/2 italic">Creating a Haven: The Art of Interior Design</h2>
        <Image
          loader={imageLoader}
          src={`project-4.jpg`}
          width="200"
          height="200"
          alt="Profile picture"
          className="w-36 sm:w-52 rounded sm:absolute top-10 sm:top-32 left-full sm:left-1/2"
        />
      </div>
      <div className="md:w-2/12 flex flex-col mt-5">
        <span>Design Style: Bohemian</span>
        <span>Location: Minsk, Belarus</span>
        <span>Year: 2019</span>
      </div>
      <Image
        loader={imageLoader}
        src={`project-1.jpg`}
        width="1000"
        height="2000"
        alt="Profile picture"
        className="md:w-5/12 object-cover object-left"
      />
    </motion.div>
  )
}

function PageFour() {
  const { project } = useRouter().query
  const restProjects = PROJECTS.filter((p) => p !== project)
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
        src={`profile.jpg`}
        width="1000"
        height="2000"
        alt="Profile picture"
        className="md:w-6/12 object-cover object-left"
      />

      <h3 className="sm:hidden text-center text-2xl italic uppercase mt-20">projects</h3>

      <div className="flex flex-wrap my-auto sm:flex-col gap-2 sm:mr-5 font-medium uppercase">
        {restProjects.map((project) => (
          <Link
            href={project}
            key={project}
            className="flex flex-grow flex-shrink items-start max-sm:w-1/3 gap-2"
          >
            <div className="max-sm:hidden text-right">
              <h3 className="capitalized">{project}</h3>
              <span>Some description</span>
            </div>
            <Image
              loader={imageLoader}
              src={`${project}.jpg`}
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
