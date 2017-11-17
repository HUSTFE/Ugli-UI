import React from 'react'
import renderer from 'react-test-renderer'
import LazyBlurImage from '../index'

describe('LazyBlurImage', () => {
  it('snake spinner render without crash', () => {
    const component = renderer.create(<LazyBlurImage />)
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
  })
})
