// const labelClassName =
//   'uppercase w-[150px] h-[150px] rounded border border-blue-500 grid place-content-center'

import { ChangeEvent } from 'react'

import { SERVICE_TYPES } from 'common/constants'
import { ServiceType } from 'common/types'

const labelConfig = {
  design: 'peer-checked/design:text-primary-200 dark:peer-checked/design:text-secondary-300',
  branding: 'peer-checked/branding:text-primary-200 dark:peer-checked/branding:text-secondary-300',
  consulting:
    'peer-checked/consulting:text-primary-200 dark:peer-checked/consulting:text-secondary-300',
}

const labelCommonClassName =
  'uppercase w-[150px] h-[150px] rounded border border-blue-500 grid place-content-center'

export default function ServiceSelector({
  selectedValue,
  setValue,
}: {
  selectedValue?: ServiceType
  setValue: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}) {
  return (
    <div className="flex gap-4"div className="flex gap-4">
      {SERVICE_TYPES.map((service) => (
        <>
          <input
            className={`hidden peer/${service}`}
            type="radio"
            name="serviceType"
            id={service}
            value={service}
            checked={selectedValue === service}
            onChange={setValue}
          />
          <label className={labelConfig[service] + ' ' + labelCommonClassName} htmlFor={service}>
            Design
          </label>
        </>
      ))}
    </divdiv>
  )
}
