import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from 'common/utils/test-utils'
import Header from '~components/header'

describe('Custom Cursor', () => {
  function setup() {
    return render(<Header />)
  }

  it('should render custom circle cursor', async () => {
    setup()

    const customCursor = screen.getByRole('custom-cursor')

    expect(customCursor).toBeInTheDocument()
    expect(customCursor).toHaveClass(
      'grid place-content-center',
      'absolute z-50',
      'w-6 h-6 rounded-full',
      'text-primary-milk dark:text-primary-zinc',
      'bg-primary-milk',
      'pointer-events-none',
      'mix-blend-difference'
    )
  })

  it('should render custom cursor size a bit smaller when text is hovered', async () => {
    setup()

    const TRANSFORM_FROM =
      'translateX(-50%) translateY(-50%) scale(1) translateZ(0)'
    const TRANSFORM_TO =
      'translateX(-50%) translateY(-50%) scale(0.30000000000000004) translateZ(0)'

    const projectsMenuItem = screen.getByText(/projects/i)
    const customCursor = screen.getByRole('custom-cursor')

    await waitFor(
      () => expect(customCursor).toHaveStyle({ transform: TRANSFORM_FROM }),
      {
        timeout: 2000,
      }
    )

    userEvent.hover(projectsMenuItem)

    await waitFor(
      () => expect(customCursor).toHaveStyle({ transform: TRANSFORM_TO }),
      {
        timeout: 2000,
      }
    )
  })
})
