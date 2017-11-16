import React from 'react'
import renderer from 'react-test-renderer'
import Swiper from '../index'

describe('Swiper', () => {
  it('Swiper component render without crash', () => {
    const component = renderer.create(<Swiper />)
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
  })
})
