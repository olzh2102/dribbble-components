import React from 'react'

import HorizontalScroll from 'common/components/horizontal-scroll'
import withLayout from 'common/components/layout/with-layout'

const About = () => {
  return (
    <HorizontalScroll>
      <div
        data-test-id="hs-item"
        className="h-40 bg-red-200 rounded-xl flex-[0_0_10rem]"
      >
        1
      </div>
      <div
        data-test-id="hs-item"
        className="h-40 bg-red-200 rounded-xl flex-[0_0_10rem]"
      >
        2
      </div>
      <div
        data-test-id="hs-item"
        className="h-40 bg-red-200 rounded-xl flex-[0_0_10rem]"
      >
        3
      </div>
      <div
        data-test-id="hs-item"
        className="h-40 bg-red-200 rounded-xl flex-[0_0_10rem]"
      >
        4
      </div>
      <div
        data-test-id="hs-item"
        className="h-40 bg-red-200 rounded-xl flex-[0_0_10rem]"
      >
        5
      </div>
      <div
        data-test-id="hs-item"
        className="h-40 bg-red-200 rounded-xl flex-[0_0_10rem]"
      >
        6
      </div>
      <div
        data-test-id="hs-item"
        className="h-40 bg-red-200 rounded-xl flex-[0_0_10rem]"
      >
        7
      </div>
      <div
        data-test-id="hs-item"
        className="h-40 bg-red-200 rounded-xl flex-[0_0_10rem]"
      >
        8
      </div>
      <div
        data-test-id="hs-item"
        className="h-40 bg-red-200 rounded-xl flex-[0_0_10rem]"
      >
        9
      </div>
      <div
        data-test-id="hs-item"
        className="h-40 bg-red-200 rounded-xl flex-[0_0_10rem]"
      >
        10
      </div>
      <div
        data-test-id="hs-item"
        className="h-40 bg-red-200 rounded-xl flex-[0_0_10rem]"
      >
        11
      </div>
    </HorizontalScroll>
  )
}

export default withLayout(About)
