import React from 'react'

import Image from 'next/image'

import HorizontalScroll from '~components/horizontal-scroll'
import withLayout from '~components/layout/with-layout'

const About = () => {
  return (
    <HorizontalScroll>
      <div
        className="flex flex-[0_0_100%] text-secondary-100 dark:text-secondary-300"
        data-test-id="hs-item"
      >
        <div className="w-1/3">
          <Image
            src="https://picsum.photos/1000/2000"
            alt="profile picture"
            width={1000}
            height={2000}
            className="grayscale rounded-l"
          />
        </div>
        <div className="w-2/3 grid place-content-center text-4xl">
          <span>Interior and Concept Designer</span>
          <span>Natallia Raksha</span>
        </div>
      </div>

      <div className="flex flex-[0_0_100%] text-secondary-100 dark:text-secondary-300">
        <div className="w-full grid place-content-center">Experience history goes here...</div>
      </div>
    </HorizontalScroll>
  )
}

export default withLayout(About)
