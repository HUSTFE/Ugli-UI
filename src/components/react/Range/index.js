/* eslint-disable */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames/bind'

import RangeBtn from './Btn'
import throttle from './utils/throttle'
import styles from '@style/Range/index.scss'

export const cx = classNames.bind(styles)

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
    onInit: function () { console.log() },
    onSlideStart: function () { console.log('touch start') },
    onSlide: function () {},
    onSlideEnd: function () { console.log('touch end') },
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
    const { top, left, bottom, right } = this.range.getBoundingClientRect()
    // 从右往左设置负值即可
    this.toRtl()

    if (vertical) {
      this.rangeCover.style.height = `${offset}px`
    } else {
      this.rangeCover.style.width = `${offset}px`
    }

    this.setState({
      pos: {
        top,
        left: rtl ? -right : left,
        bottom,
        right,
      },
    })
    onInit()
  }

  componentWillUpdate(nextProps, nextState) {
    const { pos, touchPos, vertical } = nextState

    if (this.state.pos.left && Math.abs(touchPos.x - this.offset - pos.left) >= this.offsetPx / 2) {
      const offset = Math.round((touchPos.x - pos.left) / this.offsetPx) * this.offsetPx
      const minOffset = offset < 0
        ? 0
        : offset
      this.offset = offset < pos.right
        ? minOffset
        : this.maxOffset

      const absOffset = Math.abs(this.offset)
      this.value = this.offsetToValue(absOffset)

      if (vertical) {
        this.rangeCover.style.height = `${absOffset}px`
      } else {
        this.rangeCover.style.width = `${absOffset}px`
      }

      this.toRtl()
    }
  }

  toRtl() {
    if (this.rtl) {
      this.offset =  -this.offset
    }
  }

  touchHandler(e) {
    const rtl = this.rtl
    const { pageX: x, pageY: y } = e.touches[0]

    this.setState({ touchPos: { x: rtl ? -x : x, y } })
  }

  touchStartHandler(e) {
    this.props.onSlideStart()
    this.touchHandler(e)
    this.rangeBtn.btn.classList.add(styles['js-active'])
  }

  touchEndHandler() {
    this.rangeBtn.btn.classList.remove(styles['js-active'])
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
    const vertical = this.vertical
    const rtl = this.rtl

    return (
      <div
        className={cx('ugli-range-container', { rtl })}
        onTouchStart={e => this.touchStartHandler(e)}
        onTouchEnd={() => this.touchEndHandler()}
        onTouchMove={throttle(this.touchMoveHandler)}
      >
        <div
          ref={nc => this.range = nc}
          className={cx('ugli-range-noncover', 'ugli-range-middle', { rtl })}
        />
        <RangeBtn
          ref={btn => this.rangeBtn = btn}
          vertical={vertical}
          rtl={rtl}
          offset={this.offset}
        />
        <div
          ref={div => this.rangeCover = div}
          className={cx('ugli-range-cover', 'ugli-range-middle', { rtl })}
        />
        <p>{this.value}</p>
      </div>
    )
  }
}

export default Range
