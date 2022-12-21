import { useEffect } from 'react'

import useCounter from '~hooks/use-counter'

export default function Preloader({ setLoading }) {
  const count = useCounter({ from: 0, to: 100, duration: 4 })

  useEffect(() => {
    if (count > 100) setLoading(false)
  }, [count, setLoading])

  return (
    <div className="w-full h-full z-10 relative bg-secondary-300 dark:bg-neutral-900">
      {/* <div className="h-full w-1/2 bg-neutral-900 opacity-50 absolute"></div> */}
      {/* <div className="text-secondary-500 text-base p-4 absolute">NR</div> */}

      <div className="text-neutral-900 dark:text-secondary-500 place-content-center text-xl h-full grid">
        <div>Natallia Raksha</div>
      </div>

      <div className="text-neutral-900 dark:text-secondary-500 absolute bottom-0 right-0 text-base p-4">
        {count}
      </div>
    </div>
  )
}
