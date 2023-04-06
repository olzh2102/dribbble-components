import { useContext } from 'react'

import { useRouter } from 'next/router'

import lang from 'common/lang.json'
import { withPageTransition } from '~components/layout'
import { CursorContext } from '~contexts/cursor-provider'

const Custom404 = () => {
  const router = useRouter()
  const t = lang[router.locale]

  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  return (
    <>
      <div className="absolute top-40 left-80 text-primary-zinc dark:text-primary-milk font-medium">
        <div className="mb-2">404 {t['404']['pageNotFound']}</div>
        <div>{t['404']['search']}</div>
        <div className="mb-2">{t['404']['notHere']} :(</div>
        <div
          className="hover:underline underline-offset-8"
          onMouseOver={onMouseOver('span')}
          onMouseOut={onMouseOut}
          onClick={() => router.push('/')}
        >
          <span>{t['404']['goBack']}</span>
        </div>
      </div>
      <div className="absolute bottom-0 right-2 text-9xl font-bold opacity-20">404</div>
    </>
  )
}

export default withPageTransition(Custom404)
