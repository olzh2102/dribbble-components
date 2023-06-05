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
    <>
      <label htmlFor="details" className="row-span-2 block mt-3">
        project details
      </label>
      <textarea
        data-cy="input-details"
        className="w-full p-2 rounded-sm text-primary-zinc resize-none col-span-3 row-span-2 outline-0"
        name="details"
        id="details"
        value={value}
        onChange={onChange}
        onMouseOver={onMouseOver('textarea')}
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
        className="block text-action-peach dark:text-action-gold row-span-2 col-span-3 lowercase"
        role={errorMessage ? 'alert' : 'none'}
      >
        {errorMessage ? errorMessage : ''}
      </motion.span>
    </>
  )
}
