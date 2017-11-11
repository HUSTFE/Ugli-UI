import { addClassName, removeClassName } from '../classNames'

describe('addClassName func just like classList.add() except it can not change className directly', () => {
  it('test add className', () => {
    expect(addClassName('center', 'red')).toBe('center red')
    expect(addClassName('', 'center', 'red')).toContain('center red')
    expect(addClassName('center', 'red', 'active')).toBe('center red active')
  })
})

describe('removeClassName func is similar to classList.remove()', () => {
  it('test remove className', () => {
    expect(removeClassName('center red', 'center')).toBe('red')
    expect(removeClassName('center red active', 'red', 'center')).toBe('active')
  })
})
