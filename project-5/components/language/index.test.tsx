import * as NextRouter from 'next/router'

import user from '@testing-library/user-event'

import { render, screen } from 'common/utils/test-utils'

import LangToggler from '.'

it('English language should be selected as default language', () => {
  render(<LangToggler />)

  const eng = screen.getByRole('radio', { name: /en/i })
  const de = screen.getByRole('radio', { name: /de/i })
  const ru = screen.getByRole('radio', { name: /ru/i })

  expect(eng).toBeChecked()
  expect(de).not.toBeChecked()
  expect(ru).not.toBeChecked()
})

it('router locale gets pushed once German language is clicked', async () => {
  const mockPush = jest.fn()

  jest.spyOn(NextRouter, 'useRouter').mockReturnValue({
    locales: ['en', 'de', 'ru'],
    locale: 'en',
    route: '/',
    push: mockPush,
  } as any)
  render(<LangToggler />)
  const de = screen.getByRole('radio', { name: /de/i })

  await user.click(de)

  expect(mockPush).toHaveBeenCalledWith('/', undefined, {
    locale: 'de',
  })
})
