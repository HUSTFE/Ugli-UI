import React, { Component } from 'react'
import PropTypes from 'prop-types'

import styles from '@style/LazyBlurImage/index.sass'

import VisibilityObserver from '../../shared/VisibilityObserver'

class LazyBlurImage extends Component {
  static propTypes = {
    // thumb image source, recommended to be tiny in size.
    // base64 string is the best choice.
    thumbSource: PropTypes.string.isRequired,
    // real image source
    // source: PropTypes.string.isRequired,
    thumbAlt: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,

    // not necessary, wrapper's height & width
    width: PropTypes.string,
    height: PropTypes.string,

    // loa
    lazy: PropTypes.bool,

    // with blur shadow
    withBlurShadow: PropTypes.bool,

    // event listeners
    onThumbImageLoad: PropTypes.func,
    onLoad: PropTypes.func,

    // styles
    /* eslint-disable react/forbid-prop-types */
    style: PropTypes.object,
    thumbImageStyle: PropTypes.object,
    imageStyle: PropTypes.object,

    // classNames
    className: PropTypes.string,
    thumbImageClassName: PropTypes.string,
    imageClassName: PropTypes.string,
  }

  static defaultProps = {
    width: undefined,
    height: undefined,
    onThumbImageLoad: () => {},
    onLoad: () => {},

    // styles
    style: {},
    thumbImageStyle: {},
    imageStyle: {},

    lazy: false,

    withBlurShadow: false,

    // classNames
    className: '',
    thumbImageClassName: '',
    imageClassName: '',
  }

  state = {
    containerWidth: undefined,
    // containerHeight: undefined,
    thumbImageLoaded: false,
    imageLoaded: false,
  }

  containerEle = null
  containerRef = (ele) => {
    if (ele instanceof HTMLElement && !this.containerEle) {
      this.containerEle = ele
    }
  }

  thumbImageEle = null
  thumbImageRef = (ele) => {
    if (ele instanceof HTMLElement && !this.thumbImageEle) {
      this.thumbImageEle = ele
      // When thumb image is loaded, the wrapper
      // will be adjust to its size, we so use its
      // size as image's display size.
      ele.onload = () => {
        this.setState({
          containerWidth: this.containerEle.clientWidth,
          // containerHeight: this.containerEle.clientHeight,

          // When lazy is set to false(default), `thumbImageLoaded`
          // will be true just after thumb image load.
          thumbImageLoaded: !this.props.lazy,

          // `onThumbImageLoad` will be triggered after
          // state is set, then user can get thumb image's
          // element with correct size props.
        }, () => this.props.onThumbImageLoad({ target: ele }))

        if (this.props.lazy) {
          this.visibilityPromise.then(() => {
            this.setState({
              thumbImageLoaded: true,
            })
          })
        }
      }
    }
  }

  imageEle = null
  imageRef = (ele) => {
    if (ele instanceof HTMLElement && !this.imageEle) {
      this.imageEle = ele
      ele.onload = () => this.setState({
        imageLoaded: true,
        // `onImageLoad` will be triggered after state is set.
      }, () => this.props.onLoad({ target: ele }))
    }
  }

  render() {
    const {
      thumbSource, source,
      alt, thumbAlt,
      height, width,

      ...props
    } = this.props

    // let imageWidth
    // let imageHeight

    // only with a specified height

    return (
      <div // this is div wrapper
        ref={this.containerRef}
        className={`${styles['blur-image-container']} ${props.className}`}
        style={{ width, height, ...props.style }}
      >
        <img // this is thumb image
          src={thumbSource}
          alt={thumbAlt}
          className={`${props.thumbImageClassName} ${styles['blur-thumb-image']}`}
          style={{
            // Before thumb `onload`, set its size to 100% * auto
            // can make it fit just well in div wrapper.
            width: (!width && height) ? 'auto' : '100%',
            height: '100%',

            // When real image is loaded, thumb can be hidden or
            // become a blur shadow of real image, use `withBlurShadow`
            // props to turn on this feature.
            visibility: (!this.state.imageLoaded || this.props.withBlurShadow) ? undefined : 'hidden',

            filter: `blur(${parseInt(this.state.containerWidth, 10) / 15}px)`,
            // users style
            ...props.thumbImageStyle,
          }}
          ref={this.thumbImageRef}
        />
        {
          this.state.thumbImageLoaded &&
          <img // this is real image
            ref={this.imageRef}
            src={source}
            alt={alt}
            className={`${props.imageClassName} ${styles['blur-image']}`}
            style={{
              // Before thumb `onload`, set its size to 100% * auto
              // can make it fit just well in div wrapper.
              width: (!width && height) ? 'auto' : '100%',
              height: '100%',

              // use visibility to prevent non-working transition
              visibility: this.state.imageLoaded ? undefined : 'hidden',

              filter: this.state.imageLoaded
                ? undefined
                : `blur(${parseInt(this.state.containerWidth, 10) / 15}px)`,

                // users style
              ...props.imageStyle,
            }}
          />
        }
      </div>
    )
  }

  /**
   * User can update image size Initiativily.
   * Can be used when container's size's change
   * cannot be detected by window's resize.
   * @param {string} newWidth
   * @param {string} newHeight
   */
  updateSize(newWidth, newHeight) {
    this.setState({
      // containerHeight: newWidth || (`${this.containerEle.clientHeight}px`),
      containerWidth: newHeight || (`${this.containerEle.clientWidth}px`),
    })
  }

  visibilityObserver = null
  visibilityPromise = null

  componentDidMount() {
    // onresize is removed because it is not necessary
    // when css comes for help.

    // this.resizeHandler = () => {
    //   this.setState({
    //     containerHeight: this.containerEle.clientHeight,
    //     containerWidth: this.containerEle.clientWidth,
    //   })
    // }
    // window.addEventListener('resize', this.resizeHandler)

    if (this.props.lazy) {
      // a promise of visibility
      this.visibilityPromise = new Promise((resolve) => {
        this.visibilityObserver = new VisibilityObserver(({ visibility }) => {
          if (visibility) {
            resolve()
          }
        })
      })
      this.visibilityObserver.observe(this.containerEle)
    }
  }

  componentWillUnmount() {
    // window.removeEventListener('resize', this.resizeHandler)

    if (this.props.lazy) {
      this.visibilityObserver.unobserve()
    }
  }
}

export default LazyBlurImage
