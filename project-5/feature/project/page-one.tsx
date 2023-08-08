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
  category,
  design,
  studio,
}: Omit<Project, 'location' | '_id' | 'images' | 'slug'> & {
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
      <div className="flex flex-col sm:w-8/12 p-4 sm:gap-4">
        <div className="flex flex-col flex-1 text-right max-sm:order-2 uppercase">
          <span>
            {t['projects']['category']}: {category[locale]}
          </span>
          <span>
            {t['projects']['location']}: {location}
          </span>
          <span>
            {t['projects']['studio']}: {studio[locale]}
          </span>
          <span>
            {t['projects']['design']}: {design[locale]}
          </span>
          <span>
            {t['projects']['photo']}: {photo[locale]}
          </span>
          <span>
            {t['projects']['area']}: {area} sqm.
          </span>
          <span>
            {t['projects']['year']}: {year}
          </span>
        </div>
        <div className="sm:text-4xl text-xl uppercase max-sm:order-1">
          <h2 className="font-light uppercase">{t['projects']['title']}</h2>
          <h1 className="font-bold">{name}</h1>
        </div>
        <p className="max-sm:order-3">{description[locale]}</p>
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
