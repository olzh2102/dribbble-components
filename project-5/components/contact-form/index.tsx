import { FormEvent, useContext } from 'react'

import { useRouter } from 'next/router'

import { motion } from 'framer-motion'

import lang from 'common/lang.json'
import { ContactFormFields } from 'common/types'
import { CursorContext } from '~contexts/cursor-provider'
import useForm from '~hooks/use-form'

import Input from './input'
import Textarea from './textarea'

export default function ContactForm({
  onSubmit,
}: {
  onSubmit: (data: ContactFormFields, event?: FormEvent<HTMLFormElement>) => Promise<void>
}) {
  const { locale } = useRouter()
  const t = lang[locale]

  const { formState, errors, setValue, handleSubmit, isDisabled } = useForm()
  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="sm:w-[1000px] max-sm:h-[300px] text-primary-zinc uppercase dark:text-primary-milk sm:grid grid-cols-7 grid-rows-4 gap-3"
    >
      <Input name="name" value={formState.name} onChange={setValue} errorMessage={errors.name} />
      <Input name="email" value={formState.email} onChange={setValue} errorMessage={errors.email} />
      <Textarea value={formState.details} onChange={setValue} errorMessage={errors.details} />

      <motion.button
        data-cy="form-submit"
        onMouseOver={onMouseOver('button')}
        onMouseOut={onMouseOut}
        whileHover={{
          x: '10%',
          y: '10%',
          transition: { ease: 'circIn' },
        }}
        type="submit"
        disabled={isDisabled}
        className="ml-auto mr-0 block bg-action-peach dark:bg-action-gold hover:text-primary-milk rounded-sm px-4 py-1 col-start-4"
      >
        {t['contact']['action']['send']}
      </motion.button>
    </form>
  )
}
