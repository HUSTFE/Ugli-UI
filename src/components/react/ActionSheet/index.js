import React, { Component } from 'react'
import { createPortal } from 'react-dom'
import PropTypes from 'prop-types'

import styles from '@style/ActionSheet/index.sass'

class ActionSheet extends Component {
  static propTypes = {
    operations: PropTypes.arrayOf(PropTypes.string),
    cancelButtonIndex: PropTypes.string.isRequired,
  }

  static defaultProps = {
    operations: ['Operation1', 'Operation2'],
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

  render() {
    const { operations, cancelButtonIndex } = this.props
    const children = (
      <div>
        <div className={styles['button-list']}>
          {operations.map((item, index) => {
            let bitem = (
              <div className={styles['button-list-item']}>
                {item}
              </div>
            )
            if (cancelButtonIndex === index) {
              bitem = (
                <div className={styles['cancel-button']}>
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
