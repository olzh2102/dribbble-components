import Image from 'next/image'
import { useRouter } from 'next/router'

import { imageLoader } from 'common/utils'
import { ScrollWrapper, withPageTransition } from '~components/layout'
import useResponsive from '~hooks/use-responsive'

const Project = () => {
  const isMobile = useResponsive('sm')
  const { project } = useRouter().query

  return (
    <ScrollWrapper direction={isMobile ? 'vertical' : 'horizontal'}>
      <div
        data-test-id="hs-item"
        className={`
          flex flex-[0_0_100%] 
          flex-col md:flex-row
          text-primary-zinc dark:text-primary-milk
        `}
      >
        {isMobile ? (
          <div className="md:w-2/3 text-3xl p-2 uppercase font-medium">
            <h2>Designer</h2>
            <h3>Natallia Raksha</h3>
          </div>
        ) : (
          <div className="w-5/12 text-4xl uppercase ml-10 my-auto">
            <h1 className="italic">{project}</h1>
            <span>58 SQM.</span>
          </div>
        )}
        <div className="md:w-2/12 flex flex-col mt-5">
          <span>Design Style: Bohemian</span>
          <span>Location: Minsk, Belarus</span>
          <span>Year: 2019</span>
        </div>
        <Image
          loader={imageLoader}
          src={`${project}.jpg`}
          width="1000"
          height="2000"
          alt="Profile picture"
          className="md:w-5/12 md:rounded-r rounded-t md:rounded-tl-none object-cover object-left"
        />
      </div>

      <div className="flex flex-[0_0_100%] text-primary-zinc dark:text-primary-milk">
        <div className="w-full grid place-content-center p-2">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias sit eius perspiciatis
          sint fugit, delectus maiores accusantium doloremque. Nulla sunt ipsum vero sit enim
          inventore officiis similique odio, facilis eos.
        </div>
      </div>
    </ScrollWrapper>
  )
}

export default withPageTransition(Project)
