import React, { useEffect, useRef } from 'react'

export default function HorizontalScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const target = ref.current
    if (!target) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      target.scrollLeft += e.deltaY
    }

    target.addEventListener('wheel', onWheel)

    return () => {
      target.removeEventListener('wheel', onWheel)
    }
  }, [])

  return (
    <div ref={ref} className="flex gap-10 overflow-x-scroll">
      {children}
    </div>
  )
}
