import { useState, ChangeEvent } from 'react'
import withLayout from '~components/layout/with-layout'

const Contact = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    details: '',
  })

  function setValue(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <form className="h-full flex">
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
      <div className="w-3/5 h-full grid place-content-center">
        <div>
          <label>
            Name
            <input
              type="text"
              name="name"
              value={formState.name}
              onChange={setValue}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={setValue}
            />
          </label>
        </div>
        <div>
          <label>
            Project details
            <textarea
              name="details"
              value={formState.details}
              onChange={setValue}
            />
          </label>
        </div>
        <button className="block ml-auto" type="submit">
          Send
        </button>
      </div>
    </form>
  )
}

export default withLayout(Contact)
