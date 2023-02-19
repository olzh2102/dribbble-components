import { useState } from 'react'

export default function Marquee({
  children,
  pauseOnHover = true,
}: {
  children: React.ReactNode
  pauseOnHover?: boolean
}) {
  const [isHovered, setHovered] = useState(false)

  return (
    <div
      className="relative overflow-x-hidden"
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <div
        className="flex w-max pb-2.5 animate-marquee-first"
        style={
          pauseOnHover && isHovered ? { animationPlayState: 'paused' } : {}
        }
      >
        {children}
      </div>
      <div
        className="flex w-max pb-2.5 animate-marquee-second absolute top-0"
        style={
          pauseOnHover && isHovered ? { animationPlayState: 'paused' } : {}
        }
      >
        {children}
      </div>
    </div>
  )
}
