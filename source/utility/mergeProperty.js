export const mergeOwnNestedProperty = ({ target, ownProperty, value }) => {
  if (!Object.prototype.hasOwnProperty.call(target, ownProperty)) {
    Object.defineProperty(target, ownProperty, {
      enumerable: true,
      writable: true,
      value: {},
    })
  }
  Object.assign(target[ownProperty], value)
  return target
}

// set properties only if they do not exist on the target object. Not using `Object.enteries` because it ignores symbols as keys.
export const mergeNonexistentProperties = (targetObject, defaultValue: Object) => {
  let ownKeys = [...Object.getOwnPropertySymbols(defaultValue), ...Object.getOwnPropertyNames(defaultValue)]
  ownKeys.forEach(key => {
    let value = defaultValue[key]
    if (!Object.prototype.hasOwnProperty.call(targetObject, key)) Object.defineProperty(targetObject, key, { value, writable: true, enumerable: true })
  })
}
