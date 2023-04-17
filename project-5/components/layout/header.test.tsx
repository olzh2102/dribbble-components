import { useRouter as mockedUseRouter } from 'next/router'

import { render, screen, within } from 'common/utils/test-utils'

import Header from './header'

describe('Navigation Menu', () => {
  it('"Home" item should be active by default', () => {
    render(<Header />)
    const homeItem = screen.getByText(/home/i).parentElement
    expect(homeItem).toBeInTheDocument()

    if (homeItem) {
      const { queryByRole } = within(homeItem)
      const activeMark = queryByRole('active-mark')
      expect(activeMark).toBeInTheDocument()
    }
  })

  it('should switch active menu item', () => {
    ;(mockedUseRouter as any).mockImplementation(() => ({
      route: '/projects',
      locales: ['en', 'de', 'ru'],
      locale: 'en',
      asPath: '/',
    }))

    render(<Header />)
    const projectsItem = screen.getByText(/projects/i).parentElement
    expect(projectsItem).toBeInTheDocument()

    if (projectsItem) {
      const { queryByRole } = within(projectsItem)
      const activeMark = queryByRole('active-mark')
      expect(activeMark).toBeInTheDocument()
    }
  })
})
