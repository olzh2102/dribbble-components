import Image from 'next/image'
import { useRouter } from 'next/router'

import { Project } from 'common/types'
import { getBlurImageURL, imageLoader } from 'common/utils'
import useI18n from '~hooks/use-i18n'

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
  const t = useI18n('projects')

  return (
    <div
      data-test-id="hs-item"
      className="flex flex-[0_0_100%] flex-col sm:flex-row text-primary-zinc dark:text-primary-milk"
    >
      <div className="flex flex-col sm:w-8/12 p-4 sm:gap-4">
        <div className="flex flex-col flex-1 text-right max-sm:order-2 uppercase">
          <span>
            {t['category']}: {category[locale]}
          </span>
          <span>
            {t['location']}: {location}
          </span>
          <span>
            {t['studio']}: {studio[locale]}
          </span>
          <span>
            {t['design']}: {design[locale]}
          </span>
          <span>
            {t['photo']}: {photo[locale]}
          </span>
          <span>
            {t['area']}: {area} sqm.
          </span>
          <span>
            {t['year']}: {year}
          </span>
        </div>
        <div className="sm:text-4xl text-xl uppercase max-sm:order-1">
          <h2 className="font-light uppercase">{t['title']}</h2>
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
        placeholder="blur"
        blurDataURL={getBlurImageURL(imageSrc)}
      />
    </div>
  )
}
