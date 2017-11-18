import React from 'react'
import PropTypes from 'prop-types'

class InfiniteScroller extends React.Component {
  static propTypes = {
    containerHeight: PropTypes.number,
    elementHeight: PropTypes.number,
    loadInfinite: PropTypes.func,
    loadSpinner: PropTypes.func,
    bottomToTop: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.element,
  }

  static defaultProps = {
    containerHeight: '200px',
    elementHeight: '',
    loadInfinite: () => {},
    loadSpinner: () => {},
    className: '',
    children: null,
    bottomToTop: false,
  }

  constructor(props) {
    super(props)
    const initialElements = React.Children.toArray(props.children)

    this.state = {
      elements: initialElements,
    }
  }

  render() {
    const {
      containerHeight,
      elementHeight,
      loadInfinite,
      loadSpinner,
      className,
      bottomToTop,
    } = this.props

    loadInfinite()
    return (
      <div className={className} height={containerHeight}>
        {bottomToTop && loadSpinner}
        {React.Children.map(this.state.elements, child => React.cloneElement(child, {
          height: elementHeight,
        }))}
        {!bottomToTop && loadSpinner}
      </div>
    )
  }
}

export default InfiniteScroller
