import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Project } from 'common/types'
import { getBlurImageURL, imageLoader } from 'common/utils'
import { withPageTransition } from '~components/layout'
import useI18n from '~hooks/use-i18n'

import { getProjects } from '~sanity/lib/sanity-utils'

const Projects = ({ projects }: { projects: Project[] }) => {
  const { locale } = useRouter()
  const t = useI18n('projects') as Record<string, string>

  return (
    <div className="grid place-content-center h-full p-2">
      <div className="sm:flex sm:pt-0 max-sm:space-y-6 mx-auto w-11/12 gap-6 overflow-scroll hidden-scrollbar">
        {projects.map((project) => {
          return (
            <div
              className="flex flex-col text-primary-zinc dark:text-primary-milk uppercase"
              key={project._id}
            >
              <h2 className="sm:order-1 font-medium text-xl">{project.name}</h2>
              <span className="sm:text-right sm:order-3">
                {t['category']}: {project.category[locale]}
              </span>
              <span className="sm:text-right sm:order-4">
                {t['location']}: {project.location[locale]}
              </span>
              <span className="sm:text-right sm:order-4">
                {t['year']}: {project.year}
              </span>
              <span className="sm:text-right sm:order-4">
                {t['area']}: {project.area} sqm
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
                  height="400"
                  alt="Project picture"
                  className="w-full sm:grayscale hover:grayscale-0 hover:scale-105 transition-all duration-500"
                  placeholder="blur"
                  blurDataURL={getBlurImageURL(`${project.slug}.jpg`)}
                />
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default withPageTransition(Projects)

export async function getStaticProps() {
  const projects = await getProjects()
  return { props: { projects } }
}
