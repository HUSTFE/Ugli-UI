import React from 'react'
import renderer from 'react-test-renderer'
import ActionSheet from '../index'

describe('ActionSheet', () => {
  it('snake spinner render without crash', () => {
    const component = renderer.create(<ActionSheet />)
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
  })
})
