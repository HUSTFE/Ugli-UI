import React from 'react'
import renderer from 'react-test-renderer'
import Rating from '../index'

describe('Rating', () => {
  it('snake spinner render without crash', () => {
    const component = renderer.create(<Rating />)
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
  })
})
