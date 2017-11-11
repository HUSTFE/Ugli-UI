import React from 'react'
import renderer from 'react-test-renderer'
import Calendar from '../index'

describe('Calendar', () => {
  it('snake spinner render without crash', () => {
    const component = renderer.create(<Calendar />)
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
  })
})
