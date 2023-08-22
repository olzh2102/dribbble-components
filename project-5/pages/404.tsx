import { useContext } from 'react'

import { useRouter } from 'next/router'

import { withPageTransition } from '~components/layout'
import { CursorContext } from '~contexts/cursor-provider'
import useI18n from '~hooks/use-i18n'

const Custom404 = () => {
  const { push } = useRouter()
  const t = useI18n('404')

  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  return (
    <>
      <div className="absolute top-40 left-80 text-primary-zinc dark:text-primary-milk font-medium">
        <div className="mb-2">404 {t['404']['pageNotFound']}</div>
        <div>{t['search']}</div>
        <div className="mb-2">{t['notHere']} :(</div>
        <div
          className="hover:underline underline-offset-8"
          onMouseOver={onMouseOver('span')}
          onMouseOut={onMouseOut}
          onClick={() => push('/')}
        >
          <span>{t['goBack']}</span>
        </div>
      </div>
      <div className="absolute bottom-0 right-2 text-9xl font-bold opacity-20">
        404
      </div>
    </>
  )
}

export default withPageTransition(Custom404)
