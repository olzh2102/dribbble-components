import { useContext } from 'react'

import { send } from '@emailjs/browser'

import { ContactFormFields } from 'common/types'
import Form from '~components/contact-form'
import withLayout from '~components/layout/with-layout'
import { AlertContext } from '~contexts/alert-provider'

const Contact = ({ serviceId, templateId, publicKey }) => {
  const { setAlert } = useContext(AlertContext)

  async function sendForm(formData: ContactFormFields) {
    try {
      setAlert({ show: true, severity: 'info', message: 'Sending email' })
      await send(serviceId, templateId, formData, publicKey)
      setAlert({ show: true, severity: 'success', message: 'All good' })
    } catch (error) {
      setAlert({
        show: true,
        severity: 'error',
        message: 'Something went wrong',
      })
    }
  }

  return <Form onSubmit={sendForm} />
}

export default withLayout(Contact)

export async function getStaticProps() {
  return {
    props: {
      serviceId: process.env.SERVICE_ID,
      templateId: process.env.TEMPLATE_ID,
      publicKey: process.env.PUBLIC_KEY,
    },
  }
}
