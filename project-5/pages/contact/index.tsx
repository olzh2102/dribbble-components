import { useContext } from 'react'

import { ContactFormFields } from 'common/types'
import { sendEmail } from 'common/utils'
import Form from '~components/contact-form'
import withLayout from '~components/layout/with-layout'
import { AlertContext } from '~contexts/alert-provider'

const Contact = () => {
  const { setAlert } = useContext(AlertContext)

  async function sendForm(formData: ContactFormFields) {
    try {
      setAlert({ show: true, severity: 'info', message: 'Sending email' })
      await sendEmail(formData)
      setAlert({ show: true, severity: 'success', message: 'All good' })
    } catch (error) {
      setAlert({ show: true, severity: 'error', message: 'Something went wrong' })
    }
  }

  return <Form onSubmit={sendForm} />
}

export default withLayout(Contact)
