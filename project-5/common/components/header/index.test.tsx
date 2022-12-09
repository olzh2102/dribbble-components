import { render, screen, within } from 'common/utils/test-utils'
import { useRouter as mockedUseRouter } from 'next/router'
import Header from '.'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    route: '/',
    locale: 'en',
  })),
}))

describe('Navigation Menu', () => {
  it('"Home" item should be active by default', () => {
    render(<Header>yo</Header>)
    const homeItem = screen.getByText(/home/i).parentElement
    expect(homeItem).toBeInTheDocument()

    if (homeItem) {
      const { queryByRole } = within(homeItem)
      const activeMark = queryByRole('active-mark')
      expect(activeMark).toBeInTheDocument()
    }
  })

  it('should switch active menu item', () => {
    ;(mockedUseRouter as any).mockImplementation(() => ({ route: '/projects', locale: 'en' }))

    render(<Header>yo</Header>)
    const projectsItem = screen.getByText(/projects/i).parentElement
    expect(projectsItem).toBeInTheDocument()

    if (projectsItem) {
      const { queryByRole } = within(projectsItem)
      const activeMark = queryByRole('active-mark')
      expect(activeMark).toBeInTheDocument()
    }
  })
})
