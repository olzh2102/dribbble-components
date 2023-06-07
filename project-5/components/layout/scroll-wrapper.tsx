import React, { useEffect, useRef } from 'react'

export default function ScrollWrapper({
  children,
  direction = 'horizontal',
}: {
  children: React.ReactNode
  direction?: 'horizontal' | 'vertical'
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const target = ref.current
    if (!target || direction === 'vertical') return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      target.scrollLeft += e.deltaY
      target.scrollLeft += e.deltaX
    }

    target.addEventListener('wheel', onWheel)

    return () => {
      target.removeEventListener('wheel', onWheel)
    }
  }, [direction])

  return (
    <div
      ref={ref}
      className={
        'h-full hidden-scrollbar ' +
        (direction === 'horizontal'
          ? `flex overflow-x-scroll gap-1`
          : 'overflow-y-scroll space-y-4')
      }
      data-cy="scroll-wrapper"
    >
      {children}
    </div>
  )
}
