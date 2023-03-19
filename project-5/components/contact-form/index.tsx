import { FormEvent, useContext } from 'react'

import ServiceSelector from '~components/service-selector'
import { CursorContext } from '~contexts/cursor-provider'
import useForm from '~hooks/use-form'

export default function ContactForm({
  onSubmit,
}: {
  onSubmit: (
    data: { name: string; email: string; details: string },
    event?: FormEvent<HTMLFormElement>
  ) => void
}) {
  const { onMouseOver, onMouseOut } = useContext(CursorContext)
  const { formState, errors, setValue, handleSubmit } = useForm()

  return (
    <form className="h-full flex" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-2/5 bg-red-300 h-full rounded-l-md grid place-content-center">
        <div className="flex flex-col gap-2">
          <h2>What can I do for you?</h2>
          <div className="flex gap-2">
            <ServiceSelector selectedValue={formState.serviceType} setValue={setValue} />
          </div>
          {errors.serviceType && (
            <span className="text-red-500" role="alert">
              {errors.serviceType}
            </span>
          )}
        </div>
      </div>
      <div className="w-3/5 h-full grid place-content-center dark:text-white">
        <div className="flex gap-4 mb-6">
          <div className="w-min">
            <label className="flex flex-col">
              Name
              <input
                className="rounded p-2 border border-red-500 dark:border-primary-850 focus:outline-none dark:bg-secondary-100 cursor-none"
                type="text"
                name="name"
                value={formState.name}
                onChange={setValue}
                onMouseOver={(e) => onMouseOver(e, 'input')}
                onMouseOut={(e) => onMouseOut(e, 'input')}
              />
            </label>
            {errors.name && (
              <span className="text-red-500" role="alert">
                {errors.name}
              </span>
            )}
          </div>
          <div className="w-min">
            <label className="flex flex-col">
              Email
              <input
                className="rounded p-2 border border-red-500 dark:border-primary-850 focus:outline-none dark:bg-secondary-100 cursor-none"
                type="email"
                name="email"
                value={formState.email}
                onChange={setValue}
                onMouseOver={(e) => onMouseOver(e, 'input')}
                onMouseOut={(e) => onMouseOut(e, 'input')}
              />
            </label>
            {errors.email && (
              <span className="text-red-500" role="alert">
                {errors.email}
              </span>
            )}
          </div>
        </div>
        <div className="mb-6 w-min">
          <label className="flex flex-col">
            Project details
            <textarea
              className="rounded p-2 border border-red-500 dark:border-primary-850 resize-none focus:outline-none dark:bg-secondary-100 cursor-none"
              name="details"
              value={formState.details}
              onChange={setValue}
              onMouseOver={(e) => onMouseOver(e, 'textarea')}
              onMouseOut={(e) => onMouseOut(e, 'textarea')}
            />
          </label>
          {errors.details && (
            <span className="text-red-500" role="alert">
              {errors.details}
            </span>
          )}
        </div>
        <button
          className="block ml-auto rounded w-16 h-16 rounded-full border border-primary-850 uppercase text-lg hover:bg-primary-850 hover:text-secondary-100"
          type="submit"
        >
          Send
        </button>
      </div>
    </form>
  )
}
