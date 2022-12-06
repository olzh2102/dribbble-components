import { render, screen, within } from 'common/utils/test-utils'
import { useRouter as mockedUseRouter } from 'next/router'
import Header, { activeClassName } from '.'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    route: '/',
    locale: 'en',
  })),
}))

describe('Navigation Menu', () => {
  it('"Home" item should be active by default', () => {
    render(<Header>yo</Header>)
    const menuItems = screen.getAllByRole('listitem')

    const homeItem = menuItems.find((item) => {
      const { getByText } = within(item)
      return getByText(/home/i)
    })

    expect(homeItem).toBeInTheDocument()
    expect(homeItem).toHaveClass(activeClassName)
  })

  it('should switch active menu item', async () => {
    ;(mockedUseRouter as any).mockImplementation(() => ({ route: '/projects', locale: 'en' }))
    render(<Header>yo</Header>)
    const menuItems = screen.getAllByRole('listitem')

    const projectsItem = menuItems.find((item) => {
      const { queryByText } = within(item)
      return queryByText(/projects/i)
    })

    expect(projectsItem).toBeInTheDocument()
    expect(projectsItem).toHaveClass(activeClassName)
  })
})
