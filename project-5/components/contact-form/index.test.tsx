import user from '@testing-library/user-event'

import { render, screen } from 'common/utils/test-utils'

import ContactForm from '.'

const FIELDS_LENGTH = 4

const onSubmit = jest.fn()

describe('Contact Form', () => {
  it('should display required error when value is invalid', async () => {
    render(<ContactForm onSubmit={onSubmit} />)

    const submitButton = screen.getByRole('button', { name: /send/i })

    await user.click(submitButton)

    const fieldAlerts = await screen.findAllByRole('alert')

    expect(fieldAlerts).toHaveLength(FIELDS_LENGTH)
    expect(onSubmit).not.toBeCalled()
  })

  it('should display matching error when name is invalid', async () => {
    render(<ContactForm onSubmit={onSubmit} />)

    const name = screen.getByRole('textbox', { name: /name/i })
    const email = screen.getByRole('textbox', { name: /email/i })
    const details = screen.getByRole('textbox', { name: /details/i })
    const designService = screen.getByRole('radio', { name: /design/i })
    const submitButton = screen.getByRole('button', { name: /send/i })

    await user.type(name, 'J')
    await user.type(email, 'johndoe@gmail.com')
    await user.type(details, 'project details')
    await user.click(designService)
    await user.click(submitButton)

    expect(await screen.findAllByRole('alert')).toHaveLength(1)
    expect(onSubmit).not.toBeCalled()
  })

  it('should not display error when value is valid', async () => {
    render(<ContactForm onSubmit={onSubmit} />)

    const name = screen.getByRole('textbox', { name: /name/i })
    const email = screen.getByRole('textbox', { name: /email/i })
    const details = screen.getByRole('textbox', { name: /details/i })
    const designService = screen.getByRole('radio', { name: /design/i })
    const submitButton = screen.getByRole('button', { name: /send/i })

    await user.type(name, 'John')
    await user.type(email, 'johndoe@gmail.com')
    await user.type(details, 'project details')
    await user.click(designService)

    await user.click(submitButton)

    expect(screen.queryAllByRole('alert')).toHaveLength(0)
    expect(onSubmit).toBeCalledWith({
      name: 'John',
      email: 'johndoe@gmail.com',
      details: 'project details',
      serviceType: 'design',
    })
    expect(name).toHaveValue('')
    expect(email).toHaveValue('')
    expect(details).toHaveValue('')
  })
})
