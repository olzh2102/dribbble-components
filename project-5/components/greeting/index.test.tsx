import { render, screen } from 'common/utils/test-utils'

import Greeting from '.'

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    locale: 'en',
  })),
}))

describe('Greeting Component', () => {
  beforeAll(() => jest.useFakeTimers())
  afterAll(() => jest.useRealTimers())

  it('should say "Good morning" if hours between 4 and 12', () => {
    const mockedHours = 7
    const mockedDate = new Date(`December 17, 1995 ${mockedHours}:24:00`)
    jest.setSystemTime(mockedDate)

    render(<Greeting />)

    const greeting = screen.getByText(/good morning/i)

    expect(greeting).toBeInTheDocument()
  })

  it('should say "Good afternoon" if hours between 12 and 17', () => {
    const mockedHours = 15
    const mockedDate = new Date(`December 17, 1995 ${mockedHours}:24:00`)
    jest.setSystemTime(mockedDate)

    render(<Greeting />)

    const greeting = screen.getByText(/good afternoon/i)

    expect(greeting).toBeInTheDocument()
  })

  it('should say "Good evening" if hours between 17 and 4', () => {
    const mockedHours = 21
    const mockedDate = new Date(`December 17, 1995 ${mockedHours}:24:00`)
    jest.setSystemTime(mockedDate)

    render(<Greeting />)

    const greeting = screen.getByText(/good evening/i)

    expect(greeting).toBeInTheDocument()
  })
})
