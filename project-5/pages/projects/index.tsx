import Image from 'next/image'
import Link from 'next/link'

import { groq } from 'next-sanity'

import { PROJECTS } from 'common/constants'
import { imageLoader } from 'common/utils'
import { withPageTransition } from '~components/layout'

import { client } from '../../sanity/lib/client'

const Projects = () => {
  return (
    <div className="flex flex-col h-full p-2">
      <div className="sm:flex sm:pt-0 space-y-6 pt-16 my-auto justify-center items-start gap-8 overflow-scroll hidden-scrollbar">
        {PROJECTS.map((project, i) => (
          <Link
            href={`/projects/${project}`}
            className="flex flex-col gap-2 text-primary-zinc dark:text-primary-milk uppercase"
            key={i}
          >
            <h2 className="sm:order-1 font-medium sm:font-normal">{project}</h2>

            <span className="text-sm sm:text-right sm:order-3">design style: scandinavian</span>
            <span className="text-sm sm:text-right sm:order-4">square meters: 78 sqm</span>

            <div className="rounded overflow-hidden sm:order-2">
              <Image
                key={i}
                loader={imageLoader}
                src={`${project}.jpg`}
                width="280"
                height="700"
                alt="Project picture"
                className="w-full sm:grayscale hover:grayscale-0 hover:scale-105 transition-all duration-500"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default withPageTransition(Projects)

const query = groq`*`
export async function getStaticProps() {
  const data = await client.fetch(query)
  return { props: { data } }
}
