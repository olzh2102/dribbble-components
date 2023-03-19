import { FormEvent } from 'react'

import { ContactFormFields } from 'common/types'
import ServiceSelector from '~components/service-selector'
import useForm from '~hooks/use-form'

import Input from './input'
import Textarea from './textarea'

export default function ContactForm({
  onSubmit,
}: {
  onSubmit: (data: ContactFormFields, event?: FormEvent<HTMLFormElement>) => void
}) {
  const { formState, errors, setValue, handleSubmit } = useForm()

  return (
    <form className="h-full flex" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-2/5 bg-red-300 h-full rounded-l-md grid place-content-center">
        <h2>What can I do for you?</h2>
        <div className="flex gap-2">
          <ServiceSelector
            selectedValue={formState.serviceType}
            onSelect={setValue}
            errorMessage={errors.serviceType}
          />
        </div>
      </div>

      <div className="w-3/5 h-full grid place-content-center dark:text-white">
        <div className="flex gap-4 mb-6">
          <div className="w-min">
            <Input
              name="name"
              value={formState.name}
              onChange={setValue}
              errorMessage={errors.name}
            />
          </div>
          <div className="w-min">
            <Input
              name="email"
              value={formState.email}
              onChange={setValue}
              errorMessage={errors.email}
            />
          </div>
        </div>
        <div className="mb-6 w-min">
          <Textarea value={formState.details} onChange={setValue} errorMessage={errors.details} />
        </div>

        <button
          type="submit"
          className={`
            block 
            ml-auto 
            rounded-full 
            w-16 h-16 
            border border-primary-850 
            hover:bg-primary-850 
            uppercase text-lg 
            hover:text-secondary-100
          `}
        >
          Send
        </button>
      </div>
    </form>
  )
}
