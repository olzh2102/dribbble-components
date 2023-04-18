import { ChangeEvent, useContext } from 'react'

import { motion } from 'framer-motion'

import { ContactFormFields } from 'common/types'
import { CursorContext } from '~contexts/cursor-provider'

export default function Input({
  name,
  value,
  onChange,
  errorMessage,
}: {
  name: keyof ContactFormFields
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  errorMessage: string | null
}) {
  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  return (
    <div>
      <label className="flex flex-col uppercase">
        {name}
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          onMouseOver={onMouseOver('input')}
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
        className="text-[#a57548]"
        role={errorMessage ? 'alert' : 'none'}
      >
        {errorMessage}
      </motion.span>
    </div>
  )
}
