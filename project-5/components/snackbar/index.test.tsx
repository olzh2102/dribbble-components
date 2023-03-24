import { act, render } from 'common/utils/test-utils'

import Snackbar from '.'

describe('Snackbar', () => {
  beforeAll(() => jest.useFakeTimers())

  afterAll(() => jest.useRealTimers())

  it('should call onClose after duration time passed', () => {
    const onClose = jest.fn()
    render(
      <Snackbar open={true} onClose={onClose} autoHideDuration={2000}>
        message
      </Snackbar>
    )

    expect(onClose).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(1000)
      expect(onClose).not.toHaveBeenCalled()

      jest.advanceTimersByTime(3000)
      expect(onClose).toHaveBeenCalled()
    })
  })
})
