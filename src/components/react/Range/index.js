/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'

import RangeBtn from './Btn'
import throttle from './utils/throttle'
import styles from '@style/Range/index.scss'

class Range extends Component {
  static propTypes = {
    onInit: PropTypes.func,
    onSlide: PropTypes.func,
    onSlideStart: PropTypes.func,
    onSlideEnd: PropTypes.func,
    vertical: PropTypes.bool,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    value: PropTypes.number,
    step: PropTypes.number.isRequired,
  }

  static defaultProps = {
    vertical: false,
    // 默认为min
    value: undefined,
    onInit: function () { console.log() },
    onSlideStart: function () { console.log('touch start') },
    onSlide: function () {},
    onSlideEnd: function () { console.log('touch end') },
  }

  constructor(props) {
    super(props)
    const { value, min, max, vertical } = props
    this.offset = 0
    // 每一格偏移的px
    this.offsetPx = 0
    this.min = min
    this.max = max
    this.vertical = vertical
    this.state = {
      maxOffset: 0,
      // range 上下左右距离页面左、上的位置
      pos: {
        top: null,
        left: null,
        right: null,
        bottom: null,
      },
      // 触摸点的位置
      touchPos: {
        x: null,
        y: null,
      },
    }

    this.touchMoveHandler = this.touchMoveHandler.bind(this)
  }

  componentDidMount() {
    const { onInit, step, max, min, value = min, vertical } = this.props
    this.offsetPx = (this.range.clientWidth * step) / (max - min)
    const offset = this.offsetPx * (value - min)
    this.offset = offset
    this.value = value
    const maxOffset = (this.max - this.min) * this.offsetPx
    const { top, left, bottom, right } = this.range.getBoundingClientRect()

    if (vertical) {
      this.rangeCover.style.height = `${offset}px`
    } else {
      this.rangeCover.style.width = `${offset}px`
    }

    this.setState({
      maxOffset,
      pos: {
        top,
        left,
        bottom,
        right,
      },
    })
    onInit()
  }

  componentWillUpdate(nextProps, nextState) {
    const { pos, touchPos, vertical, maxOffset } = nextState

    if (this.state.pos.left && Math.abs(touchPos.x - this.offset - pos.left) >= this.offsetPx / 2) {
      const offset = Math.round((touchPos.x - pos.left) / this.offsetPx) * this.offsetPx
      const minOffset = offset < 0
        ? 0
        : offset
      this.offset = offset < pos.right
        ? minOffset
        : maxOffset
      this.value = this.offsetToValue(this.offset)

      if (vertical) {
        this.rangeCover.style.height = `${this.offset}px`
      } else {
        this.rangeCover.style.width = `${this.offset}px`
      }
    }
  }

  onMount(fn) {
    this.range.addEventListener('load', fn)
  }

  touchHandler(e) {
    const { pageX: x, pageY: y } = e.touches[0]

    this.setState({ touchPos: { x, y } })
  }

  touchStartHandler(e) {
    this.props.onSlideStart()
    this.touchHandler(e)
  }

  touchEndHandler() {
    this.props.onSlideEnd()
  }

  touchMoveHandler(e) {
    this.props.onSlide()
    this.touchHandler(e)
  }

  offsetToValue(offset) {
    return (offset / this.offsetPx) + this.min
  }

  render() {
    const {
      vertical,
    } = this.props

    return (
      <div
        className={styles['ugli-range-container']}
        onTouchStart={e => this.touchStartHandler(e)}
        onTouchEnd={() => this.touchEndHandler()}
        onTouchMove={throttle(this.touchMoveHandler)}
      >
        <div
          ref={nc => this.range = nc}
          className={`${styles['ugli-range-noncover']} ${styles['ugli-range-middle']}`}
        />
        <RangeBtn
          vertical={vertical}
          offset={this.offset}
        />
        <div
          ref={div => this.rangeCover = div}
          className={`${styles['ugli-range-cover']} ${styles['ugli-range-middle']}`}
        />
        <p>{this.value}</p>
      </div>
    )
  }
}

export default Range
