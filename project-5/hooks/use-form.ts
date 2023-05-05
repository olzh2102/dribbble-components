import { useState, ChangeEvent, FormEvent } from 'react'

import { ContactFormFields } from 'common/types'

const NAME_MIN_LENGTH = 2
const NAME_MAX_LENGTH = 40
const NUM_REGEX = /\d/
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const DEFAULT_VALUES: ContactFormFields = {
  name: '',
  email: '',
  details: '',
}
type Name = keyof ContactFormFields

const validation = {
  name: (value: string) => {
    if (value.length === 0) return 'Name is required'
    if (NUM_REGEX.test(value)) return 'Name can only contain letters'
    if (value.length < NAME_MIN_LENGTH) return 'Too short'
    if (value.length > NAME_MAX_LENGTH) return 'Too long'

    return ''
  },
  email: (value: string) => {
    if (value.length === 0) return 'Email is required'
    if (!value.match(EMAIL_REGEX)) return 'Enter a valid email'

    return ''
  },
  details: (value: string) => {
    if (value.length === 0) return 'Project details is required'

    return ''
  },
}

export default function useForm() {
  const [formState, setFormState] = useState(DEFAULT_VALUES)
  const [isDisabled, setIsDisabled] = useState(false)

  const [errors, setErrors] = useState({
    name: null,
    email: null,
    details: null,
  })

  function validateForm(value: string, name: Name) {
    setErrors((prev) => ({ ...prev, [name]: validation[name](value) }))
  }

  function setForm(value: string, name: Name) {
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  function setValue(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { value, name } = event.target

    validateForm(value, name as Name)
    setForm(value, name as Name)
  }

  function handleSubmit(onSubmit: (data: ContactFormFields) => Promise<void>) {
    return async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      Object.entries(formState).forEach(([name, value]) => validateForm(value, name as Name))

      if (Object.values(errors).some((error) => error === null)) return

      if (Object.values(errors).every((error) => !error)) {
        setIsDisabled(true)
        await onSubmit(formState)
        setIsDisabled(false)
        Object.keys(formState).forEach((name) => setForm('', name as Name))
      }
    }
  }

  return {
    formState,
    errors,
    setValue,
    handleSubmit,
    isDisabled,
  }
}
