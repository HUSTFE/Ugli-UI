import React from 'react'
import PropTypes from 'prop-types'

import styles from '@style/Range/index.scss'

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
    const { style = {} } = this.props

    return (
      <div
        ref={div => this.btn = div}
        className={`${styles['ugli-range-btn']} ${styles['ugli-range-middle']}`}
        style={style}
      />
    )
  }
}

export default RangeBtn
