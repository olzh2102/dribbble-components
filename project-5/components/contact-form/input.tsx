import { ChangeEvent, useContext } from 'react'

import { ContactFormFields } from 'common/types'
import { CursorContext } from '~contexts/cursor-provider'

export default function Input({
  name,
  value,
  onChange,
  errorMessage,
}: {
  name: keyof ContactFormFields
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  errorMessage: string | null
}) {
  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  return (
    <>
      <label className="flex flex-col uppercase">
        {name}
        <input
          className="rounded p-2 h-12 border border-red-500 dark:border-primary-850 focus:outline-none dark:bg-secondary-100 cursor-none"
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          onMouseOver={(e) => onMouseOver(e, 'input')}
          onMouseOut={(e) => onMouseOut(e, 'input')}
        />
      </label>
      {errorMessage && (
        <span className="text-[#a57548]" role="alert">
          {errorMessage}
        </span>
      )}
    </>
  )
}
