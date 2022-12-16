import { AppProps } from 'next/app'

import { Page } from 'common/types'

import Layout from '.'

export default function withLayout(Component: any): Page {
  const displayName = Component.displayName || 'Component'

  const ComponentWithPageTransition = (props: AppProps) => (
    <Layout>
      <Component {...props} />
    </Layout>
  )

  ComponentWithPageTransition.displayName = `withLayout(${displayName})`

  return ComponentWithPageTransition as any
}
