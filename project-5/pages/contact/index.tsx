import ContactForm from '~components/contact-form'
import withLayout from '~components/layout/with-layout'

const Contact = () => {
  return <ContactForm onSubmit={console.log} />
}

export default withLayout(Contact)
