import useCounter from '~hooks/use-counter'

export default function Preloader() {
  const count = useCounter({ to: 100, duration: 2.5, onFinish: () => null })

  return (
    <div className="w-full h-full z-10 absolute relative bg-neutral-900">
      {/* <div className="h-full w-1/2 bg-neutral-900 opacity-50 absolute"></div> */}
      {/* <div className="text-secondary-500 text-base p-4 absolute">NR</div> */}

      <div className="text-secondary-500 tracking-widest text-xl h-full">
        <span className="inline-block align-middle">Natallia Raksha</span>
      </div>

      <div className="text-secondary-500 absolute bottom-0 right-0 text-base p-4">
        {count}
      </div>
    </div>
  )
}
