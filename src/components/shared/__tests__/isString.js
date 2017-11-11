import isString from '../isString'

describe('isString func test the param is string or not', () => {
  it('pass number, array, object should return false', () => {
    expect(isString(123)).toBeFalsy()
    expect(isString([])).toBeFalsy()
    expect(isString({})).toBeFalsy()
  })
  it('pass normal string should return true', () => {
    expect(isString('str')).toBeTruthy()
  })
})
