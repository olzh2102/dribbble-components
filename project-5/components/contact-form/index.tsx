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
  ) => void
}) {
  const { formState, errors, setValue, handleSubmit } = useForm()

  return (
    <form className="h-full flex" onSubmit={handleSubmit(onSubmit)}>
      <div className="h-full w-2/5 bg-[#474747] rounded-l-md space-y-4 grid place-content-center text-primary-850">
        <h2 className="text-2xl text-primary-850 font-medium uppercase">
          What can I do for you ?
        </h2>
        <div className="flex gap-4 place-">
          <ServiceSelector
            selectedValue={formState.serviceType}
            onSelect={setValue}
            errorMessage={errors.serviceType}
          />
        </div>
      </div>

      <div className="h-full w-3/5 mt-14 dark:text-white grid place-content-center">
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
        <div className="mb-6">
          <Textarea
            value={formState.details}
            onChange={setValue}
            errorMessage={errors.details}
          />
        </div>

        <button
          type="submit"
          className={`
            block 
            ml-auto 
            rounded-md
            py-2 px-6 
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
