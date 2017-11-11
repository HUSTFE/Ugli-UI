import includes from '../includes'

describe('includes function test if one includes another', () => {
  it("pass 'ababa' and 'ab' should return true", () => {
    expect(includes('ababa', 'ab')).toBeTruthy()
  })
  it('empty string is substring', () => {
    expect(includes('aba', '')).toBeTruthy()
  })
  it('[1,2,3] includes 1', () => {
    expect(includes([1, 2, 3], 1))
  })
})
