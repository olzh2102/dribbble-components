import * as NextRouter from 'next/router'

import user from '@testing-library/user-event'

import { render, screen } from 'common/utils/test-utils'

import LangToggler from '.'

it('English language should be selected as default language', () => {
  jest.spyOn(NextRouter, 'useRouter').mockReturnValue({
    locales: ['en', 'de', 'ru'],
    locale: 'en',
    asPath: '/',
  } as any)

  render(<LangToggler />)

  const eng = screen.getByRole('link', { name: /en/i })
  const de = screen.getByRole('link', { name: /de/i })
  const ru = screen.getByRole('link', { name: /ru/i })

  expect(eng).toHaveClass('text-primary-zinc dark:text-primary-milk')
  expect(de).not.toHaveClass('text-primary-zinc dark:text-primary-milk')
  expect(ru).not.toHaveClass('text-primary-zinc dark:text-primary-milk')
})
