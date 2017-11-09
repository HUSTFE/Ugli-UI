import React from 'react'
import renderer from 'react-test-renderer'
import Indicator from '../index'

describe('Indicator', () => {
  it('snake spinner render without crash', () => {
    const component = renderer.create(<Indicator />)
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
  })
})
