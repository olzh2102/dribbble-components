import { createContext, ReactNode, useState } from 'react'

export const CursorContext = createContext<any>({
  setActionHover: () => undefined,
})

export default function CursorProvider({ children }: { children: ReactNode }) {
  const [cursorPosition, setCursorPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [cursorHidden, setCursorHidden] = useState(true)
  const [actionHover, setActionHover] = useState(false)

  return (
    <CursorContext.Provider value={setActionHover}>
      <div
        className="w-full h-full"
        onMouseMove={(e) => {
          setCursorHidden(false)
          setCursorPosition({ x: e.pageX, y: e.pageY })
        }}
        onMouseOut={() => setCursorHidden(true)}
      >
        {!cursorHidden && (
          <div
            className={`absolute ${
              actionHover ? 'w-2 h-2' : 'w-4 h-4'
            } bg-secondary-200 dark:bg-secondary-400 rounded-full z-50 -translate-x-1/2 -translate-y-1/2 pointer-events-none`}
            style={{ left: cursorPosition.x, top: cursorPosition.y }}
          />
        )}
        {children}
      </div>
    </CursorContext.Provider>
  )
}
