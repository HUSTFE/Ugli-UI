function debounce(fn, wait = 100) {
  let timeId = null
  return (...rest) => {
    clearTimeout(timeId)
    timeId = setTimeout(() => {
      fn.apply(this, rest)
    }, wait)
  }
}

export default debounce
