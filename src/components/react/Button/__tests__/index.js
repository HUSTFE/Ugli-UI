import React from 'react'
import renderer from 'react-test-renderer'
import Button from '../index'

describe('Button', () => {
  it('snake spinner render without crash', () => {
    const component = renderer.create(<Button text="Button" />)
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
  })
})
