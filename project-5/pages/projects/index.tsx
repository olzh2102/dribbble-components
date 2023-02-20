import { useContext } from 'react'

import Image from 'next/image'

import withLayout from '~components/layout/with-layout'
import { CursorContext } from '~contexts/cursor-provider'

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
      <div className="flex justify-center gap-16 my-auto">
        {[1, 2, 3, 4].map((i) => (
          <Image
            key={i}
            onMouseOver={(e) =>
              onMouseOver(e, 'img', {
                message: (
                  <div className="flex flex-col justify-between">
                    <h3 className="text-[3px]">Zhailau {i}</h3>
                    <span className="text-[1.5px]">Square meters: 78 sqm</span>
                    <span className="text-[1.5px]">Design Style: Scandinavian</span>
                  </div>
                ),
              })
            }
            onMouseOut={(e) => onMouseOut(e, 'img')}
            src="https://picsum.photos/300/500"
            width={300}
            height={500}
            alt="Picture of project"
            className="rounded"
          />
        ))}
      </div>
    </div>
  )
}

export default withLayout(Projects)
