import React from 'react'
import PropTypes from 'prop-types'

const RangeBtn = ({ style = {}, onTouchStart, onTouchEnd, onTouchMove }) => {
  return (
    <div
      className="ugli-range-btn ugli-range-middle"
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
