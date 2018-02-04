import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { CSSTransitionGroup } from 'react-transition-group'

import styles from '@style/ActionSheet/index.sass'

function noop() {}

let div = document.createElement('div')
document.body.appendChild(div)

class ActionSheet extends Component {
  static propTypes = {
    operations: PropTypes.arrayOf(PropTypes.string),
    cancelButtonIndex: PropTypes.number,
    // callback: PropTypes.func,
  }

  static defaultProps = {
    operations: ['Operation1', 'Operation2', 'Cancel'],
    cancelButtonIndex: 2,
    // callback: () => noop,
  }

  constructor(props) {
    super(props)
    this.state = this.initState()
  }

  initState = () => {
    return {
      active: false,
    }
  }

  container = null

  componentDidMount() {
    this.enter()
  }

  enter() {
    this.setState({
      active: true,
    })
  }

  componentWillUnmount() {
    this.setState({
      active: false,
    })
    setTimeout(() => {
      if (this.container) {
        this.removeContainer()
      }
      if (div) {
        ReactDOM.unmountComponentAtNode(div)
        div.parentNode.removeChild(div)
        div = null
      }
    }, 300)
  }

  addContainer = () => {
    if (!this.container) {
      const container = document.createElement('div')
      document.body.appendChild(container)
      this.container = container
    }
    return this.container
  }

  removeContainer = () => {
    if (this.container) {
      this.container.parentNode.removeChild(this.container)
      this.container = null
    }
  }

  close() {
    noop()
    this.componentWillUnmount()
  }

  static show(config) {
    const actionSheet = (<ActionSheet {...config} />)
    if (!div) {
      div = document.createElement('div')
      document.body.appendChild(div)
    }
    ReactDOM.render(actionSheet, div)
  }

  render() {
    const { operations, cancelButtonIndex } = this.props
    const list = (
      <div className={styles['button-list']}>
        {operations.map((item, index) => {
          const itemProps = {
            key: item,
            className: classnames(styles['button-list-item'], {
              [styles['cancel-button']]: cancelButtonIndex === index,
              [styles.first]: index === 0,
            }),
            onTouchEnd: () => this.close(index),
          }
          // todo(fadeOut): reverse delay time
          const delayStyle = {
            transitionDelay: `${100 * index}ms`,
            WebkitTransitionDelay: `${100 * index}ms`,
          }
          let bItem = (
            <div {...itemProps} style={delayStyle}>
              {item}
            </div>
          )
          if (cancelButtonIndex === index) {
            // todo: cancle icon
            bItem = (
              <div {...itemProps} style={delayStyle}>
                {item}
              </div>
            )
          }
          const bItemTransition = (
            <CSSTransitionGroup
              transitionName={{
                enter: styles['list-enter'],
                enterActive: styles['list-enter-active'],
                leave: styles['list-leave'],
                leaveActive: styles['list-leave-active'],
                appear: styles['list-appear'],
                appearActive: styles['list-appear-active'],
              }}
              transitionEnterTimeout={300}
              transitionLeaveTimeout={300}
              key={item}
            >
              { this.state.active ? bItem : null }
            </CSSTransitionGroup>
          )
          return bItemTransition
        })}
      </div>
    )
    const mask = <div className={styles.mask} onTouchEnd={() => this.close()} />
    const children = (
      <div className={styles['action-sheet']}>
        <CSSTransitionGroup
          transitionName={{
            enter: styles['mask-enter'],
            enterActive: styles['mask-enter-active'],
            leave: styles['mask-leave'],
            leaveActive: styles['mask-leave-active'],
            appear: styles['mask-appear'],
            appearActive: styles['mask-appear-active'],
          }}
          transitionEnterTimeout={300}
          transitionLeaveTimeout={300}
        >
          { this.state.active ? mask : null }
        </CSSTransitionGroup>
        {list}
      </div>
    )
    return ReactDOM.createPortal(children, this.addContainer())
  }
}

export default ActionSheet
