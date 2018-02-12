import throttle from '../utils/throttle'

jest.useFakeTimers()

describe('throttle', () => {
  it('calls the callback 2 times', () => {
    const callback = jest.fn()
    const dfn = throttle(callback)

    dfn()
    dfn()
    setTimeout(() => dfn(), 20)

    jest.runAllTimers()

    expect(setTimeout).toHaveBeenCalledTimes(2)
    expect(callback).toHaveBeenCalledTimes(2)
  })
})
