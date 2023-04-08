import { FormEvent } from 'react'

import { ContactFormFields } from 'common/types'
import ServiceSelector from '~components/service-selector'
import useForm from '~hooks/use-form'

import Input from './input'
import Textarea from './textarea'

export default function ContactForm({
  onSubmit,
}: {
  onSubmit: (data: ContactFormFields, event?: FormEvent<HTMLFormElement>) => Promise<void>
}) {
  const { formState, errors, setValue, handleSubmit, isDisabled } = useForm()

  return (
    <form className="h-full flex" onSubmit={handleSubmit(onSubmit)}>
      <div
        className={`
        w-2/5 bg-[#e0d8cc] dark:bg-secondary-650 rounded-l-md 
        grid place-content-center space-y-4
        font-medium uppercase text-secondary-100 dark:text-primary-850 
      `}
      >
        <h2 className="text-2xl">what can I do for you ?</h2>
        <div className="flex flex-col gap-4">
          <ServiceSelector
            selectedValue={formState.serviceType}
            onSelect={setValue}
            errorMessage={errors.serviceType}
          />
        </div>
      </div>

      <div className="w-3/5 dark:text-white grid place-content-center mt-28 space-y-6">
        <div className="flex gap-4 w-min">
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
        </div>

        <Textarea value={formState.details} onChange={setValue} errorMessage={errors.details} />

        <button
          type="submit"
          className={`
            block 
            ml-auto 
            rounded-md
            py-2 px-6 
            border border-primary-850 
            dark:enabled:hover:bg-primary-850 
            dark:disabled:hover:bg-primary-850/50
            enabled:hover:bg-primary-950
            disabled:hover:bg-primary-950/50
            uppercase text-lg 
            dark:hover:text-secondary-100
            hover:text-primary-850
            disabled:cursor-none
          `}
          disabled={isDisabled}
        >
          Send
        </button>
      </div>
    </form>
  )
}
