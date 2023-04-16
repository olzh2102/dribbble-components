import Image from 'next/image'
import Link from 'next/link'

import { imageLoader } from 'common/utils'
import { withPageTransition } from '~components/layout'

export const PROJECTS = ['project-1', 'project-2', 'project-3', 'project-4']

const Projects = () => {
  return (
    <div className="flex flex-col h-full p-2">
      <Image
        src="/nr-logo.svg"
        width="40"
        height="40"
        alt="logo"
        className="absolute mix-blend-difference"
      />

      <div className="flex justify-center gap-8 my-auto">
        {PROJECTS.map((project, i) => (
          <Link
            href={`/projects/${project}`}
            className="flex flex-col text-primary-zinc dark:text-primary-milk uppercase"
            key={i}
          >
            <h2>{project}</h2>

            <div className="rounded overflow-hidden">
              <Image
                key={i}
                loader={imageLoader}
                src={`${project}.jpg`}
                width="280"
                height="700"
                alt="Project picture"
                className="grayscale hover:grayscale-0 hover:scale-105 transition-all duration-500"
              />
            </div>

            <span className="text-sm text-right">design style: scandinavian</span>
            <span className="text-sm text-right">square meters: 78 sqm</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default withPageTransition(Projects)
