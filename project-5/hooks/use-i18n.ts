import { useRouter } from 'next/router'

import lang from 'common/lang.json'

export default function useI18n(
  pageName: string
): Record<string, Record<string, string> | string> {
  const { locale } = useRouter()
  const t = lang[locale]
  return t[pageName]
}
