import withLayout from 'common/components/layout/with-layout'
import { Page } from 'common/types'

import Greeting from '~components/greeting'

const Home: Page = withLayout(() => {
  return <Greeting />
})

export default Home

Home.waveBackground = true
