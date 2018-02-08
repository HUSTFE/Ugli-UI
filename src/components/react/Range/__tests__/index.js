import React from 'react'
import renderer from 'react-test-renderer'
import Range from '../index'

describe('Range', () => {
  it('snake spinner render without crash', () => {
    const component = renderer.create(<Range />)
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
  })
})
