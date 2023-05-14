import React from 'react'

import Image from 'next/image'

import { imageLoader } from 'common/utils'
import { ScrollWrapper, withPageTransition } from '~components/layout'
import useResponsive from '~hooks/use-responsive'

const EXPERIENCES = [
  {
    title: 'Team Lead',
    timeStart: '2018',
    timeEnd: '2020',
    description: `As a team lead interior designer,
      the individual would be responsible for managing and leading a team
      of interior designers to ensure successful completion of projects.
      This would involve assigning tasks, setting deadlines,
      and overseeing the work of team members to ensure that design plans meet
      client requirements and are executed to a high standard.`,
  },
  {
    title: 'Senior Interior Designer',
    timeStart: '2015',
    timeEnd: '2018',
    description: `the individual would have extensive experience in the field and would be responsible 
      for overseeing and executing interior design projects from start to finish. This would
      involve collaborating with clients to understand their needs and preferences, developing
      design concepts and plans, creating 3D visualizations and sketches, selecting materials and
      finishes, and overseeing the implementation of the design plan.`,
  },
]

const About = () => {
  const isMobile = useResponsive('sm')

  return (
    <ScrollWrapper direction={isMobile ? 'vertical' : 'horizontal'}>
      <div
        data-test-id="hs-item"
        className="flex flex-[0_0_100%] flex-col md:flex-row text-primary-zinc dark:text-primary-milk"
      >
        <Image
          loader={imageLoader}
          src="profile.jpg"
          width="1000"
          height="2000"
          alt="Profile picture"
          className="md:w-2/5 md:mt-14 grayscale rounded-tr object-cover"
        />
        {isMobile ? (
          <div className="md:w-2/3 text-3xl p-2 uppercase font-medium">
            <h2>Designer</h2>
            <h3>Natallia Raksha</h3>
          </div>
        ) : (
          <div className="w-3/5 mt-auto mb-0 text-4xl p-10">
            <h2>Interior and Concept Designer</h2>
            <h3>Natallia Raksha</h3>
            <p className="text-base mt-3">
              Interior designers are professionals who design and create functional and
              aesthetically pleasing spaces for residential or commercial clients. They typically
              work closely with clients to understand their needs and preferences, and then develop
              design plans that meet those requirements.
            </p>
          </div>
        )}
      </div>

      <div
        data-cy="about-experience"
        className="flex flex-[0_0_100%] text-primary-zinc dark:text-primary-milk"
      >
        <div className="flex m-auto p-2 gap-10 w-1/2">
          {EXPERIENCES.map((exp) => (
            <div key={exp.title} className="space-y-3">
              <h4 className="font-semibold text-xl">{exp.title}</h4>
              <time dateTime={exp.timeStart}>{exp.timeStart}</time>
              <span> - </span>
              <time dateTime={exp.timeEnd}>{exp.timeEnd}</time>
              <p>{exp.description}</p>
            </div>
          ))}
        </div>
      </div>
    </ScrollWrapper>
  )
}

export default withPageTransition(About)
