import { createContext, ReactNode, useEffect, useRef, useState } from 'react'

import { motion } from 'framer-motion'

type Selector = keyof HTMLElementTagNameMap

export const CursorContext = createContext<{
  onMouseOver: <T>(e: React.MouseEvent<T, MouseEvent>, selector: Selector) => void
  onMouseOut: <T>(e: React.MouseEvent<T, MouseEvent>, selector: Selector) => void
}>({
  onMouseOver: () => undefined,
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

  useEffect(() => {
    if (ref.current)
      setCursorPosition({
        x: ref.current.getBoundingClientRect().width / 2.5,
        y: ref.current.getBoundingClientRect().height / 2.5,
      })
  }, [])

  const onMouseOver = <T,>(e: React.MouseEvent<T, MouseEvent>, selector: Selector) => {
    const target = (e.target as HTMLElement).closest(selector)
    if (target) setActionHover(true)
  }

  const onMouseOut = <T,>(e: React.MouseEvent<T, MouseEvent>, selector: Selector) => {
    const target = (e.target as HTMLElement).closest(selector)
    if (target) setActionHover(false)
  }

  return (
    <CursorContext.Provider value={{ onMouseOver, onMouseOut }}>
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
            transition={{ type: 'spring', damping: 10, stiffness: 100 }}
            style={{ left: cursorPosition.x, top: cursorPosition.y }}
            animate={{
              scale: actionHover ? 0.3 : 1,
              translateX: '-50%',
              translateY: '-50%',
            }}
            className={`
              absolute 
              w-6 h-6 
              bg-secondary-400 dark:bg-secondary-300 
              rounded-full 
              z-50 
              pointer-events-none 
              mix-blend-difference
            `}
          />
        )}
        {children}
      </div>
    </CursorContext.Provider>
  )
}
