import { useEffect } from 'react'

import useCounter from '~hooks/use-counter'

export default function Preloader({
  duration,
  setLoading,
}: {
  duration: number
  setLoading: (val: boolean) => void
}) {
  const count = useCounter({ from: 0, to: 100, duration })

  useEffect(() => {
    setTimeout(() => setLoading(false), duration * 1000)
  }, [duration, setLoading])

  return (
    <div className="w-full h-full z-10 relative bg-secondary-300 dark:bg-neutral-900">
      <div className="text-neutral-900 dark:text-secondary-500 place-content-center text-xl h-full grid">
        <div>Natallia Raksha</div>
      </div>

      <div className="text-neutral-900 dark:text-secondary-500 absolute bottom-0 right-0 text-base p-4">
        {count}
      </div>
    </div>
  )
}
