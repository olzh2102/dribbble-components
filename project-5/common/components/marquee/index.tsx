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
      className="relative flex overflow-x-hidden"
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <div
        className="flex pb-2 animate-marquee-first"
        style={
          pauseOnHover && isHovered ? { animationPlayState: 'paused' } : {}
        }
      >
        {children}
      </div>
      <div
        className="flex pb-2 animate-marquee-second absolute top-0"
        style={
          pauseOnHover && isHovered ? { animationPlayState: 'paused' } : {}
        }
      >
        {children}
      </div>
    </div>
  )
}
