import { useContext } from 'react'

import Image from 'next/image'

import { imageLoader } from 'common/utils'
import withLayout from '~components/layout/with-layout'
import { CursorContext } from '~contexts/cursor-provider'

const PROJECTS = ['project-1', 'project-2', 'project-3', 'project-4']

const Projects = () => {
  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  return (
    <div className="flex flex-col h-full">
      <Image
        src="/nr-logo.svg"
        width={40}
        height={40}
        alt="logo"
        className="absolute mix-blend-difference m-2"
      />

      <div className="flex justify-center gap-8 my-auto">
        {PROJECTS.map((project, i) => (
          <Image
            key={i}
            loader={imageLoader}
            src={`${project}.jpg`}
            width="270"
            height="600"
            alt="Project picture"
            className="rounded grayscale hover:grayscale-0"
            onMouseOver={(e) =>
              onMouseOver(e, 'img', {
                message: (
                  <div className="flex flex-col justify-between">
                    <h3 className="text-[2px] uppercase font-medium">
                      {project}
                    </h3>
                    <span className="text-[1.5px]">Square meters: 78 sqm</span>
                    <span className="text-[1.5px]">
                      Design Style: Scandinavian
                    </span>
                  </div>
                ),
              })
            }
            onMouseOut={(e) => onMouseOut(e, 'img')}
          />
        ))}
      </div>
    </div>
  )
}

export default withLayout(Projects)
