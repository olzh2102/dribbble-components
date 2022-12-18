import userEvent from '@testing-library/user-event'
import Header from 'common/components/header'
import { render, screen, waitFor } from 'common/utils/test-utils'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    route: '/',
    locale: 'en',
  })),
}))

describe('Custom Cursor', () => {
  function setup() {
    return render(
      <Header>test component with custom cursor context wrapper</Header>
    )
  }

  it('should render custom circle cursor', async () => {
    setup()

    const customCursor = screen.getByRole('custom-cursor')

    expect(customCursor).toBeInTheDocument()
    expect(customCursor).toHaveClass(
      'w-4 h-4',
      'bg-secondary-200 dark:bg-secondary-400',
      'rounded-full',
      'z-50',
      'pointer-events-none'
    )
  })

  it('should render custom cursor size a bit smaller when text is hovered', async () => {
    setup()

    const TRANSFORM_FROM =
      'translateX(-50%) translateY(-50%) scale(1) translateZ(0)'
    const TRANSFORM_TO =
      'translateX(-50%) translateY(-50%) scale(0.5) translateZ(0)'

    const projectsMenuItem = screen.getByText(/projects/i)
    const customCursor = screen.getByRole('custom-cursor')

    await waitFor(
      () => expect(customCursor).toHaveStyle({ transform: TRANSFORM_FROM }),
      { timeout: 1200 }
    )

    userEvent.hover(projectsMenuItem)

    await waitFor(
      () => expect(customCursor).toHaveStyle({ transform: TRANSFORM_TO }),
      { timeout: 1200 }
    )
  })
})
