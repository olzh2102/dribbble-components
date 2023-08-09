import React from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import { getBlurImageURL, imageLoader } from 'common/utils'
import { ScrollWrapper, withPageTransition } from '~components/layout'
import useResponsive from '~hooks/use-responsive'

import { getAbout } from '~sanity/lib/sanity-utils'

const About = ({ data }: any) => {
  const { locale } = useRouter()
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
          className="md:w-2/5 md:mt-14 grayscale sm:rounded-tr object-cover object-left"
          placeholder="blur"
          blurDataURL={getBlurImageURL('profile.jpg')}
        />
        {isMobile ? (
          <div className="md:w-2/3 text-3xl p-2 uppercase font-medium">
            <h2>Designer</h2>
            <h3 className="font-bold uppercase">Natallia Raksha</h3>
          </div>
        ) : (
          <div className="w-3/5 my-auto text-4xl p-10">
            <h2>{data.title[locale]}</h2>
            <h3 className="font-bold uppercase">Natallia Raksha</h3>
            <p className="text-base mt-3">{data.description[locale]}</p>
          </div>
        )}
      </div>

      <div
        data-cy="about-experience"
        className="flex flex-[0_0_100%] text-primary-zinc dark:text-primary-milk"
      >
        <div className="flex max-sm:flex-col m-auto p-2 gap-10 sm:w-1/2">
          {data.experiences.map((exp, i) => (
            <div key={exp._key + '' + i} className="space-y-3">
              <h4 className="font-semibold text-xl">{exp.position[locale]}</h4>
              <time dateTime={exp.start}>
                {new Date(exp.start).toLocaleDateString(locale, {
                  year: 'numeric',
                  month: 'short',
                })}
              </time>
              <span> - </span>
              <time dateTime={exp.end}>
                {new Date(exp.end).toLocaleDateString(locale, { year: 'numeric', month: 'short' })}
              </time>
              <p>{exp.description[locale]}</p>
            </div>
          ))}
        </div>
      </div>
    </ScrollWrapper>
  )
}

export default withPageTransition(About)

export async function getStaticProps() {
  const data = await getAbout()
  return { props: { data } }
}
