import withLayout from 'common/components/layout/with-layout'
import { Page } from 'common/types'

const Home: Page = withLayout(() => {
  return (
    <div className="grid h-full place-content-center text-8xl font-medium text-secondary-400 dark:text-secondary-300 mix-blend-difference pointer-events-none">
      NR
    </div>
  )
})

export default Home

Home.waveBackground = true
