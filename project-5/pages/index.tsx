import { useRouter } from 'next/router'

import lang from 'common/lang.json'
import { Lang, Page } from 'common/types'

const Home: Page = () => {
  const locale = useRouter().locale
  const t = lang[locale as Lang]

  return (
    <>
      <div className="grid h-full place-content-center text-5xl dark:text-white dark:mix-blend-exclusion">
        {t.welcome}
      </div>
    </>
  )
}

export default Home

Home.waveBackground = true
