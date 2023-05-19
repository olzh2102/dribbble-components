import Image from 'next/image'
import Link from 'next/link'

import { groq } from 'next-sanity'
import { SanityDocument } from 'sanity'

import { PROJECTS } from 'common/constants'
import { imageLoader } from 'common/utils'
import { withPageTransition } from '~components/layout'

import { client } from '../../sanity/lib/client'

const Projects = ({ projects }: { projects: SanityDocument[] }) => {
  // const { title, design, slug } = projects[0] as any
  console.log('🚀 ~ file: index.tsx:12 ~ Projects ~ projects:', projects)

  return (
    <div className="flex flex-col h-full p-2">
      <div className="flex justify-center gap-8 my-auto">
        {/* <Link
          href={`/projects/${slug.current}`}
          className="flex flex-col text-primary-zinc dark:text-primary-milk uppercase"
        >
          <h2>{title}</h2>

          <div className="rounded overflow-hidden">
            <Image
              loader={imageLoader}
              src={`${title}.jpg`}
              width="280"
              height="700"
              alt="Project picture"
              className="grayscale hover:grayscale-0 hover:scale-105 transition-all duration-500"
            />
          </div>

          <span className="text-sm text-right">design style: {design}</span>
          <span className="text-sm text-right">square meters: 78 sqm</span>
        </Link> */}

        {PROJECTS.slice(1).map((project, i) => (
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

            <span className="text-sm text-right">
              design style: scandinavian
            </span>
            <span className="text-sm text-right">square meters: 78 sqm</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default withPageTransition(Projects)

const query = groq`*[_type == 'projects' && defined(slug.current)]`
export async function getStaticProps() {
  const projects = await client.fetch(query)
  return { props: { projects } }
}
