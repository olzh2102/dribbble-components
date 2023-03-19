import { ChangeEvent, useContext } from 'react'

import { CursorContext } from '~contexts/cursor-provider'

export default function Textarea({
  value,
  onChange,
  errorMessage,
}: {
  value: string
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
  errorMessage: string | null
}) {
  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  return (
    <>
      <label className="flex flex-col">
        Project details
        <textarea
          className="rounded p-2 border border-red-500 dark:border-primary-850 resize-none focus:outline-none dark:bg-secondary-100 cursor-none"
          name="details"
          value={value}
          onChange={onChange}
          onMouseOver={(e) => onMouseOver(e, 'textarea')}
          onMouseOut={(e) => onMouseOut(e, 'textarea')}
        />
      </label>
      {errorMessage && (
        <span className="text-red-500" role="alert">
          {errorMessage}
        </span>
      )}
    </>
  )
}
