import includes from './includes'

export const addClassName = (className, ...classNames) => {
  if (classNames.length === 0) return className
  return `${className} ${classNames.join(' ')}`
    .replace(/[' ']+/g, ' ')
    .trim()
}

export const removeClassName = (className, ...classNames) => {
  return className
    .split(' ')
    .filter(cls => !includes(classNames, cls))
    .join(' ')
}
