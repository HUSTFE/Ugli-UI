export default function isVisible(el) {
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
