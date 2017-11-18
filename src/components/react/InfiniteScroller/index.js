import React from 'react'
import PropTypes from 'prop-types'

class InfiniteScroller extends React.Component {
  constructor() {
    super()
    const initialElements = React.Children.toArray(this.props.children)

    this.state = {
      elements: initialElements,
    }
  }

  static defaultProps = {
    containerHeight: '200px',
    elementHeight: '',
    loadInfinite: () => {},
    loadSpinner: () => {},
    className: '',
    children: null,
  }

  render() {
    const {
      containerHeight,
      elementHeight,
      loadInfinite,
      loadSpinner,
      className,
    } = this.props

    loadSpinner()
    loadInfinite()
    return (
      <div className={className} height={containerHeight}>
        {React.Children.map(this.state.elements, child => React.cloneElement(child, {
          height: elementHeight,
        }))}
      </div>
    )
  }
}

InfiniteScroller.propTypes = {
  containerHeight: PropTypes.number,
  elementHeight: PropTypes.number,
  loadInfinite: PropTypes.func,
  loadSpinner: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.element,
}

export default InfiniteScroller
