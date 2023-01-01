import React from 'react'

import HorizontalScroll from 'common/components/horizontal-scroll'
import withLayout from 'common/components/layout/with-layout'

const About = () => {
  return (
    <HorizontalScroll>
      <div className="h-40 bg-red-200 rounded-xl flex-[0_0_10rem]" />
      <div className="h-40 bg-red-200 rounded-xl flex-[0_0_10rem]" />
      <div className="h-40 bg-red-200 rounded-xl flex-[0_0_10rem]" />
      <div className="h-40 bg-red-200 rounded-xl flex-[0_0_10rem]" />
      <div className="h-40 bg-red-200 rounded-xl flex-[0_0_10rem]" />
      <div className="h-40 bg-red-200 rounded-xl flex-[0_0_10rem]" />
      <div className="h-40 bg-red-200 rounded-xl flex-[0_0_10rem]" />
      <div className="h-40 bg-red-200 rounded-xl flex-[0_0_10rem]" />
      <div className="h-40 bg-red-200 rounded-xl flex-[0_0_10rem]" />
      <div className="h-40 bg-red-200 rounded-xl flex-[0_0_10rem]" />
    </HorizontalScroll>
  )
}

export default withLayout(About)
