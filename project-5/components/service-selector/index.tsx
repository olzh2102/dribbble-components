import { ChangeEvent } from 'react'

import { SERVICE_TYPES } from 'common/constants'
import { ServiceType } from 'common/types'

const labelConfig = {
  design:
    'peer-checked/design:text-[#a57548] peer-checked/design:border-[#a57548]',
  branding:
    'peer-checked/branding:text-[#a57548] peer-checked/branding:border-[#a57548]',
  consulting:
    'peer-checked/consulting:text-[#a57548] peer-checked/consulting:border-[#a57548]',
}

const labelCommonClassName =
  'uppercase w-40 h-52 rounded-md border border-primary-850 grid place-content-center border-2'

export default function ServiceSelector({
  selectedValue,
  onSelect,
  errorMessage,
}: {
  selectedValue?: ServiceType
  onSelect: (event: ChangeEvent<HTMLInputElement>) => void
  errorMessage: string | null
}) {
  return (
    <>
      {SERVICE_TYPES.map((service, i) => (
        <div key={service}>
          <input
            className={`hidden peer/${service}`}
            type="radio"
            name="serviceType"
            id={service}
            value={service}
            checked={selectedValue === service}
            onChange={onSelect}
          />
          <label
            className={labelConfig[service] + ' ' + labelCommonClassName}
            htmlFor={service}
          >
            <span className="mx-auto mb-3 w-20 h-20 rounded-full bg-[#d0b297] text-6xl text-[#a57548] font-medium relative">
              <span className="absolute -top-4 -left-1">{i + 1}</span>
            </span>
            <span className="text-center font-medium">{service}</span>
          </label>
        </div>
      ))}
      {errorMessage && (
        <span className="text-red-500" role="alert">
          {errorMessage}
        </span>
      )}
    </>
  )
}
