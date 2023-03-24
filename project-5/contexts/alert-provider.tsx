import { createContext, Dispatch, ReactNode, SetStateAction, useState } from 'react'

import Snackbar from '~components/snackbar'

type Alert = { show: boolean; severity?: 'success' | 'error' | 'info'; message?: string }

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
  const [alert, setAlert] = useState<Alert>({ show: false, message: '' })

  return (
    <AlertContext.Provider value={{ setAlert }}>
      {children}
      <Snackbar open={alert.show} onClose={() => setAlert({ show: false })} autoHideDuration={3000}>
        <div className={'p-2 rounded-md text-white ' + alertStyle[alert.severity || 'info']}>
          {alert.message}
        </div>
      </Snackbar>
    </AlertContext.Provider>
  )
}
