function throttle(fn, wait = 100) {
  let last = 0
  let timeId = null

  return function (...args) {
    const now = +new Date()
    let result = null
    const rest = wait - (now - last)

    if (rest <= 0 || rest > wait) {
      if (timeId) {
        clearTimeout(timeId)
      }
      last = now
      result = fn.apply(this, args)
    } else if (!timeId) {
      timeId = setTimeout(() => {
        last = now
        result = fn.apply(this, args)
        timeId = null
      }, rest)
    }

    return result
  }
}

export default throttle
