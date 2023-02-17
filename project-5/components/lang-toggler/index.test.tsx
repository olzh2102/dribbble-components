import { useRouter as mockedUseRouter } from 'next/router'

import { render, screen, fireEvent } from 'common/utils/test-utils'

import LangToggler from '.'

describe('Language Toggler Component', () => {
  it('"english" language should be checked by default', () => {
    render(<LangToggler currentLang="en" />)
    expect(screen.getByRole('radio-en')).toHaveClass('checked')
    expect(screen.getByRole('radio-de')).not.toHaveClass('checked')
    expect(screen.getByRole('radio-ru')).not.toHaveClass('checked')
  })

  it('"german" should be checked once selected', async () => {
    const push = jest.fn()
    ;(mockedUseRouter as jest.Mock).mockImplementation(() => ({
      push,
      route: '/de',
    }))
    const { rerender } = render(<LangToggler currentLang="en" />)

    screen.getByRole('radio-de')

    fireEvent.click(screen.getByLabelText('de'))
    expect(push).toHaveBeenCalledWith('/de', undefined, {
      locale: 'de',
    })

    rerender(<LangToggler currentLang="de" />)

    expect(screen.getByRole('radio-de')).toHaveClass('checked')
    expect(screen.getByRole('radio-en')).not.toHaveClass('checked')
    expect(screen.getByRole('radio-ru')).not.toHaveClass('checked')
  })
})
