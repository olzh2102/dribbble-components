import { ChangeEvent } from 'react'

import { motion } from 'framer-motion'

import { SERVICE_TYPES } from 'common/constants'
import { ServiceType } from 'common/types'

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
      <div className="flex flex-col gap-4 justify-between">
        {SERVICE_TYPES.map((service, i) => (
          <div key={service} className="border-2 rounded-sm p-4">
            <input
              className={`hidden peer/${service}`}
              type="radio"
              name="serviceType"
              id={service}
              value={service}
              checked={selectedValue === service}
              onChange={onSelect}
            />
            <label htmlFor={service}>
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
        role={errorMessage ? 'alert' : 'none'}
      >
        {errorMessage ? errorMessage : ''}
      </motion.span>
    </>
  )
}
