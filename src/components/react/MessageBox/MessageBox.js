import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from '@style/MessageBox/index.sass'
import { warning } from '@shared/warning'
import { computeSize, validateSize } from '@shared/size'
import { include } from '@shared/includes'

const CONFIRM_TEXT = 'OK'
const CANCEL_TEXT = 'CANCEL'

class MessageBox extends Component {
  static propTypes = {
    type: PropTypes.string, // 'prompt'/'confirm'
    title: PropTypes.string, // '    '
    message: PropTypes.string, // '    '
    inputValue: PropTypes.string, // '    '
    inputErrorMessage: PropTypes.string,
    showConfirmButton: PropTypes.bool, // true/false
    showCancelButton: PropTypes.bool, // true/false
    confirmButtonPosition: PropTypes.string, // 'right'/'left'
    confirmButtonText: PropTypes.string, // CONFIRM_TEXT
    cancelButtonText: PropTypes.string, // CANCEL_TEXT
    confirmButtonClass: PropTypes.string, // classname
    cancelButtonClass: PropTypes.string, // classname
  }
  // #9795F0
  // #FBC8D4
  static defaultProps = {
    type: 'Confirm',
    title: 'Confirm',
    message: 'Are you sure you want to continue?',
    inputValue: null,
    inputErrorMessage: '',
    showConfirmButton: true,
    showCancelButton: true,
    confirmButtonPosition: 'right',
    confirmButtonText: CONFIRM_TEXT,
    cancelButtonText: CANCEL_TEXT,
    confirmButtonClass: 'msgbox-confirm-btn',
    cancelButtonClass: 'msgbox-cancel-btn',
  }
  // componentWillReceiveProps({ height, width }) {
  //   warning(validateSize(height), `Bad size ${height}`)
  //   warning(validateSize(width), `Bad size ${width}`)
  // }
  render() {
    const {
      type, title, message, inputValue, inputErrorMessage, showConfirmButton, showCancelButton,
      confirmButtonPosition, confirmButtonText, cancelButtonText, confirmButtonClass, cancelButtonClass, ...other
    } = this.props
    // const heightComputed = computeSize(height)
    if ((type !== 'prompt')) {
      return (
        <div className={styles['ugli-msgbox']}
          style={{}}
        >
          <div className={styles['ugli-msgbox-title']}>{title}</div>
          <div className={styles['ugli-msgbox-msg']}>{message}</div>
          <div className={styles['ugli-msgbox-choice']}>
            {showCancelButton &&
            <div className={styles['ugli-msgbox-cancel-btn']}>{cancelButtonText}</div>}
            {showConfirmButton &&
            <div className={styles['ugli-msgbox-confirm-btn']}>{confirmButtonText}</div>}

          </div>
        </div>
      )
    }
    return (
      <div className={styles['ugli-msgbox']}
        style={{}}
      >
        <div className={styles['ugli-msgbox-title']}>{title}</div>
        <div className={styles['ugli-msgbox-msg']}>{message}</div>
        <input type="text" />
        <div className={styles['ugli-msgbox-choice']}>
          {showCancelButton &&
          <div className={styles['ugli-msgbox-cancel-btn']}>{cancelButtonText}</div>}
          {showConfirmButton &&
          <div className={styles['ugli-msgbox-confirm-btn']}>{confirmButtonText}</div>}
        </div>
      </div>
    )
  }
}
export default MessageBox
