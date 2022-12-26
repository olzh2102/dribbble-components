import { act, renderHook } from 'common/utils/test-utils'

import useCounter from './use-counter'

describe('useCounter', () => {
  beforeAll(() => jest.useFakeTimers())

  afterAll(() => jest.useRealTimers())

  it('should use counter', () => {
    const from = 0
    const to = 100
    const duration = 4000
    const { result } = renderHook(() => useCounter({ from, to, duration }))

    expect(result.current).toBe(from)

    act(() => {
      jest.advanceTimersByTime(duration / 2)
    })

    expect(result.current).toBe((to - from) / 2)

    act(() => {
      jest.advanceTimersByTime(duration / 2)
    })

    expect(result.current).toBe(to)
  })
})
