/* eslint-disable no-underscore-dangle */

export function isVisibleInWindow(el) {
  if (!el || el.nodeType !== 1) {
    return false
  }

  if (window.getComputedStyle) {
    const style = window.getComputedStyle(el)
    const display = style.getPropertyValue('display')
    const visibility = style.getPropertyValue('visibility')

    if (display === 'none' || visibility === 'hidden') {
      return false
    }
  }

  let top = el.offsetTop
  let left = el.offsetLeft
  const width = el.offsetWidth
  const height = el.offsetHeight

  while (el.offsetParent) {
    el = el.offsetParent
    top += el.offsetTop
    left += el.offsetLeft
  }

  return (
    top >= window.pageYOffset &&
    left >= window.pageXOffset &&
    (top + height) <= (window.pageYOffset + window.innerHeight) &&
    (left + width) <= (window.pageXOffset + window.innerWidth)
  )
}

/**
 * ==============================================================================
 * VisibilityObserver
 * JavaScript plugin to observe element's visibility, compatible for IE9+
 * Author Faraway <hzylovelyl@gmail.com>
 * ==============================================================================
 */

// TODO: multi-element observe
export default class VisibilityObserver {
  // point to the instance of native IntersectingObserver
  _nativeObserver = null

  // _callback to remind user when element's visibility change
  _callback = null

  // if env supports native IntersectingObserver
  _nativeSupported = false

  // elements added by users using method observe(element)
  // Be used only when no native IntersectingObserver suppotred.
  _element = null

  // scroll and resize listener atached to element
  _listener = null

  _preVisibility = undefined

  // observed, if this instance has observed a element
  _observed = false

  constructor(callback) {
    if (window.IntersectionObserver) {
      this._nativeSupported = true

      // a _callback function for native IntersectingObserver
      this._callback = function (entries) {
        callback(entries
          .map(({ isIntersecting, target /* intersectionRatio */ }) => ({
            // intersectionRatio is not actually needed
            // because we only chack visibility
            visibility: isIntersecting,
            target,
          }))[0]
        )
      }
    } else {
      // use _callback function provided by users
      this._callback = (visibility) => {
        const target = this._element
        if (this._preVisibility !== undefined) {
          if (visibility !== this._preVisibility) {
            callback({ visibility, target })
            this._preVisibility = visibility
          }
        } else {
          callback({ visibility, target })
          this._preVisibility = visibility
        }
      }
    }
  }

  observe(element) {
    if (this._observed) {
      throw Error('You can only observe one element in a single instance now!')
    }

    if (!element) {
      throw TypeError('`observe` cannot run with an invalid element parameter.')
    }

    element = (typeof element === 'string'
      ? document.querySelector(element)
      : element
    )

    if (!element) {
      throw TypeError('`observe` connot find any DOM object that matches you selector.')
    }

    if (!(element instanceof HTMLElement)) {
      throw TypeError('`observe` need an instance of HTMLElement or a selector as argument.')
    }

    this._element = element

    if (this._nativeSupported) {
      this._nativeObserver = new window.IntersectionObserver(this._callback)
      this._nativeObserver.observe(element)
    } else {
      // oh, fuck! no IntersectionObserver.

      // save element's reference
      let tempElement = element
      const scrollableElements = []

      // find elements that has overflow: auto or overflow: scroll
      while (tempElement.parentNode && tempElement.parentElement !== document.documentElement) {
        const style = window.getComputedStyle(tempElement.parentNode)
        const overflow = style.getPropertyValue('overflow')
        if (overflow === 'auto' || overflow === 'scroll') {
          scrollableElements.unshift(tempElement.parentNode)
        }
        tempElement = tempElement.parentNode
      }

      const helper = (ele1, ele2) => {
        if (!(ele1 instanceof HTMLElement) && !(ele2 instanceof HTMLElement)) {
          return false
        }
        const rect1 = ele1.getBoundingClientRect()
        const rect2 = ele2.getBoundingClientRect()
        // console.log(rect1, rect2)
        return (
          rect1.top <= rect2.top + rect2.height &&
          rect1.left <= rect2.left + rect2.width &&
          rect1.top + rect1.height >= rect2.top &&
          rect1.left + rect1.width >= rect2.left
        )
      }

      this._listener = () => {
        // no other scrollable element, just return visibility in window
        if (scrollableElements.length === 0) {
          return this._callback(isVisibleInWindow(this._element))
        }
        if (!isVisibleInWindow(scrollableElements[0])) {
          // the most outer scroll element is not visible
          return this._callback(false)
        }
        for (let i = 0; i < scrollableElements.length; i += 1) {
          if (!helper(scrollableElements[i], scrollableElements[i + 1] || this._element)) {
            return this._callback(false)
          }
        }
        return this._callback(true)
      }

      this._listener()

      // add event listener for window, and other scrollable elements
      window.addEventListener('scroll', this._listener)
      window.addEventListener('resize', this._listener)
      for (let i = 0; i < scrollableElements.length; i += 1) {
        scrollableElements[i].addEventListener('scroll', this._listener)
        scrollableElements[i].addEventListener('resize', this._listener)
      }

      // override this.unobserve method for convenience
      this.unobserve = () => {
        window.removeEventListener('scroll', this._listener)
        window.removeEventListener('resize', this._listener)
        for (let i = 0; i < scrollableElements.length; i += 1) {
          scrollableElements[i].removeEventListener('scroll', this._listener)
          scrollableElements[i].removeEventListener('resize', this._listener)
        }
      }
    }
    this._observed = true
  }

  unobserve() {
    if (this._nativeSupported) {
      this._nativeObserver.unobserve(this._element)
    } else {
      // oh, fuck! no IntersectionObserver.
      // the unobserve method will be override in observe method for convenience.
    }
  }
}
