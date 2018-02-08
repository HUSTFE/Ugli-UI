/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import RangeBtn from './Btn'

import styles from '@style/Range/index.scss'

class Range extends Component {
  static propTypes = {
    onInit: PropTypes.func,
    onSlide: PropTypes.func,
    onSlideEnd: PropTypes.func,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    // get or set the value of the range
    value: PropTypes.number,
    step: PropTypes.number.isRequired,
  }

  static defaultProps = {
    onInit: function(){},
    onSlide: function(){},
    onSlideEnd: function(){},
    value: 0,
  }

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
      onSlide,
      onSlideEnd,
    } = this.props

    return (
      <div className={styles['ugli-range-container']}>
        <div className={`${styles['ugli-range-noncover']} ${styles['ugli-range-middle']}`} />
        <RangeBtn
          onTouchStart={()=>console.log('touch start')}
          onTouchEnd={()=>console.log('touch end')}
          onTouchMove={()=>console.log('touch move')}
        />
        <div className={`${styles['ugli-range-cover']} ${styles['ugli-range-middle']}`} />
      </div>
    )
  }
}

export default Range
