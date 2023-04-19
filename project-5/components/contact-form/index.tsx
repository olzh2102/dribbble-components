import { FormEvent } from 'react'

import { ContactFormFields } from 'common/types'
import ServiceSelector from '~components/service-selector'
import useForm from '~hooks/use-form'

import Input from './input'
import Textarea from './textarea'

export default function ContactForm({
  onSubmit,
}: {
  onSubmit: (
    data: ContactFormFields,
    event?: FormEvent<HTMLFormElement>
  ) => Promise<void>
}) {
  const { formState, errors, setValue, handleSubmit, isDisabled } = useForm()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid place-content-center"
    >
      <Input
        name="name"
        value={formState.name}
        onChange={setValue}
        errorMessage={errors.name}
      />
      <Input
        name="email"
        value={formState.email}
        onChange={setValue}
        errorMessage={errors.email}
      />
      <Textarea
        value={formState.details}
        onChange={setValue}
        errorMessage={errors.details}
      />
      <ServiceSelector
        selectedValue={formState.serviceType}
        onSelect={setValue}
        errorMessage={errors.serviceType}
      />
      <button type="submit" disabled={isDisabled}>
        send
      </button>
    </form>
  )
}
