import { render, screen, fireEvent } from 'common/utils/test-utils'

import ContactForm from '.'

const FIELDS_LENGTH = 3

const onSubmit = jest.fn()

describe('Contact Form', () => {
  it('should display required error when value is invalid', async () => {
    render(<ContactForm onSubmit={onSubmit} />)

    const submitButton = screen.getByRole('button', { name: /send/i })

    fireEvent.submit(submitButton)

    expect(await screen.findAllByRole('alert')).toHaveLength(FIELDS_LENGTH)
    expect(onSubmit).not.toBeCalled()
  })

  it('should display matching error when name is invalid', async () => {
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
    expect(onSubmit).not.toBeCalled()
  })

  it('should not display error when value is valid', async () => {
    render(<ContactForm onSubmit={onSubmit} />)

    const name = screen.getByRole('textbox', { name: /name/i })
    const email = screen.getByRole('textbox', { name: /email/i })
    const details = screen.getByRole('textbox', { name: /details/i })
    const submitButton = screen.getByRole('button', { name: /send/i })

    fireEvent.input(name, { target: { value: 'John' } })
    fireEvent.input(email, { target: { value: 'johndoe@gmail.com' } })
    fireEvent.input(details, { target: { value: 'project details' } })

    fireEvent.submit(submitButton)

    expect(screen.queryAllByRole('alert')).toHaveLength(0)
    expect(onSubmit).toBeCalledWith({
      name: 'John',
      email: 'johndoe@gmail.com',
      details: 'project details',
    })
    expect(name).toHaveValue('')
    expect(email).toHaveValue('')
    expect(details).toHaveValue('')
  })
})
