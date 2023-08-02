import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="text-logo text-4xl">
      <Image
        src="/nr-logo.svg"
        width="40"
        height="40"
        alt="logo"
        className="mix-blend-difference"
      />
    </Link>
  )
}
