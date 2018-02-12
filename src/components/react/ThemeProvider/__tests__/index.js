/* eslint-disable react/no-multi-comp */
import React from 'react'
import PropTypes from 'prop-types'
import renderer from 'react-test-renderer'
import ThemeProvider from '../index'


describe('ThemeProvider', () => {
  it('context test startColor', () => {
    let toggle = () => {}

    const GrandSonComponent = (props, context) => {
      return context.startColor
    }
    GrandSonComponent.contextTypes = {
      startColor: PropTypes.string,
    }

    class ParentComponent extends React.Component {
      state = {
        color: 'red',
      }
      componentDidMount() {
        toggle = (color) => {
          if (color) {
            this.setState({ color })
          }
        }
      }
      render() {
        return (
          <ThemeProvider startColor={this.state.color} endColor="red">
            <GrandSonComponent />
          </ThemeProvider>
        )
      }
    }

    const render = renderer.create(<ParentComponent />)
    expect(render.toJSON()).toBe('red')
    toggle('green')
    expect(render.toJSON()).toBe('green')
    toggle('red')
    expect(render.toJSON()).toBe('red')
    toggle('blue')
    expect(render.toJSON()).toBe('blue')
  })


  it('context test endColor', () => {
    let toggle = () => {}

    const GrandSonComponent = (props, context) => {
      return context.endColor
    }
    GrandSonComponent.contextTypes = {
      endColor: PropTypes.string,
    }

    class ParentComponent extends React.Component {
      state = {
        color: 'red',
      }
      componentDidMount() {
        toggle = (color) => {
          if (color) {
            this.setState({ color })
          }
        }
      }
      render() {
        return (
          <ThemeProvider endColor={this.state.color} startColor="red">
            <GrandSonComponent />
          </ThemeProvider>
        )
      }
    }

    const render = renderer.create(<ParentComponent />)
    expect(render.toJSON()).toBe('red')
    toggle('green')
    expect(render.toJSON()).toBe('green')
    toggle('red')
    expect(render.toJSON()).toBe('red')
    toggle('blue')
    expect(render.toJSON()).toBe('blue')
  })

  it('context test two colors', () => {
    let toggle = () => {}

    const GrandSonComponent = (props, context) => {
      return `${context.startColor} ${context.endColor}`
    }
    GrandSonComponent.contextTypes = {
      startColor: PropTypes.string,
      endColor: PropTypes.string,
    }

    class ParentComponent extends React.Component {
      state = {
        color1: 'red',
        color2: 'red',
      }
      componentDidMount() {
        toggle = (color1, color2) => {
          if (color1 || color2) {
            this.setState({ color1, color2 })
          }
        }
      }
      render() {
        return (
          <ThemeProvider startColor={this.state.color1} endColor={this.state.color2}>
            <GrandSonComponent />
          </ThemeProvider>
        )
      }
    }

    const render = renderer.create(<ParentComponent />)
    expect(render.toJSON()).toBe('red red')
    const testCases = [
      ['blue', 'red'],
      ['green', 'blue'],
      ['yellow', 'red'],
      ['red', 'blue'],
    ]
    testCases.forEach((testCase) => {
      toggle(...testCase)
      expect(render.toJSON()).toBe(testCase.join(' '))
    })
  })
})
