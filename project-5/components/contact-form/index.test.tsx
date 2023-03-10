import { render, screen, fireEvent, renderHook } from 'common/utils/test-utils'
import useForm from '~hooks/use-form'

import ContactForm from '.'

const FIELDS_LENGTH = 3

const onSubmit = jest.fn()

describe('Contact Form', () => {
  function setup() {
    return renderHook(useForm)
  }

  it('should display required error when value is invalid', async () => {
    render(<ContactForm onSubmit={onSubmit} />)
    const submitButton = screen.getByRole('button', { name: /send/i })

    fireEvent.submit(submitButton)

    expect(await screen.findAllByRole('alert')).toHaveLength(FIELDS_LENGTH)
    expect(onSubmit).not.toBeCalled()
  })
  it.skip('should display matching error when name is invalid', async () => {
    render(<ContactForm onSubmit={onSubmit} />)
    const name = screen.getByRole('textbox', { name: /name/i })
    const email = screen.getByRole('textbox', { name: /email/i })
    const details = screen.getByRole('textbox', { name: /details/i })
    const submitButton = screen.getByRole('button', { name: /send/i })

    fireEvent.input(name, { target: { value: 'J' } })
    fireEvent.input(email, { target: { value: 'johndoe@gmail.com' } })
    fireEvent.input(details, { target: { value: 'project details' } })

    fireEvent.submit(submitButton)

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
  })

  // it('"german" should be checked once selected', async () => {
  //   const push = jest.fn()
  //   ;(mockedUseRouter as jest.Mock).mockImplementation(() => ({
  //     push,
  //     route: '/de',
  //   }))
  //   const { rerender } = render(<LangToggler currentLang="en" />)

  //   screen.getByRole('radio-de')

  //   fireEvent.click(screen.getByLabelText('de'))
  //   expect(push).toHaveBeenCalledWith('/de', undefined, {
  //     locale: 'de',
  //   })

  //   rerender(<LangToggler currentLang="de" />)

  //   expect(screen.getByRole('radio-de')).toHaveClass('checked')
  //   expect(screen.getByRole('radio-en')).not.toHaveClass('checked')
  //   expect(screen.getByRole('radio-ru')).not.toHaveClass('checked')
  // })
})
