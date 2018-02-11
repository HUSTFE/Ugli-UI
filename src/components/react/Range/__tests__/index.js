import React from 'react'
import renderer from 'react-test-renderer'
import Btn from '../Btn'

describe('RangeButton', () => {
  it('RangeBtn render without crash', () => {
    const component = renderer.create(<Btn offset={2} />)
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
  })
})
