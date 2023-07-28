import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import lang from 'common/lang.json'
import { Project } from 'common/types'
import { imageLoader } from 'common/utils'
import { withPageTransition } from '~components/layout'

import { getProjects } from '~sanity/lib/sanity-utils'

const Projects = ({ projects }: { projects: Project[] }) => {
  const { locale } = useRouter()
  const t = lang[locale]

  return (
    <div className="flex flex-col h-full p-2">
      <div className="sm:flex sm:pt-0 max-sm:space-y-6 my-auto justify-center items-start gap-6 overflow-scroll hidden-scrollbar">
        {projects.map((project) => (
          <div
            className="flex flex-col text-primary-zinc dark:text-primary-milk uppercase"
            key={project._id}
          >
            <h2 className="sm:order-1 font-semibold">{project.name}</h2>
            <span className="text-sm sm:text-right sm:order-3">
              {t['projects']['category']}: {project.category[locale]}
            </span>
            <span className="text-sm sm:text-right sm:order-4">
              {t['projects']['location']}: {project.location[locale]}
            </span>
            <span className="text-sm sm:text-right sm:order-4">
              {t['projects']['year']}: {project.year}
            </span>
            <span className="text-sm sm:text-right sm:order-4">
              {t['projects']['area']}: {project.area} sqm
            </span>

            <Link
              href={`/projects/${project.slug}`}
              className="rounded overflow-hidden sm:order-2 my-2"
              key={project._id}
            >
              <Image
                key={project._id}
                loader={imageLoader}
                src={`${project.slug}.jpg`}
                width="280"
                height="700"
                alt="Project picture"
                className="w-full sm:grayscale hover:grayscale-0 hover:scale-105 transition-all duration-500"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default withPageTransition(Projects)

export async function getStaticProps() {
  const projects = await getProjects()
  return { props: { projects } }
}
