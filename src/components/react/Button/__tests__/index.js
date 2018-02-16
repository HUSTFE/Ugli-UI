import React from 'react'
import renderer from 'react-test-renderer'
import Button from '../index'
import ThemeProvider from '../../ThemeProvider/index'

describe('Button', () => {
  it('Basic button with text', () => {
    const component = renderer.create(
      <ThemeProvider startColor="green" endColor="red">
        <Button text="Button" />
      </ThemeProvider>,
    )
    const json = component.toJSON()
    expect(json)
      .toMatchSnapshot()
  })
})
