import { ChangeEvent } from 'react'

import { motion } from 'framer-motion'

import { SERVICE_TYPES } from 'common/constants'
import { ServiceType } from 'common/types'

const labelConfig = {
  design:
    'peer-checked/design:text-primary-950 peer-checked/design:border-primary-950',
  branding:
    'peer-checked/branding:text-primary-950 peer-checked/branding:border-primary-950',
  consulting:
    'peer-checked/consulting:text-primary-950 peer-checked/consulting:border-primary-950',
}

const labelCommonClassName =
  'w-40 h-52 rounded-md border border-primary-850 grid place-content-center border-2'

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
      <div className="flex gap-4">
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
              className={`${labelConfig[service]} ${labelCommonClassName}`}
              htmlFor={service}
            >
              <span
                className={`
              relative
              mx-auto mb-6 
              w-20 h-20 
              rounded-full 
              bg-primary-850 
              text-6xl text-primary-950 
              `}
              >
                <span className="absolute -top-4 -left-0.5">{i + 1}</span>
              </span>
              <span className="text-center">{service}</span>
            </label>
          </div>
        ))}
      </div>
      <motion.span
        animate={errorMessage ? 'visible' : 'hidden'}
        transition={{ delay: 0.5 }}
        variants={{
          visible: { opacity: 1 },
          hidden: { opacity: 0 },
          initial: { opacity: 0 },
        }}
        className="text-primary-950"
        role="alert"
      >
        {errorMessage ? errorMessage : ''}
      </motion.span>
    </>
  )
}
