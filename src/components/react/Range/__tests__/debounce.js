import debounce from '../utils/debounce'

jest.useFakeTimers()

describe('debounce', () => {
  it('calls the callback 1 times', () => {
    const callback = jest.fn()
    const dfn = debounce(callback)

    dfn()
    dfn()
    dfn()

    jest.runAllTimers()

    expect(setTimeout).toHaveBeenCalledTimes(3)
    expect(callback).toHaveBeenCalledTimes(1)
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 100)
  })
})
