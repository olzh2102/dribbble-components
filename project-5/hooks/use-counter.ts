import { useEffect, useState } from 'react'

import { animate } from 'framer-motion'

export default function useCounter({
  from = 0,
  to = 100,
  duration,
  onFinish,
}: {
  from?: number
  to?: number
  duration: number
  onFinish: () => void
}) {
  const [counter, setCounter] = useState<number>(from)

  useEffect(() => {
    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        setCounter(value)
      },
    })
    return () => controls.stop()
  }, [from, to, duration])

  return counter.toFixed(2) == '100.00'
    ? '100' && onFinish()
    : counter.toFixed(2)
}
