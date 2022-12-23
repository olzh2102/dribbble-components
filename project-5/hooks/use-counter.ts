import { useEffect, useState } from 'react'

import { animate } from 'framer-motion'

export default function useCounter({
  from = 0,
  to = 100,
  duration,
}: {
  from?: number
  to?: number
  duration: number
}) {
  const [counter, setCounter] = useState<number>(from)

  useEffect(() => {
    const controls = animate(from, to, {
      duration,
      onUpdate(value) {
        setCounter(Math.floor(value))
      },
    })
    return () => controls.stop()
  }, [from, to, duration])

  return counter
}
