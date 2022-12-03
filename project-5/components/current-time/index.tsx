import { useEffect, useState } from 'react'
import { formatTimeHHMM } from 'common/utils'

export default function CurrentTime() {
  const [time, setTime] = useState(Date.now())

  useEffect(() => {
    const handlerId = setInterval(() => {
      setTime(Date.now())
    }, 1000)

    return () => {
      clearInterval(handlerId)
    }
  }, [])

  return <span>{formatTimeHHMM(time)}</span>
}
