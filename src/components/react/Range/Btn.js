import React from 'react'
import PropTypes from 'prop-types'

import { cx } from './index'

class RangeBtn extends React.Component {
  static propTypes = {
    offset: PropTypes.number.isRequired,
  }

  componentWillReceiveProps({ vertical, offset }) {
    if (vertical) {
      this.btn.style.transform = `translate(-50%, ${offset}px)`
    } else {
      this.btn.style.transform = `translate(${offset}px, -50%)`
    }
  }

  render() {
    const { style = {}, rtl } = this.props

    return (
      <div
        ref={div => this.btn = div}
        className={cx('ugli-range-btn', 'ugli-range-middle', { rtl })}
        style={style}
      />
    )
  }
}

export default RangeBtn
