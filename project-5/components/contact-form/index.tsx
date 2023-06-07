import { FormEvent, useContext } from 'react'

import { motion } from 'framer-motion'

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
        className="ml-auto mr-0 block bg-action-peach dark:bg-action-gold hover:text-primary-milk rounded-full py-4 px-8 col-start-4"
      >
        send
      </motion.button>
    </form>
  )
}
