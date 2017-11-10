import React from 'react'
import renderer from 'react-test-renderer'
import Swipe from '../index'

describe('Swipe', () => {
  it('snake spinner render without crash', () => {
    const component = renderer.create(<Swipe />)
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
  })
})
