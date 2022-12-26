import { useEffect, useState } from 'react'

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
  const step = duration / (to - from)

  useEffect(() => {
    const handlerId = setInterval(() => {
      setCounter((x) => x + 1)
    }, step)

    return () => clearInterval(handlerId)
  }, [duration, step])

  return counter
}
