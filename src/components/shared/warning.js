/* eslint-disable import/prefer-default-export */
// TODO: remove eslint-disable after adding more functions
export const warning = (condition, message) => {
  if (condition) {
    // eslint-disable-next-line no-console
    console.warn(message)
  }
  return condition
}
