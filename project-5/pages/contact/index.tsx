import { send } from '@emailjs/browser'

import ContactForm from '~components/contact-form'
import withLayout from '~components/layout/with-layout'

const Contact = () => {
  async function sendEmail(data: any) {
    const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID as string
    const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID as string
    const publicKey = process.env.NEXT_PUBLIC_PUBLIC_KEY as string

    try {
      const result = await send(serviceId, templateId, data, publicKey)
      console.log(result)
    } catch (error) {
      console.error(error)
    }
  }

  return <ContactForm onSubmit={sendEmail} />
}

export default withLayout(Contact)
