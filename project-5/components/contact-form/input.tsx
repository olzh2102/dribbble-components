import { ChangeEvent, useContext } from 'react'

import { useRouter } from 'next/router'

import { motion } from 'framer-motion'

import lang from 'common/lang.json'
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
  const { locale } = useRouter()
  const t = lang[locale]

  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  return (
    <>
      <label className="block" htmlFor={name}>
        {t['contact']['label'][name]}
      </label>
      <input
        id={name}
        data-cy={`input-${name}`}
        className="w-full p-2 rounded-sm text-primary-zinc col-span-3 outline-0 caret-primary-milk dark:caret-primary-zinc"
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
        className="block text-action-peach dark:text-action-gold col-span-3 lowercase"
        role={errorMessage ? 'alert' : 'none'}
      >
        {errorMessage}
      </motion.span>
    </>
  )
}
