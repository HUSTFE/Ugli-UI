import React from 'react'
import renderer from 'react-test-renderer'
import Range from '../index'

describe('Range', () => {
  it('snake spinner render without crash', () => {
    const component = renderer.create(<Range max={10} min={2} value={5} />)
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
  })
})
