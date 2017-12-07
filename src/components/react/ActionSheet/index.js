import React, { Component } from 'react'
import { createPortal, render } from 'react-dom'
import PropTypes from 'prop-types'

import styles from '@style/ActionSheet/index.sass'

// function noop() {}

class ActionSheet extends Component {
  static propTypes = {
    operations: PropTypes.arrayOf(PropTypes.string),
    cancelButtonIndex: PropTypes.string.isRequired,
    // callback: PropTypes.func(),
  }

  static defaultProps = {
    operations: ['Operation1', 'Operation2', 'Cancel'],
    // callback: noop(),
  }

  container = null

  componentWillUnmount() {
    this.removeContainer()
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

  static show(config) {
    const { cancelButtonIndex } = config
    const actionSheet = (<ActionSheet cancelButtonIndex={cancelButtonIndex} />)
    const div = document.createElement('div')
    document.body.appendChild(div)
    render(actionSheet, div)
  }

  render() {
    const { operations, cancelButtonIndex } = this.props
    const children = (
      <div>
        <div className={styles['button-list']}>
          {operations.map((item, index) => {
            let bitem = (
              <div key={item} className={styles['button-list-item']}>
                {item}
              </div>
            )
            if (cancelButtonIndex === index) {
              bitem = (
                <div key={item} className={styles['cancel-button']}>
                  {item}
                </div>
              )
            }
            return bitem
          })}
        </div>
      </div>
    )
    return createPortal(children, this.addContainer())
  }
}

export default ActionSheet
