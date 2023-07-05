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
      className="flex flex-[0_0_100%] flex-col md:flex-row text-primary-zinc dark:text-primary-milk"
    >
      <div className="flex flex-col justify-between w-8/12 p-10">
        <div className="flex flex-col text-right">
          <span>{t['projects']['style']}: Bohemian</span>
          <span>
            {t['projects']['location']}: {location}
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
        <div className="space-y-10">
          <div className="sm:text-4xl text-xl uppercase">
            <h2 className="font-light uppercase">{t['projects']['title']}</h2>
            <h1 className="font-bold">{name}</h1>
          </div>
          <p>{description[locale]}</p>
        </div>
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
