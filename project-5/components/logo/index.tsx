import Image from 'next/image'

export default function Logo() {
  return (
    <Image
      src="/nr-logo.svg"
      width="40"
      height="40"
      alt="logo"
      className="w-auto h-auto absolute mix-blend-difference top-4 left-4"
    />
  )
}
