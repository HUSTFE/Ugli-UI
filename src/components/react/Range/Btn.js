import React from 'react'
import PropTypes from 'prop-types'
import styles from '@style/Range/index.scss'

const RangeBtn = ({ style = {}, onTouchStart, onTouchEnd, onTouchMove }) => {
  return (
    <div
      className={`${styles['ugli-range-btn']} ${styles['ugli-range-middle']}`}
      style={style}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
    />
  )
}

RangeBtn.propTypes = {
  onTouchStart: PropTypes.func.isRequired,
  onTouchEnd: PropTypes.func.isRequired,
  onTouchMove: PropTypes.func.isRequired,
}

export default RangeBtn
