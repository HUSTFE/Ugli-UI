/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import RangeBtn from './Btn'

import '@style/Range/index.scss'

class Range extends Component {
  componentDidMount() {
    const { onInit } = this.props
    onInit()
  }

  render() {
    const {
      max,
      min,
      value = min,
      step,
      onSlide = function(){},
      onSlideEnd = function() {},
    } = this.props

    return (
      <div className="ugli-range-container">
        <div>

        </div>
        <RangeBtn
          onTouchStart={()=>console.log('touch start')}
          onTouchEnd={()=>console.log('touch end')}
          onTouchMove={()=>console.log('touch move')}
        />
        <div>

        </div>
      </div>
    )
  }
}

Range.propTypes = {
  onInit: PropTypes.func,
  onSlide: PropTypes.func,
  onSlideEnd: PropTypes.func,
  max: PropTypes.number.isRequired,
  min: PropTypes.number.isRequired,
  // get or set the value of the range
  value: PropTypes.number,
  step: PropTypes.number.isRequired,
}

export default Range
