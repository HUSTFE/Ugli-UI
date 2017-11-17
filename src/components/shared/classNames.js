import includes from './includes'

// TODO: remove extra space in return value
export const addClassName = (className, ...classNames) => {
  if (classNames.length === 0) return className
  return `${className} ${classNames.join(' ')}`
}

export const removeClassName = (className, ...classNames) => {
  return className
    .split(' ')
    .filter(cls => !includes(classNames, cls))
    .join(' ')
}
