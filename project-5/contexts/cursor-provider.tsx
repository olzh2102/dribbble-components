import { createContext, ReactNode, useState } from 'react'

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
  const [cursorPosition, setCursorPosition] = useState<{
    x: number
    y: number
  }>({ x: 0, y: 0 })
  const [cursorHidden, setCursorHidden] = useState(false)
  const [actionHover, setActionHover] = useState(false)

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
            animate={{
              scale: actionHover ? 0.5 : 1,
              translateX: '-50%',
              translateY: '-50%',
            }}
            transition={{ type: 'spring', damping: 10, stiffness: 100 }}
            className="absolute w-4 h-4 bg-secondary-400 dark:bg-white rounded-full z-50 pointer-events-none mix-blend-difference"
            style={{ left: cursorPosition.x, top: cursorPosition.y }}
          />
        )}
        {children}
      </div>
    </CursorContext.Provider>
  )
}
