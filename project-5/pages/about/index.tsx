import React from 'react'

import Image from 'next/image'

import HorizontalScroll from 'common/components/horizontal-scroll'
import withLayout from 'common/components/layout/with-layout'

const About = () => {
  return (
    <HorizontalScroll>
      <div className="flex h-full flex-[0_0_100%]" data-test-id="hs-item">
        <div className="w-1/3">
          <Image
            src="https://picsum.photos/1000/2000"
            alt="Picture of project"
            width={1000}
            height={2000}
            className={`
              w-full
              h-full
              grayscale 
              text-xs 
              border-solid border-neutral-900 rounded-l
            `}
          />
        </div>
        <div className="w-2/3 grid place-content-center text-white p-20">
          <h1 className="text-4xl">Interior and Concept Designer</h1>
          <h2 className="text-4xl italic">Natallia Raksha</h2>
        </div>
      </div>

      <div className="flex h-full flex-[0_0_100%]">
        <div className="w-full grid place-content-center text-white p-20">
          Experience history goes here...
        </div>
      </div>
    </HorizontalScroll>
  )
}

export default withLayout(About)
