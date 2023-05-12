import { createContext, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { motion } from 'framer-motion'

import { HTMLElementSelector } from 'common/types'

export const CursorContext = createContext<{
  onMouseOver: (
    ...args: (
      | HTMLElementSelector
      | {
          tooltip: { message: ReactNode; className?: string }
        }
    )[]
  ) => <T>(e: React.MouseEvent<T, MouseEvent>) => void
  onMouseOut: () => void
}>({
  onMouseOver: () => () => undefined,
  onMouseOut: () => undefined,
})

export default function CursorProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  const [cursorPosition, setCursorPosition] = useState<{
    x: number
    y: number
  }>({ x: 0, y: 0 })
  const [cursorHidden, setCursorHidden] = useState(false)
  const [actionHover, setActionHover] = useState(false)
  const [message, setMessage] = useState<ReactNode | null>(null)

  const onMouseOver = useCallback(
    (
      ...args: (
        | HTMLElementSelector
        | {
            tooltip: { message: ReactNode; className?: string }
          }
      )[]
    ) => {
      return <TElement,>(e: React.MouseEvent<TElement, MouseEvent>) =>
        args.forEach((arg) => {
          if (typeof arg !== 'string') {
            if ('tooltip' in arg) setMessage(arg.tooltip.message)
          } else {
            const target = (e.target as HTMLElement).closest(arg)
            if (!target) return

            setActionHover(true)
          }
        })
    },
    []
  )

  const onMouseOut = useCallback(() => {
    setActionHover(false)
    setMessage(null)
  }, [])

  useEffect(() => {
    if (ref.current)
      setCursorPosition({
        x: ref.current.getBoundingClientRect().width / 2.5,
        y: ref.current.getBoundingClientRect().height / 2.5,
      })
  }, [])

  return (
    <CursorContext.Provider
      value={useMemo(() => ({ onMouseOver, onMouseOut }), [onMouseOver, onMouseOut])}
    >
      <div
        ref={ref}
        className="w-full h-full"
        onMouseMove={(e) => {
          setCursorHidden(false)
          setCursorPosition({ x: e.pageX, y: e.pageY })
        }}
        onMouseOut={() => setCursorHidden(true)}
      >
        {!cursorHidden && (
          <motion.div
            role="custom-cursor"
            data-cy="cursor"
            transition={{
              stiffness: 100,
              duration: 0.5,
            }}
            style={{ left: cursorPosition.x, top: cursorPosition.y }}
            animate={{
              scale: message && actionHover ? 9 : actionHover ? 0.3 : 1,
              translateX: '-50%',
              translateY: '-50%',
            }}
            className={`
              grid place-content-center
              absolute z-50 
              w-6 h-6 
              text-primary-milk dark:text-primary-zinc
              pointer-events-none rounded-full
              ${
                message
                  ? 'bg-primary-zinc dark:bg-primary-milk'
                  : 'bg-primary-milk mix-blend-difference'
              }
            `}
          >
            {message}
          </motion.div>
        )}
        {children}
      </div>
    </CursorContext.Provider>
  )
}
