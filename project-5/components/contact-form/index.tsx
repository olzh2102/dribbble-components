import { FormEvent } from 'react'

import useForm from '~hooks/use-form'

export default function ContactForm<T>({
  onSubmit,
}: {
  onSubmit: (
    data: { name: string; email: string; details: string },
    event?: FormEvent<HTMLFormElement>
  ) => void
}) {
  const { formState, errors, setValue, handleSubmit } = useForm()

  return (
    <form className="h-full flex" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-2/5 bg-red-300 h-full rounded-l-md grid place-content-center">
        <div className="flex gap-2">
          <h2>What can I do for you?</h2>
          <div className="uppercase w-[150px] h-[150px] rounded border border-blue-500 grid place-content-center">
            Design
          </div>
          <div className="uppercase w-[150px] h-[150px] rounded border border-blue-500 grid place-content-center">
            Branding
          </div>
          <div className="uppercase w-[150px] h-[150px] rounded border border-blue-500 grid place-content-center">
            Consulting
          </div>
        </div>
        <div>
          <h2>Budget in EUR</h2>
        </div>
      </div>
      <div className="w-3/5 h-full grid place-content-center dark:text-white">
        <div className="flex gap-4 mb-6">
          <div className="w-min">
            <label className="flex flex-col">
              Name
              <input
                className="rounded p-2 border border-red-500 dark:border-primary-850 focus:outline-none dark:bg-secondary-100"
                type="text"
                name="name"
                value={formState.name}
                onChange={setValue}
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
                className="rounded p-2 border border-red-500 dark:border-primary-850 focus:outline-none dark:bg-secondary-100"
                type="email"
                name="email"
                value={formState.email}
                onChange={setValue}
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
              className="rounded p-2 border border-red-500 dark:border-primary-850 resize-none focus:outline-none dark:bg-secondary-100"
              name="details"
              value={formState.details}
              onChange={setValue}
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
