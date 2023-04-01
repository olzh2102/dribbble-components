import React from 'react'

import Image from 'next/image'

import { imageLoader } from 'common/utils'
import withLayout from '~components/layout/with-layout'
import ScrollWrapper from '~components/scroll-wrapper'
import useResponsive from '~hooks/use-responsive'

const About = () => {
  const isMobile = useResponsive('sm')

  return (
    <ScrollWrapper direction={isMobile ? 'vertical' : 'horizontal'}>
      <div
        data-test-id="hs-item"
        className={`
          flex flex-[0_0_100%] flex-col 
          md:flex-row 
          text-primary-zinc dark:text-primary-milk
        `}
      >
        <Image
          loader={imageLoader}
          src="profile.jpg"
          width="1000"
          height="2000"
          alt="Profile picture"
          className={`
            md:w-1/3 grayscale 
            md:rounded-l rounded-t-md md:rounded-t-none 
            object-cover object-left
          `}
        />
        {isMobile ? (
          <div className="md:w-2/3 text-3xl p-2 uppercase font-medium">
            <h2>Designer</h2>
            <h3>Natallia Raksha</h3>
          </div>
        ) : (
          <div className="w-2/3 grid place-content-center text-4xl">
            <span>Interior and Concept Designer</span>
            <span>Natallia Raksha</span>
          </div>
        )}
      </div>

      <div className="flex flex-[0_0_100%] text-primary-zinc dark:text-primary-milk">
        <div className="w-full grid place-content-center p-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias
          sit eius perspiciatis sint fugit, delectus maiores accusantium
          doloremque. Nulla sunt ipsum vero sit enim inventore officiis
          similique odio, facilis eos.
        </div>
      </div>
    </ScrollWrapper>
  )
}

export default withLayout(About)
