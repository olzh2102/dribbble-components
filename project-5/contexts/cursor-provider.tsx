import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { motion } from 'framer-motion'

import { HTMLElementSelector } from 'common/types'

export const CursorContext = createContext<{
  onMouseOver: <T>(
    e: React.MouseEvent<T, MouseEvent>,
    selector: HTMLElementSelector,
    tooltip?: { message: ReactNode; className?: string }
  ) => void
  onMouseOut: <T>(
    e: React.MouseEvent<T, MouseEvent>,
    selector: HTMLElementSelector
  ) => void
}>({
  onMouseOver: () => null,
  onMouseOut: () => null,
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
    <TElement,>(
      e: React.MouseEvent<TElement, MouseEvent>,
      selector: HTMLElementSelector,
      tooltip?: { message: ReactNode; className?: string }
    ) => {
      const target = (e.target as HTMLElement).closest(selector)
      if (!target) return

      setActionHover(true)
      if (tooltip) {
        setMessage(tooltip?.message)
      }
    },
    []
  )

  const onMouseOut = useCallback(
    <TElement,>(
      e: React.MouseEvent<TElement, MouseEvent>,
      selector: HTMLElementSelector
    ) => {
      const target = (e.target as HTMLElement).closest(selector)
      if (!target) return

      setActionHover(false)
      setMessage(null)
    },
    []
  )

  useEffect(() => {
    if (ref.current)
      setCursorPosition({
        x: ref.current.getBoundingClientRect().width / 2.5,
        y: ref.current.getBoundingClientRect().height / 2.5,
      })
  }, [])

  return (
    <CursorContext.Provider
      value={useMemo(
        () => ({ onMouseOver, onMouseOut }),
        [onMouseOver, onMouseOut]
      )}
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
              absolute 
              w-6 h-6 
              text-primary-850 dark:text-secondary-100
              z-50 
              pointer-events-none 
              ${
                message
                  ? 'bg-secondary-100 dark:bg-primary-850 rounded-full'
                  : 'bg-primary-850 dark:bg-secondary-300 rounded-full mix-blend-difference'
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
