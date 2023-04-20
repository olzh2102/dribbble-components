import {
  render,
  screen,
  waitForElementToBeRemoved,
} from 'common/utils/test-utils'

import Preloader from '.'

describe('Preloader', () => {
  it('should call setLoading after duration time passed', async () => {
    render(<Preloader duration={100} />)

    expect(screen.getByTestId('preloader')).toBeInTheDocument()
    await waitForElementToBeRemoved(() => screen.getByTestId('preloader'))
    expect(screen.queryByTestId('preloader')).toBeNull()
  })
})
