/**
 * +---------------------------------------------------------------------+
 * |                                                                     |
 * | Faraway's Swiper, even worse than a lot similar swipers on github.  |
 * | Write for practice                                                  |
 * | Faraway <hzylovelyl@gmail.com>                                      |
 * |                                                                     |
 * +---------------------------------------------------------------------+
 */
function Swiper(container, options = {}) {
  this.options = {
    ...({
      startSlideIndex: 1,
      speed: 300,
      // auto: 0,
      continuous: true,
      // disableScroll: false,
      // stopPropagation: false,
      resistance: 0.5,
      // direction: Swiper.DIRECTION_VERTICAL,
      callback: () => {},
      transitionEnd: () => {},
    }),
    options,
  }

  // Written for modern browser, we assume that the
  // environment supports transition, transfrom, and
  // addEventListener

  if (!container) {
    throw TypeError('An DOM element must be provided as container to setup swiper!')
  }
  container = (typeof container === 'string'
    ? document.querySelector(container)
    : container
  )
  if (!container || !(container instanceof HTMLElement)) {
    throw TypeError('Invalid selector!')
  }

  // I prefer DOM structure like this:
  //
  // <div class='swipe'>
  //   <div class='swipe-wrap'>
  //     <div></div>
  //     <div></div>
  //     <div></div>
  //   </div>
  // </div>

  // So, we will check if DOM structure matches.
  // Use children instead of childNodes to filter Text node.
  if (container.children.length <= 0) {
    throw DOMError('The container element you provide has no child.')
  }

  // wrapper is clear enough as a VAR's name
  const wrapper = container.children[0]

  // if (wrapper.children.length <= 0) {
  //   throw DOMError('No slides provided.')
  // }

  const slides = wrapper.children

  const slideWidth = container.clientWidth

  // We extend the wrapper's width to `slides.length * slideWidth`
  wrapper.style.width = `${slideWidth * slides.length}px`

  // So, obviously, container must have style `overflow: hidden`.
  container.style.overflow = 'hidden'
  container.style.overflow = 'relative'

  // Then we set all slides to `float: left`.
  // like this:

  //                                      wrapper
  // +---------------+---------------+---------------+----------------+----------------+
  // |               |               |               |                |                |
  // |               |               |               |                |                |
  // |               |               |               |                |                |
  // |    slide 1    |       2       |       3       |       4        |       5        |
  // |               |               |               |                |                |
  // |               |               |               |                |                |
  // |   container   |               |               |                |                |
  // |               |               |               |                |                |
  // |               |               |               |                |                |
  // |               |               |               |                |                |
  // +---------------+---------------+---------------+----------------+----------------+

  // `float: left` is the most important style for each slide.
  // We also need to add `left: -${i * slideWidth}px`

  const currentTranslate = new Array(slides.length).fill(0) // cache the wrapper translate for smooth swipe.
  for (let i = 0; i < slides.length; i += 1) {
    slides[i].style.cssFloat = 'left'
    slides[i].style.position = 'relative'
    slides[i].style.width = `${slideWidth}px`

    slides[i].style.transform = `${-slideWidth}px`
    slides[i].style.left = `-${i * slideWidth}px`

    currentTranslate[i] = -slideWidth
  }

  // But in this way, our wrapper element will be height: 0,
  // so we add `overflow: hidden` to wrapper's style to avoid
  // wrapper element collapsing.
  wrapper.style.overflow = 'hidden'
  wrapper.style.overflow = 'relative'

  // Then we define a helper function to calculate correct index.
  // This function help us calculate next or prev slide's index.
  const circle = index => (slides.length + (index % slides.length)) % slides.length
  // `this.index` will be update during user swiping.
  this.index = circle(this.options.startSlideIndex) || 0
  slides[circle(this.index - 1)].style.transform = `translate3d(${slideWidth}px, 0px, 0px)`
  currentTranslate[circle(this.index - 1)] = slideWidth

  slides[this.index].style.transform = 'translate3d(0px, 0px, 0px)'
  currentTranslate[this.index] = 0

  slides[circle(this.index + 1)].style.transform = `translate3d(${-slideWidth}px, 0px, 0px)`
  currentTranslate[circle(this.index + 1)] = -slideWidth

  // After we add `left: -${i * slideWidth}px`

  //                                      wrapper
  // +---------------+
  // |               |
  // |               |
  // |               |
  // |    slide 5    |
  // |               |
  // |               |
  // |   container   |
  // |               |
  // |               |
  // |               |
  // +---------------+

  // You can see, all other slides have been covered by the last one.
  // We have finished basic layout.

  let touchStartPosition = { x: 0, y: 0 }
  let touchStartTime = 0
  const delta = { x: 0, y: 0 }
  let isPastBounds = false

  // let destroyed = false // if the swiper has been destroyed.

  // now we define some helper functions

  const onTouchStart = (e) => {
    if (e.touches.length === 1) {
      // we record this two values to calculate swipe speed.
      touchStartPosition = {
        x: e.touches[0].pageX,
        y: e.touches[0].pageY,
      }
      touchStartTime = Date.now()
    }
  }

  const onTouchMove = (e) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0]
      delta.x = touch.pageX - touchStartPosition.x
      delta.y = touch.pageY - touchStartPosition.y

      isPastBounds =
        (!this.index && delta.x > 0) || // if first slide and slide amt is greater than 0
        (this.index === slides.length - 1 && delta.x < 0) // or if last slide and slide amt is less than 0

      let deltaX
      if (!isPastBounds || this.options.continuous) {
        // it is not past bounds or it is continuous
        deltaX = delta.x
      } else {
        // Use this function as resistance function:
        // ^ y
        // |                                 y = x^(1-r/2), 0 <= r <= 1.
        // |                                                   XXXX
        // |                                 XXXXX XX XXXX XXXX
        // |                      XXXXXXXXX X
        // |                 XXXXX
        // |             XXXX
        // |          XXX
        // |        XX
        // |      XX
        // |    XX
        // |   XX
        // |  XX
        // | X
        // |X
        // X---------------------------------------------------------> x
        const sign = Math.abs(delta.x) / delta.x
        deltaX = (sign * (Math.abs(delta.x) ** (1 - (this.options.resistance / 2))))
      }
      slides[circle(this.index - 1)].style.transform
        = `translate3d(${deltaX - currentTranslate[circle(this.index - 1)]}px, 0px, 0px)`
      slides[this.index].style.transform
        = `translate3d(${deltaX - currentTranslate[this.index]}px, 0px, 0px)`
      slides[circle(this.index + 1)].style.transform
        = `translate3d(${deltaX - currentTranslate[circle(this.index + 1)]}px, 0px, 0px)`
    }
  }

  const onTouchEnd = (e) => {
    if (e.changedTouches.length === 1) {
      // After a touch is end, we need to know if this
      // touch is a valid swipe
      const duration = Date.now() - touchStartTime

      // this judgement is acceptable to people.
      const isValidSlide =
        duration < 250 && // if slide duration is less than 250ms
          (
            Math.abs(delta.x) > 20 || // and if slide amt is greater than 20px
            Math.abs(delta.x) > slideWidth / 2 // or if slide amt is greater than half the width
          )

      // user accept continuous, so we allow swipe.
      if (this.options.continuous) isPastBounds = false

      // determine direction of swipe (true:right, false:left)
      const direction = delta.x < 0

      if (isValidSlide && !isPastBounds) {
        if (direction) { // right
          this.index = circle(this.index + 1)
        } else {
          this.index = circle(this.index - 1)
        }
      } else {
        this.index = circle(this.index)
      }
      // wrapper.style.transition = `transform ${this.options.speed}ms`
      // wrapper.style.transform = `translate3d(${circle(this.index) * -slideWidth}px, 0px, 0px)`

      // write a function with a name to removeEventListener()
      // const onTransitionEnd = (event) => {
      //   wrapper.style.transition = ''
      //   // call user's callback
      //   this.options.transitionEnd.call(event, this.index, slides[this.index])
      //   wrapper.removeEventListener('transitionend', onTransitionEnd)
      // }
      // wrapper.addEventListener('transitionend', onTransitionEnd)

      // currentTranslate += touchStartPosition.x - touch.pageX
      slides[circle(this.index - 1)].style.transform = `translate3d(${slideWidth}px, 0px, 0px)`
      currentTranslate[circle(this.index - 1)] = slideWidth

      slides[this.index].style.transform = 'translate3d(0px, 0px, 0px)'
      currentTranslate[this.index] = 0

      slides[circle(this.index + 1)].style.transform = `translate3d(${-slideWidth}px, 0px, 0px)`
      currentTranslate[circle(this.index + 1)] = -slideWidth
    }
  }

  // const onMouseDown = (e) => {

  // }

  // const onMouseMove = (e) => {

  // }

  // const onMouseUp = (e) => {

  // }

  wrapper.addEventListener('touchstart', onTouchStart, false)
  wrapper.addEventListener('touchmove', onTouchMove, false)
  wrapper.addEventListener('touchend', onTouchEnd, false)

  // wrapper.addEventListener('mousedown', onMouseDown)
  // wrapper.addEventListener('mousemove', onMouseMove)
  // wrapper.addEventListener('mouseup', onMouseUp)

  Swiper.DIRECTION_VERTICAL = 'vertical'
  Swiper.DIRECTION_HORIZON = 'horizon'

  Swiper.prototype.destroy = function () {
    // destroyed = true

    wrapper.removeEventListener('touchstart', onTouchStart)
    wrapper.removeEventListener('touchmove', onTouchMove)
    wrapper.removeEventListener('touchend', onTouchEnd)
  }

  Swiper.prototype.prevSlide = function () {

  }

  Swiper.prototype.nextSlide = function () {

  }
  // this.wrapper = wrapper
  Swiper.prototype.slideTo = function () {

  }

  Swiper.prototype.update = function () {

  }
}

window.Swiper = Swiper
