import { ReactNode, useEffect, useRef, useState } from 'react'

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
    <>
      {open && (
        <ClientOnlyPortal autoHideDuration={autoHideDuration} onClose={onClose}>
          <div className="absolute top-3 right-3">{children}</div>
        </ClientOnlyPortal>
      )}
    </>
  )
}

function ClientOnlyPortal<T extends Element>({
  children,
  onClose,
  autoHideDuration = 3000,
  selector = 'body',
}: {
  children: ReactNode
  onClose?: () => void
  autoHideDuration?: number
  selector?: string
}) {
  const ref = useRef<T | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    ref.current = document.querySelector<T>(selector)
    setMounted(true)

    const timeoutId = onClose && setTimeout(onClose, autoHideDuration)

    return () => {
      clearTimeout(timeoutId)
    }
  }, [selector, autoHideDuration, onClose])

  return mounted && ref.current ? createPortal(children, ref.current) : null
}
