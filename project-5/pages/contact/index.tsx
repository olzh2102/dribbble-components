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
      <div className="w-2/5 bg-red-300 h-full rounded-l-md"></div>
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
