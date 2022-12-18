import userEvent from '@testing-library/user-event'
import { render, screen } from 'common/utils/test-utils'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    route: '/',
    locale: 'en',
  })),
}))

describe('Custom Cursor', () => {
  function setup() {
    const user = userEvent.setup()
    return render(
      <span>test component with custom cursor context wrapper</span>
    )
  }

  it('should render custom circle cursor', async () => {
    const { debug } = setup()

    const customCursor = screen.getByRole('custom-cursor')
    debug(customCursor)

    expect(customCursor).toBeInTheDocument()
    expect(customCursor).toHaveClass(
      'w-4 h-4',
      'bg-secondary-200 dark:bg-secondary-400',
      'rounded-full',
      'z-50',
      'pointer-events-none'
    )
  })

  it.todo('should render custom cursor size a bit smaller when text is hovered')
})
