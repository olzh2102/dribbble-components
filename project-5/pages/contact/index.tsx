import { ContactFormFields } from 'common/types'
import { sendEmail } from 'common/utils'
import Form from '~components/contact-form'
import withLayout from '~components/layout/with-layout'

const Contact = () => {
  async function sendForm(formData: ContactFormFields) {
    try {
      await sendEmail(formData)
      console.log('OK')
    } catch (error) {
      console.error(error)
    }
  }

  return <Form onSubmit={sendForm} />
}

export default withLayout(Contact)
