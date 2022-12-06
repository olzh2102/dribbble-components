import { Page } from 'common/types'
import Greeting from '~components/greeting'

const Home: Page = () => {
  return <Greeting />
}

export default Home

Home.waveBackground = true
