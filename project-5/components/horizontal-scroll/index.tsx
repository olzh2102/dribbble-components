import React, { useEffect, useRef } from 'react'

export default function HorizontalScroll({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const target = ref.current
    if (!target) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      target.scrollLeft += e.deltaY
      target.scrollLeft += e.deltaX
    }

    target.addEventListener('wheel', onWheel)

    return () => {
      target.removeEventListener('wheel', onWheel)
    }
  }, [])

  return (
    <div ref={ref} className="h-full flex overflow-x-scroll" data-test-id="horizontal-scroll">
      {children}
    </div>
  )
}
