function debounce(fn, wait = 100) {
  let timeId = null
  return function (...rest) {
    clearTimeout(timeId)
    timeId = setTimeout(() => {
      fn.apply(this, rest)
    }, wait)
  }
}

export default debounce
