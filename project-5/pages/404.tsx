import { useContext } from 'react'

import { useRouter } from 'next/router'

import { groq } from 'next-sanity'

import lang from 'common/lang.json'
import { withPageTransition } from '~components/layout'
import { CursorContext } from '~contexts/cursor-provider'

import { client } from '../sanity/lib/client'

const Custom404 = ({ data }) => {
  const content = data[0]
  console.log('🚀 ~ file: 404.tsx:13 ~ Custom404 ~ data:', data)
  const { push, locale } = useRouter()
  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  return (
    <>
      <div className="absolute top-40 left-80 text-primary-zinc dark:text-primary-milk font-medium">
        <div className="mb-2">{content.title[locale]}</div>
        <div>{content.description[locale]}</div>
        <div
          className="hover:underline underline-offset-8"
          onMouseOver={onMouseOver('span')}
          onMouseOut={onMouseOut}
          onClick={() => push('/')}
        >
          <span>{content.link[locale]}</span>
        </div>
      </div>
      <div className="absolute bottom-0 right-2 text-9xl font-bold opacity-20">
        404
      </div>
    </>
  )
}

export default withPageTransition(Custom404)

const query = groq`*[_type == "404"]`
export async function getStaticProps() {
  const data = await client.fetch(query)
  return { props: { data } }
}
