import { send } from '@emailjs/browser'

export function imageLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  if (src.startsWith('/')) src = src.slice(1)

  let params = `w-${width}`

  if (quality) params = params + ',' + `q=${quality}`

  const IMAGE_KIT_ID = '778gxjsp5'
  const urlEndpoint = 'https://ik.imagekit.io/' + IMAGE_KIT_ID

  return `${urlEndpoint}/${src}?tr=${params}`
}

export async function sendEmail<T>(data: Record<string, T>) {
  await send(
    process.env.NEXT_PUBLIC_SERVICE_ID as string,
    process.env.NEXT_PUBLIC_TEMPLATE_ID as string,
    data,
    process.env.NEXT_PUBLIC_PUBLIC_KEY as string
  )
}
