import { useRouter as mockedUseRouter } from 'next/router'

import user from '@testing-library/user-event'

import { render, screen } from 'common/utils/test-utils'

import LangToggler from '.'

describe('Language Toggler Component', () => {
  it('"english" language should be checked by default', () => {
    render(<LangToggler currentLang="en" />)
    expect(screen.getByRole('radio-en')).toBeChecked()
    expect(screen.getByRole('radio-de')).not.toBeChecked()
    expect(screen.getByRole('radio-ru')).not.toBeChecked()
  })

  it('"german" should be checked once selected', async () => {
    const push = jest.fn()
    ;(mockedUseRouter as jest.Mock).mockImplementation(() => ({
      push,
      route: '/de',
    }))
    const { rerender } = render(<LangToggler currentLang="en" />)

    screen.getByRole('radio-de')

    await user.click(screen.getByLabelText('de'))
    expect(push).toHaveBeenCalledWith('/de', undefined, {
      locale: 'de',
    })

    rerender(<LangToggler currentLang="de" />)

    expect(screen.getByRole('radio-de')).toBeChecked()
    expect(screen.getByRole('radio-en')).not.toBeChecked()
    expect(screen.getByRole('radio-ru')).not.toBeChecked()
  })
})
