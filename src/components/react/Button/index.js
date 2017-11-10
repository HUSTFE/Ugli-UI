import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from '@style/Button/index.sass'
import { warning } from '@shared/warning'
import { computeSize } from '@shared/size'

class Button extends Component {
  static propTypes = {
    color: PropTypes.string,
    size: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    style: PropTypes.shape(),
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
  }
  static defaultProps = {
    color: 'aqua',
    size: '16',
    style: {},
    onClick: () => warning(true, 'onClick prop should be passed to Bottom.'),
  }
  render() {
    const { color, size, style, onClick, text } = this.props
    return (
      <button
        className={styles.button}
        onClick={onClick}
        style={{
          height: computeSize(size),
          color,
          ...style,
        }}
      >
        {text}
      </button>
    )
  }
}

export default Button
