import { ChangeEvent, Fragment } from 'react'

import { SERVICE_TYPES } from 'common/constants'
import { ServiceType } from 'common/types'

const labelConfig = {
  design: 'peer-checked/design:text-blue-500',
  branding: 'peer-checked/branding:text-blue-500',
  consulting: 'peer-checked/consulting:text-blue-500',
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
    <>
      {SERVICE_TYPES.map((service) => (
        <Fragment key={service}>
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
            {service}
          </label>
        </Fragment>
      ))}
    </>
  )
}
