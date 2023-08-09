const IMAGE_KIT_ID = '778gxjsp5'
const IMAGE_KIT_URL = 'https://ik.imagekit.io/'

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

  if (quality) params = params + ',' + `q-${quality}`

  const urlEndpoint = IMAGE_KIT_URL + IMAGE_KIT_ID

  return `${urlEndpoint}/tr:${params}/${src}`
}

export function getBlurImageURL(src: string) {
  return `${IMAGE_KIT_URL}/${IMAGE_KIT_ID}/tr:bl-10,q-10/${src}`
}

export function take<T>(list: T[]) {
  return (start: number, end?: number) => list.slice(start, !end ? list.length : end + 1)
}
