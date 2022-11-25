import { fireEvent, render, screen } from 'common/utils/test-utils'
import ThemeToggler from '.'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: () => {},
  })),
}))

describe('Theme Toggler Component', () => {
  it('should not contain the "dark" class initially attached to the html', () => {
    const isDark = document.documentElement.classList.contains('dark')
    expect(isDark).toBe(false)
  })

  it('should toggle the "dark" class from the html', () => {
    render(<ThemeToggler />)

    const btn = screen.getByRole('moon-btn')
    fireEvent.click(btn)

    const isDark = document.documentElement.classList.contains('dark')
    expect(isDark).toBe(true)
  })
})
