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
    const submission = new Promise((res) => res(formData)) // send(serviceId, templateId, formData, publicKey)

    await toast.promise(submission, {
      pending: 'Sending an email',
      success: 'Email was send successfully',
      error: 'Something went wrong',
    })
  }

  return (
    <div className="h-full flex flex-col p-10">
      <div className="flex-1 w-min grid place-content-center gap-10">
        <h1 className="font-semibold text-7xl text-primary-zinc dark:text-primary-milk whitespace-nowrap">
          Let&apos;s chat !
        </h1>
        <div className="ml-10">
          <Form onSubmit={sendForm} />
        </div>
      </div>
      <div className="mt-auto mb-0">here goes social link icons</div>
      <ToastContainer theme={theme} autoClose={3000} />
    </div>
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
