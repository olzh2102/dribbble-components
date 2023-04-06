import { useContext } from 'react'

import { send } from '@emailjs/browser'
import { ToastContainer, toast } from 'react-toastify'

import { ContactFormFields } from 'common/types'
import Form from '~components/contact-form'
import { withPageTransition } from '~components/layout'
import { ThemeContext } from '~contexts/theme-provider'

const Contact = ({ serviceId, templateId, publicKey }) => {
  const { theme } = useContext(ThemeContext)

  async function sendForm(formData: ContactFormFields) {
    try {
      toast.info('Sending email')
      await send(serviceId, templateId, formData, publicKey)
      toast.success('All good')
    } catch (error) {
      toast.error('Something went wrong')
    }
  }

  return (
    <>
      <Form onSubmit={sendForm} />
      <ToastContainer theme={theme} autoClose={3000} />
    </>
  )
}

export default withPageTransition(Contact)

export async function getStaticProps() {
  return {
    props: {
      serviceId: process.env.SERVICE_ID || null,
      templateId: process.env.TEMPLATE_ID || null,
      publicKey: process.env.PUBLIC_KEY || null,
    },
  }
}
