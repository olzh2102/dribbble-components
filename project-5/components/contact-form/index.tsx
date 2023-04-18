import { FormEvent } from 'react'

import { ContactFormFields } from 'common/types'
import useForm from '~hooks/use-form'

export default function ContactForm({
  onSubmit,
}: {
  onSubmit: (
    data: ContactFormFields,
    event?: FormEvent<HTMLFormElement>
  ) => Promise<void>
}) {
  const { formState, errors, setValue, handleSubmit, isDisabled } = useForm()

  return null
}
