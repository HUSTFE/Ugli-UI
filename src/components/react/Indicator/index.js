import React from 'react'
import style from 'style/Indicator/index.sass'

class Spinner extends React.Component {
  static defaultProps = {
    color: 'aqua',
    size: '16',
  }
  computeSize = () => `${this.props.size}px`

  render() {
    const size = this.computeSize()
    const { color } = this.props
    return (
      <div
        className={style['ugli-spinner']}
        style={{
          borderTopColor: color,
          borderLeftColor: color,
          borderBottomColor: color,
          height: size,
          width: size,
        }}
      />
    )
  }
}

export default Spinner
