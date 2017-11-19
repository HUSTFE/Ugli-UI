/**
 * +---------------------------------------------------------------------+
 * | Faraway's Swiper, even worse than a lot similar swipers on github.  |
 * | Write for practice                                                  |
 * | Faraway <hzylovelyl@gmail.com>                                      |
 * +---------------------------------------------------------------------+
 */

export default class Swiper {
  static DIRECTION_VERTICAL = '@@swiper vertical'
  static DIRECTION_HORIZON = '@@swiper horizon'

  constructor(container, options = {
    startSlideIndex: 0,
    speed: 300,
    auto: 0,
    continuous: true,
    disableScroll: false,
    stopPropagation: false,
    debounce: true,
    direction: Swiper.DIRECTION_VERTICAL,
    callback: () => {},
    transitionEnd: () => {},
  }) {
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

    // Then we set all slides to `float: left`.
    // like this:

    //                       wrapper
    // +**********---------+---------+---------+---------+
    // *         *         |         |         |         |
    // * slide 1 *    2    |    3    |    4    |    5    |
    // *         *         |         |         |         |
    // *container*         |         |         |         |
    // *         *         |         |         |         |
    // *         *         |         |         |         |
    // ***********---------+---------+---------+---------+

    // `float: left` is the most important style for each slide.
    for (let i = 0; i < slides.length; i += 1) {
      slides[i].style.cssFloat = 'left'
    }

    // But in this way, our wrapper element will be height: 0,
    // so we add `overflow: hidden` to wrapper's style to avoid
    // wrapper element collapsing.
    wrapper.style.overflow = 'hidden'
  }
}
