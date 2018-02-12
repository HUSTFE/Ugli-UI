import React from 'react'
import PropTypes from 'prop-types'

import { classes } from './index'

class RangeBtn extends React.Component {
  static propTypes = {
    offset: PropTypes.number.isRequired,
  }

  componentWillReceiveProps({ offset }) {
    this.btn.style.transform = `-webkit-translate(${offset}px, -50%)`
  }

  render() {
    const { style = {}, rtl } = this.props

    return (
      <div
        ref={div => this.btn = div}
        className={classes('ugli-range-btn', 'ugli-range-middle', { rtl })}
        style={style}
      />
    )
  }
}

export default RangeBtn
