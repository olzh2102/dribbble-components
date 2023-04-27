import { FormEvent, useContext } from 'react'

import { motion } from 'framer-motion'

import { ContactFormFields } from 'common/types'
import ServiceSelector from '~components/service-selector'
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
      className="w-[750px] text-primary-zinc uppercase dark:text-primary-milk grid grid-cols-7 grid-rows-4 gap-3"
    >
      {/* <ServiceSelector
        selectedValue={formState.serviceType}
        onSelect={setValue}
        errorMessage={errors.serviceType}
      /> */}

      <Input name="name" value={formState.name} onChange={setValue} errorMessage={errors.name} />
      <Input name="email" value={formState.email} onChange={setValue} errorMessage={errors.email} />
      <Textarea value={formState.details} onChange={setValue} errorMessage={errors.details} />

      <motion.button
        onMouseOver={onMouseOver('button')}
        onMouseOut={onMouseOut}
        whileHover={{
          x: '10%',
          y: '10%',
          backgroundColor: '#F7F5F2',
          color: '#353535',
          transition: { ease: 'circIn' },
        }}
        type="submit"
        disabled={isDisabled}
        className="bg-action-peach dark:bg-action-gold text-primary-milk dark:text-primary-zinc rounded-full py-4 px-8 place-self-start"
      >
        send
      </motion.button>
    </form>
  )
}
