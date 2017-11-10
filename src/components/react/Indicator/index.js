import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from '@style/Indicator/index.sass'
import { warning } from '@shared/warning'
import { computeSize, validateSize } from '@shared/size'

class Spinner extends Component {
  static propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    style: PropTypes.shape(),
  }
  static defaultProps = {
    color: 'aqua',
    size: '16',
    style: {},
  }
  componentWillReceiveProps({ size }) {
    warning(validateSize(size), `Bad size ${size}`)
  }
  render() {
    const { color, size, style, ...other } = this.props
    const sizeComputed = computeSize(size)
    return (
      <div
        className={styles['ugli-spinner']}
        style={{
          borderTopColor: color,
          borderLeftColor: color,
          borderBottomColor: color,
          height: sizeComputed,
          width: sizeComputed,
          ...style,
        }}
        {...other}
      />
    )
  }
}

export default Spinner
