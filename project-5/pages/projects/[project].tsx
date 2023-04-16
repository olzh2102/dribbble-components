import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { imageLoader } from 'common/utils'
import { ScrollWrapper, withPageTransition } from '~components/layout'

import { PROJECTS } from '.'

const Project = () => {
  const project = useRouter().query.project as string

  return (
    <ScrollWrapper direction="horizontal">
      <PageOne project={project} />
      <PageTwo />
      <PageThree project={project} />
      <PageFour restProjects={PROJECTS.filter((p) => p !== project)} />
    </ScrollWrapper>
  )
}

export default withPageTransition(Project)

function PageOne({ project }: { project: string }) {
  return (
    <div
      data-test-id="hs-item"
      className="flex flex-[0_0_100%] flex-col md:flex-row text-primary-zinc dark:text-primary-milk"
    >
      <div className="w-5/12 text-4xl uppercase ml-10 my-auto">
        <h1 className="italic">{project}</h1>
        <span>58 SQM.</span>
      </div>
      <div className="md:w-2/12 flex flex-col mt-5">
        <span>Design Style: Bohemian</span>
        <span>Location: Minsk, Belarus</span>
        <span>Year: 2019</span>
      </div>
      <Image
        loader={imageLoader}
        src={`${project}.jpg`}
        width="1000"
        height="2000"
        alt="Profile picture"
        className="md:w-5/12 md:rounded-r rounded-t md:rounded-tl-none object-cover object-left"
      />
    </div>
  )
}

function PageTwo() {
  return (
    <div className="flex flex-[0_0_100%] text-primary-zinc dark:text-primary-milk">
      <Image
        loader={imageLoader}
        src={`project-2.jpg`}
        width="1000"
        height="2000"
        alt="Profile picture"
        className="md:w-5/12 md:rounded-r rounded-t md:rounded-tl-none object-cover object-left"
      />
      <div className="w-full flex flex-col px-2 py-5">
        <div className="flex-1 relative">
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
    </div>
  )
}

function PageThree({ project }: { project: string }) {
  return (
    <div
      data-test-id="hs-item"
      className="flex flex-[0_0_100%] flex-col md:flex-row text-primary-zinc dark:text-primary-milk"
    >
      <div className="w-5/12 text-4xl uppercase ml-10 my-auto relative">
        <h2 className="italic">Creating a Haven: The Art of Interior Design</h2>
        <Image
          loader={imageLoader}
          src={`project-4.jpg`}
          width="200"
          height="200"
          alt="Profile picture"
          className="rounded absolute top-32 left-1/2"
        />
      </div>
      <div className="md:w-2/12 flex flex-col mt-5">
        <span>Design Style: Bohemian</span>
        <span>Location: Minsk, Belarus</span>
        <span>Year: 2019</span>
      </div>
      <Image
        loader={imageLoader}
        src={`${project}.jpg`}
        width="1000"
        height="2000"
        alt="Profile picture"
        className="md:w-5/12 md:rounded-r rounded-t md:rounded-tl-none object-cover object-left"
      />
    </div>
  )
}

function PageFour({ restProjects }: { restProjects: string[] }) {
  return (
    <div className="flex justify-between flex-[0_0_100%] text-primary-zinc dark:text-primary-milk">
      <Image
        loader={imageLoader}
        src={`profile.jpg`}
        width="1000"
        height="2000"
        alt="Profile picture"
        className="md:w-6/12 md:rounded-r rounded-t md:rounded-tl-none object-cover object-left"
      />
      <div className="my-auto flex flex-col gap-2 mr-2 font-medium">
        {restProjects.map((project) => (
          <Link href={project} key={project} className="flex items-center gap-2">
            <div className="text-right">
              <h3 className="capitalized">{project}</h3>
              <span>Some description</span>
            </div>
            <Image
              loader={imageLoader}
              src={`${project}.jpg`}
              width="150"
              height="100"
              alt="Profile picture"
              className="rounded grayscale hover:grayscale-0"
            />
          </Link>
        ))}
      </div>
    </div>
  )
}
