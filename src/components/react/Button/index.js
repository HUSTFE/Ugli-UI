import React from 'react'
import PropTypes from 'prop-types'

import styles from '@style/Button/index.sass'
import { warning } from '@shared/warning'
import { computeSize } from '@shared/size'

/*
const defaultTheme = {
  startColor: '#fbc8d4',
  endColor: '#d8a3fd',
}
TODO: set a shared default theme somewhere else
There IS a default theme, but should not be applied here,
the only thing sub-component
*/
// So, the priority is like: props > context > default, which means we can't just set default props simply
// kind of disgusting...
const Button = (props, context) => {
  const { ctxStartColor = '#fbc8d4', ctxEndColor = '#d8a3fd' } = context
  // TODO: warning(!useTheme, 'To get the best experience of Ugli-UI, we suggest to use component `ThemeProvider`.')
  const { startColor = ctxStartColor, endColor = ctxEndColor, text, size, style, onClick } = props
  return (
    <button
      className={styles.button}
      onClick={onClick}
      style={{
        fontSize: computeSize(size),
        background: `linear-gradient(-45deg, ${startColor} 30%, ${endColor} 70%)`,
        ...style,
      }}
    >
      <span>{text}</span>
    </button>
  )
}

Button.propTypes = {
  startColor: PropTypes.string,
  endColor: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  style: PropTypes.shape(),
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
}
Button.defaultProps = {
  startColor: undefined,
  endColor: undefined,
  size: '16',
  style: {},
  onClick: () => warning(true, 'onClick prop should be passed to Bottom.'),
}
Button.contextTypes = {
  startColor: PropTypes.string,
  endColor: PropTypes.string,
}

export default Button
