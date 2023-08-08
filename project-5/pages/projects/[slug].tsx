import { useContext } from 'react'

import { GetStaticPropsContext } from 'next'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Project as TProject } from 'common/types'
import { take } from 'common/utils'
import { ScrollWrapper, withPageTransition } from '~components/layout'
import { CursorContext } from '~contexts/cursor-provider'
import useResponsive from '~hooks/use-responsive'

import PageFive from '~feature/project/page-five'
import PageFour from '~feature/project/page-four'
import PageLast from '~feature/project/page-last'
import PageOne from '~feature/project/page-one'
import PageThree from '~feature/project/page-three'
import PageTwo from '~feature/project/page-two'
import { client } from '~sanity/lib/client'
import { getProjects } from '~sanity/lib/sanity-utils'

const Project = withPageTransition(
  ({ project, projects }: { project?: TProject; projects: TProject[] }) => {
    const { locale } = useRouter()
    const { onMouseOver, onMouseOut } = useContext(CursorContext)

    const isMobile = useResponsive('sm')

    if (!project)
      return (
        <div className="grid place-content-center w-full h-full">
          <h1>Unfortunately there isn&apos;t such a project.</h1>
          <Link
            href="/projects"
            onMouseOver={onMouseOver('a')}
            onMouseOut={onMouseOut}
            className="uppercase font-medium text-action-peach dark:text-action-gold text-lg"
          >
            Available projects
          </Link>
        </div>
      )

    const range = take(project.images)

    return (
      <ScrollWrapper direction={isMobile ? 'vertical' : 'horizontal'}>
        <PageOne
          name={project.name}
          area={project.area}
          location={project.location[locale]}
          year={project.year}
          category={project.category}
          description={project.description}
          photo={project.photo}
          imageSrc={project.images[0]}
          studio={project.studio}
          design={project.design}
        />
        <PageTwo images={range(1, 2)} />
        <PageThree images={range(3, 5)} />
        <PageFour images={range(5, 7)} />
        <PageFive images={range(8, 9)} />
        {project.slug === 'moby-dick' && <PageTwo images={range(10, 11)} />}
        <PageLast
          images={project.slug === 'moby-dick' ? range(12, 13) : range(10)}
          projects={projects}
        />
      </ScrollWrapper>
    )
  }
)

export default Project

Project.hasLogo = false

export async function getStaticPaths() {
  const paths = await client.fetch(`*[_type == "project" && defined(slug.current)][].slug.current`)

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  }
}

export async function getStaticProps(ctx: GetStaticPropsContext) {
  if (!ctx.params) return

  const projects = await getProjects()
  const { slug = '' } = ctx.params
  const project = await client.fetch(`*[_type == "project" && slug.current == '${slug}'][0]`, {
    slug,
  })

  return {
    props: { project: { ...project, slug: project.slug.current }, projects },
  }
}
