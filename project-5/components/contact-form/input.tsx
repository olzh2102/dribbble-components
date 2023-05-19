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
    <>
      <label htmlFor={name}>{name}</label>
      <input
        id={name}
        data-cy={`input-${name}`}
        className="p-2 rounded-sm text-primary-zinc col-span-3 outline-0 caret-primary-milk dark:caret-primary-zinc"
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        onMouseOver={onMouseOver('input')}
        onMouseOut={onMouseOut}
      />
      <motion.span
        animate={errorMessage ? 'visible' : 'hidden'}
        transition={{ delay: 0.5 }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
          initial: { opacity: 0 },
        }}
        className="text-action-peach dark:text-action-gold col-span-3 lowercase"
        role={errorMessage ? 'alert' : 'none'}
      >
        {errorMessage}
      </motion.span>
    </>
  )
}
