/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import RangeBtn from './Btn'
import throttle from './utils/throttle'
import styles from '@style/Range/index.scss'

export const classes = classNames.bind(styles)

class Range extends Component {
  static propTypes = {
    onInit: PropTypes.func,
    onSlide: PropTypes.func,
    onSlideStart: PropTypes.func,
    onSlideEnd: PropTypes.func,
    vertical: PropTypes.bool,
    rtl: PropTypes.bool,
    max: PropTypes.number.isRequired,
    min: PropTypes.number.isRequired,
    value: PropTypes.number,
    step: PropTypes.number.isRequired,
  }

  static defaultProps = {
    vertical: false,
    rtl: false,
    // 默认为min
    value: undefined,
    onInit() {},
    onSlideStart() { console.log('touch start') },
    onSlide() {},
    onSlideEnd() { console.log('touch end') },
  }

  constructor(props) {
    super(props)
    const { min, max, vertical, rtl } = props
    this.value = min
    this.offset = 0
    // 每一格偏移的px
    this.offsetPx = 0
    this.min = min
    this.max = max
    this.rtl = rtl
    this.vertical = vertical
    this.maxOffset = 0
    this.state = {
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
    const { onInit, step, max, min, value = min, vertical, rtl } = this.props
    this.offsetPx = (this.range.clientWidth * step) / (max - min)
    const offset = this.offsetPx * (value - min)
    this.offset = offset
    this.maxOffset = (this.max - this.min) * this.offsetPx
    let { top, left, bottom, right } = this.range.getBoundingClientRect()
    // 从右往左设置负值即可
    this.toRtl()
    this.rangeCover.style.width = `${offset}px`

    if (rtl) {
      left = -right
    }

    if (vertical) {
      left = -bottom
    }

    if (vertical && rtl) {
      left = top
    }

    this.setState({
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
    const { pos, touchPos } = nextState

    if (this.state.pos.left && Math.abs(touchPos.x - this.offset - pos.left) >= this.offsetPx / 2) {
      const offset = Math.round((touchPos.x - pos.left) / this.offsetPx) * this.offsetPx
      const minOffset = offset < 0
        ? 0
        : offset
      this.offset = offset < this.maxOffset
        ? minOffset
        : this.maxOffset

      const absOffset = Math.abs(this.offset)
      this.value = this.offsetToValue(absOffset)
      this.rangeCover.style.width = `${absOffset}px`

      this.toRtl()
    }
  }

  toRtl() {
    if (this.rtl) {
      this.offset = -this.offset
    }
  }

  touchHandler(e) {
    const rtl = this.rtl
    const vertical = this.vertical
    let { pageX: x, pageY: y } = e.touches[0]
    if (rtl) {
      x = -x
    }

    if (!rtl && vertical) {
      [x, y] = [-y, x]
    }

    if (vertical && rtl) {
      [x, y] = [y, x]
    }

    this.setState({ touchPos: { x, y } })
  }

  touchStartHandler = (e) => {
    this.props.onSlideStart(this.value)
    this.touchHandler(e)
    this.rangeBtn.btn.classList.add(styles['js-active'])
  }

  touchEndHandler = () => {
    this.rangeBtn.btn.classList.remove(styles['js-active'])
    this.props.onSlideEnd(this.value)
  }

  touchMoveHandler = e => {
    this.props.onSlide(this.value)
    this.touchHandler(e)
  }

  offsetToValue(offset) {
    return (offset / this.offsetPx) + this.min
  }

  render() {
    const vertical = this.vertical
    const rtl = this.rtl

    return (
      <div
        className={classes('ugli-range-container', { rtl, vertical })}
        onTouchStart={this.touchStartHandler}
        onTouchEnd={this.touchEndHandler}
        onTouchMove={throttle(this.touchMoveHandler)}
      >
        <div
          ref={nc => this.range = nc}
          className={classes('ugli-range-noncover', 'ugli-range-middle', { rtl, vertical })}
        />
        <RangeBtn
          ref={btn => this.rangeBtn = btn}
          vertical={vertical}
          rtl={rtl}
          offset={this.offset}
        />
        <div
          ref={div => this.rangeCover = div}
          className={classes('ugli-range-cover', 'ugli-range-middle', { rtl, vertical })}
        />
        <p>{this.value}</p>
      </div>
    )
  }
}

export default Range
