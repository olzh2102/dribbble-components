import Image from 'next/image'
import { useRouter } from 'next/router'

import lang from 'common/lang.json'
import { Project } from 'common/types'
import { imageLoader } from 'common/utils'

export default function PageOne({
  name,
  area,
  location,
  year,
  imageSrc,
  description,
  photo,
}: Omit<Project, 'location' | '_id' | 'images' | 'slug' | 'category'> & {
  location: string
  imageSrc: string
}) {
  const { locale } = useRouter()
  const t = lang[locale]

  return (
    <div
      data-test-id="hs-item"
      className="flex flex-[0_0_100%] flex-col sm:flex-row text-primary-zinc dark:text-primary-milk"
    >
      <div className="flex flex-col justify-between sm:w-8/12 sm:p-10 p-4">
        <div className="flex flex-col text-right max-sm:order-2">
          <span>
            <strong>{t['projects']['style']}</strong>: Bohemian
          </span>
          <span>
            <strong>{t['projects']['location']}</strong>: {location}
          </span>
          <span>
            <strong>{t['projects']['photo']}</strong>: {photo[locale]}
          </span>
          <span>
            <strong>{t['projects']['area']}</strong>: {area} sqm.
          </span>
          <span>
            <strong>{t['projects']['year']}</strong>: {year}
          </span>
        </div>
        <div className="sm:text-4xl text-xl uppercase max-sm:order-1">
          <h2 className="font-light uppercase">{t['projects']['title']}</h2>
          <h1 className="font-bold">{name}</h1>
        </div>
        <p className="max-sm:order-3 sm:mt-10 mt-5">{description[locale]}</p>
      </div>
      <Image
        loader={imageLoader}
        src={imageSrc}
        width="1000"
        height="2000"
        alt="Profile picture"
        className="md:w-4/12 object-cover"
      />
    </div>
  )
}
