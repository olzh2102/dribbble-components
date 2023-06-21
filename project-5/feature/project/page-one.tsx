import Image from 'next/image'

import { Project } from 'common/types'
import { imageLoader } from 'common/utils'

export default function PageOne({
  name,
  area,
  location,
  year,
  imageSrc,
}: Omit<Project, 'location' | '_id' | 'images' | 'slug'> & { location: string; imageSrc: string }) {
  return (
    <div
      data-test-id="hs-item"
      className="flex flex-[0_0_100%] flex-col md:flex-row text-primary-zinc dark:text-primary-milk"
    >
      <div className="w-5/12 sm:text-4xl max-sm:font-medium text-xl uppercase sm:ml-10 max-sm:mt-12 my-auto p-2">
        <h1 className="italic">{name}</h1>
        <span>{area} SQM.</span>
      </div>
      <div className="md:w-2/12 flex flex-col sm:mt-5 p-2">
        <span>Design Style: Bohemian</span>
        <span>Location: {location}</span>
        <span>Year: {year}</span>
      </div>
      <Image
        loader={imageLoader}
        src={imageSrc}
        width="1000"
        height="2000"
        alt="Profile picture"
        className="md:w-5/12 object-cover object-left"
      />
    </div>
  )
}
