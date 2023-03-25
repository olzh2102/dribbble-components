import { ReactNode, useEffect, useRef } from 'react'

import { AnimatePresence, motion } from 'framer-motion'
import { createPortal } from 'react-dom'

export default function Snackbar({
  open,
  children,
  onClose,
  autoHideDuration = 3000,
}: {
  open: boolean
  onClose?: () => void
  autoHideDuration?: number
  children: ReactNode
}) {
  return (
    <ClientOnlyPortal autoHideDuration={autoHideDuration} onClose={onClose} open={open}>
      <div className="absolute top-3 right-3">{children}</div>
    </ClientOnlyPortal>
  )
}

function ClientOnlyPortal<T extends Element>({
  open,
  children,
  onClose,
  autoHideDuration = 3000,
  selector = 'body',
}: {
  open: boolean
  children: ReactNode
  onClose?: () => void
  autoHideDuration?: number
  selector?: string
}) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    ref.current = document.querySelector<T>(selector)

    const timeoutId = onClose && setTimeout(onClose, autoHideDuration)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [selector, autoHideDuration, onClose])

  return ref.current
    ? createPortal(
        <AnimatePresence>
          {open && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {children}
            </motion.div>
          )}
        </AnimatePresence>,
        ref.current
      )
    : null
}
