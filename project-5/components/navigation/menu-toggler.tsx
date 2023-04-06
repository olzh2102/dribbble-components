import { useContext } from 'react'

import { motion } from 'framer-motion'

import { CursorContext } from '~contexts/cursor-provider'

export default function MenuToggler({ toggle }: { toggle: () => void }) {
  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  return (
    <button
      className="rounded-full pointer-events-auto"
      onClick={toggle}
      onMouseOver={onMouseOver('button')}
      onMouseOut={onMouseOut}
      data-test-id="burger-menu"
    >
      <svg
        className="stroke-primary-zinc dark:stroke-primary-milk"
        width="33"
        height="33"
        viewBox="0 0 33 33"
      >
        <motion.path
          strokeWidth="2"
          strokeLinecap="round"
          variants={{
            closed: { d: 'M 2 2.5 L 30 2.5' },
            open: { d: 'M 13 16.5 L 27 2.5' },
          }}
        />
        <motion.path
          strokeWidth="2"
          strokeLinecap="round"
          variants={{
            closed: { d: 'M 11 12 L 30 12' },
            open: { d: 'M 13 2.5 L 27 16.346' },
          }}
        />
      </svg>
    </button>
  )
}