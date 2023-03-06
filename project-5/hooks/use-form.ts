import { useState, ChangeEvent } from 'react'

const NAME_MIN_LENGTH = 2
const NAME_MAX_LENGTH = 40
const NUM_REGEX = /\d/
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const DEFAULT_VALUES = {
  name: '',
  email: '',
  details: '',
}

const validation = {
  name: (value: string) => {
    if (value.length === 0) return 'Name is required'
    if (NUM_REGEX.test(value)) return 'Name can only contain letters'
    if (2 > value.length || value.length > 40)
      return `Name must be at between ${NAME_MIN_LENGTH} and ${NAME_MAX_LENGTH} characters long`
  },
  email: (value: string) => {
    if (value.length === 0) return 'Email is required'
    if (!value.match(EMAIL_REGEX)) return 'Enter a valid email'
  },
  details: (value: string) => {
    if (value.length === 0) return 'Project details is required'
  },
}

export default function useForm() {
  const [formState, setFormState] = useState(DEFAULT_VALUES)

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    details: '',
  })

  function validateForm(value: string, name: keyof typeof formState) {
    setErrors({ ...errors, [name]: validation[name](value) })
  }

  function setValue(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    validateForm(e.target.value, e.target.name as keyof typeof formState)

    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  return {
    formState,
    errors,
    setValue,
  }
}
