import { act, render } from 'common/utils/test-utils'

import Preloader from '.'

describe('Preloader', () => {
  beforeAll(() => jest.useFakeTimers())

  afterAll(() => jest.useRealTimers())

  it('should call setLoading after duration time passed', () => {
    const setLoading = jest.fn()
    render(<Preloader duration={2000} setLoading={setLoading} />)

    expect(setLoading).not.toHaveBeenCalled()

    act(() => {
      jest.advanceTimersByTime(1000)
      expect(setLoading).not.toHaveBeenCalled()

      jest.advanceTimersByTime(3000)
      expect(setLoading).toHaveBeenCalled()
    })
  })
})
