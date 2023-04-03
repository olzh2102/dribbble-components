import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/solid'

import Snackbar from '~components/snackbar'

type Severity = 'success' | 'error' | 'info'
type Alert = { show: boolean; severity?: Severity; message?: string }

const alertStyle = {
  success: 'bg-[#508991]',
  error: 'bg-[#db8a74]',
  info: 'bg-blue-300',
}

export const AlertContext = createContext<{
  setAlert: Dispatch<SetStateAction<Alert>>
}>({
  setAlert: () => null,
})

export default function AlertProvider({ children }: { children: ReactNode }) {
  const [alert, setAlert] = useState<Alert>({ show: false })

  return (
    <AlertContext.Provider value={{ setAlert }}>
      {children}
      <Snackbar open={alert.show} onClose={() => setAlert({ show: false })} autoHideDuration={3000}>
        <div
          className={
            'px-3 py-4 rounded text-white font-medium w-72 flex items-center gap-x-2 ' +
            alertStyle[alert.severity || 'info']
          }
        >
          {alert.severity && <SeverityIcon severity={alert.severity} />}
          <span>{alert.message}</span>
        </div>
      </Snackbar>
    </AlertContext.Provider>
  )
}

function SeverityIcon({ severity }: { severity: Severity }) {
  if (severity === 'error') return <ExclamationTriangleIcon className="w-5 h-5" />
  if (severity === 'success') return <CheckCircleIcon className="w-5 h-5" />

  return <InformationCircleIcon className="w-5 h-5" />
}
