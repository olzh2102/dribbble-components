import { ChangeEvent, useContext } from 'react'

import { motion } from 'framer-motion'

import { CursorContext } from '~contexts/cursor-provider'

export default function Textarea({
  value,
  onChange,
  errorMessage,
}: {
  value: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  errorMessage: string | null
}) {
  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  return (
    <div>
      <label className="flex flex-col uppercase">
        Project details
        <textarea
          name="details"
          value={value}
          onChange={onChange}
          onMouseOver={onMouseOver('textarea')}
          onMouseOut={onMouseOut}
        />
      </label>

      <motion.span
        animate={errorMessage ? 'visible' : 'hidden'}
        transition={{ delay: 0.5 }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
          initial: { opacity: 0 },
        }}
        className="text-primary-950"
        role={errorMessage ? 'alert' : 'none'}
      >
        {errorMessage ? errorMessage : ''}
      </motion.span>
    </div>
  )
}
