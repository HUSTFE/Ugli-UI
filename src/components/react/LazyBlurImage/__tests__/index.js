import React from 'react'
import renderer from 'react-test-renderer'
import LazyBlurImage from '../index'

describe('LazyBlurImage', () => {
  it('LazyBlurImage renders without crash', () => {
    const component = renderer.create(
      <LazyBlurImage
        thumbSource="http://bucket-1252761181.costj.myqcloud.com/desktop-mini.jpg"
        source="http://bucket-1252761181.costj.myqcloud.com/desktop.jpg"
        alt="hehe"
        thumbAlt="hehe"
        height="auto"
        lazy
        withBlurShadow
      />
    )
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
    // return component
  })
})
