import { useRouter } from 'next/router'

import lang from 'common/lang.json'
import { Lang } from 'common/types'
import { getTimeOfDay } from 'common/utils'

export default function Greeting() {
  const locale = useRouter().locale
  const t = lang[locale as Lang]
  const timeOfDay = getTimeOfDay()

  return (
    <div className="grid h-full place-content-center text-5xl text-secondary-300 mix-blend-exclusion">
      {t.greeting[timeOfDay]}
    </div>
  )
}
