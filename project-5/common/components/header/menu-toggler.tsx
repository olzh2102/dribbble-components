import { useContext } from 'react'

import { Cycle, motion, SVGMotionProps } from 'framer-motion'

import { CursorContext } from '~contexts/cursor-provider'

export default function MenuToggler({ toggle }: { toggle: Cycle }) {
  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  return (
    <button
      className="absolute top-4 right-4 rounded-full pointer-events-auto"
      onClick={() => toggle()}
      onMouseOver={(e) => onMouseOver(e, 'button')}
      onMouseOut={(e) => onMouseOut(e, 'button')}
    >
      <svg className="stroke-black dark:stroke-white" width="23" height="23" viewBox="0 0 23 23">
        <Path
          variants={{
            closed: { d: 'M 2 2.5 L 20 2.5' },
            open: { d: 'M 3 16.5 L 17 2.5' },
          }}
        />
        <Path
          d="M 2 9.423 L 20 9.423"
          variants={{
            closed: { opacity: 1 },
            open: { opacity: 0 },
          }}
          transition={{ duration: 0.1 }}
        />
        <Path
          variants={{
            closed: { d: 'M 2 16.346 L 20 16.346' },
            open: { d: 'M 3 2.5 L 17 16.346' },
          }}
        />
      </svg>
    </button>
  )
}

function Path(props: SVGMotionProps<SVGPathElement>) {
  return <motion.path strokeWidth="3" strokeLinecap="round" {...props} />
}
