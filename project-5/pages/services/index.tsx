import Image from 'next/image'

import { imageLoader } from 'common/utils'
import { withPageTransition } from '~components/layout'

const SERVICES = [
  {
    title: 'Space Planning',
    description: `Creating a functional layout that maximizes the use of the area, 
      and helping to determine the best furniture placement, traffic flow, 
      and organization to ensure that the space is both aesthetically pleasing and practical.
    `,
  },
  {
    title: 'Color and Material Selection',
    description: `Have a keen eye for color and 
      can help clients select the perfect color scheme for their space. 
      They can also recommend materials for flooring, 
      walls, and other surfaces that are not only visually appealing but also practical and durable.
    `,
  },
  {
    title: 'Lighting Design',
    description: `Create a lighting plan that complements 
      the overall design of the space while providing 
      optimal illumination for different activities. 
      They can recommend the best types of lighting fixtures 
      and placement to create a welcoming and comfortable ambiance
    `,
  },

  {
    title: 'Furniture and Accessories Selection',
    description: `Help clients choose furniture and 
      accessories that fit their style and budget. 
      They have access to a vast range of products and 
      can suggest pieces that not only look great but also meet the client's functional needs.
    `,
  },
]

const Services = () => {
  return (
    <div className="flex h-full">
      <div className="sm:w-7/12 h-full sm:h-min mt-auto mb-0 dark:text-primary-milk max-sm:overflow-scroll">
        <h1 className="uppercase sm:text-7xl text-xl font-semibold m-4">services</h1>
        <ul
          className={`
          border-y border-primary-zinc dark:border-primary-milk
          divide-y divide-primary-zinc dark:divide-primary-milk
          text-md
        `}
        >
          {SERVICES.map((service, i) => (
            <li key={i} className="grid grid-cols-6 items-center p-4 max-sm:gap-2">
              <span
                className={`
                max-sm:col-span-2
                text-4xl w-20 h-20 rounded-full
                border-2 border-primary-zinc dark:border-primary-milk
                grid place-content-center
              `}
              >
                {i + 1}
              </span>
              <h2 className="sm:col-span-2 col-span-4 uppercase font-medium">{service.title}</h2>
              <p className="sm:col-span-3 col-span-full text-primary-zinc/80 dark:text-primary-milk/70">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <Image
        loader={imageLoader}
        src="profile.jpg"
        width="1000"
        height="2000"
        alt="Profile picture"
        className="max-sm:hidden md:w-5/12 grayscale object-cover object-left"
        priority
      />
    </div>
  )
}

export default withPageTransition(Services)
