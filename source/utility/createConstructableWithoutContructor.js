// E.g. used to be used with Proxy wrapper, allowing construct & apply handlers.
export const createConstructableWithoutContructor = description => {
  // returns an anonymous function, that when called produces a named function.
  return new Function(`return function ${description}(){ throw new Error('• Construction should not be reached, rather the proxy wrapping it should deal with the construct handler.') }`)
}
