import { useContext } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { send } from '@emailjs/browser'
import { ToastContainer, toast } from 'react-toastify'

import lang from 'common/lang.json'
import { ContactFormFields } from 'common/types'
import Form from '~components/contact-form'
import InstagramIcon from '~components/icons/instagram'
import LinkedinIcon from '~components/icons/linkedin'
import { withPageTransition } from '~components/layout'
import { CursorContext } from '~contexts/cursor-provider'
import { ThemeContext } from '~contexts/theme-provider'

const Contact = ({ serviceId, templateId, publicKey }) => {
  const { locale } = useRouter()
  const t = lang[locale]

  const { theme } = useContext(ThemeContext)
  const { onMouseOver, onMouseOut } = useContext(CursorContext)

  async function sendForm(formData: ContactFormFields) {
    const submission = send(serviceId, templateId, formData, publicKey)

    try {
      await toast.promise(submission, {
        pending: t['contact']['email']['pending'],
        success: t['contact']['email']['success'],
        error: t['contact']['email']['error'],
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 sm:w-min grid place-content-center gap-10 sm:p-10">
        <h1 className="font-bold sm:text-3xl text-5xl text-primary-zinc dark:text-primary-milk whitespace-nowrap uppercase">
          {t['contact']['header']}
        </h1>
        <div className="sm:ml-20">
          <Form onSubmit={sendForm} />
        </div>
      </div>
      <div
        onMouseOver={onMouseOver('a')}
        onMouseOut={onMouseOut}
        className="flex justify-end gap-3 items-center mt-auto mb-0 p-5 text-primary-milk dark:text-primary-zinc"
      >
        <Link href="https://www.instagram.com/natalliaraksha/?hl=en">
          <InstagramIcon />
        </Link>
        <Link href="https://www.linkedin.com/in/natallia-raksha-832b72115/">
          <LinkedinIcon />
        </Link>
      </div>
      <ToastContainer theme={theme} />
    </div>
  )
}

export default withPageTransition(Contact)

export async function getStaticProps() {
  return {
    props: {
      serviceId: process.env.NEXT_PUBLIC_SERVICE_ID || null,
      templateId: process.env.NEXT_PUBLIC_TEMPLATE_ID || null,
      publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY || null,
    },
  }
}
