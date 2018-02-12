import React from 'react'
import PropTypes from 'prop-types'

// TODO: In react 16.3, old context api will be deprecated,
// this component will be refactored.
export default class ThemeProvider extends React.Component {
  static propTypes = {
    startColor: PropTypes.string.isRequired,
    endColor: PropTypes.string.isRequired,
  }

  static childContextTypes = ThemeProvider.propTypes

  getChildContext() {
    return {
      startColor: this.props.startColor,
      endColor: this.props.endColor,
    }
  }

  render() {
    return this.props.children
  }

  shouldComponentUpdate(nextProps) {
    const { startColor, endColor } = nextProps
    if (startColor === this.props.startColor && endColor === this.props.endColor) {
      return false
    }
    return true
  }
}
