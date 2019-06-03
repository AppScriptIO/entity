import assert from 'assert'
const hasOwnProperty = Object.prototype.hasOwnProperty // allows supporting objects delefating null.

// supports multiple nested properties (property path array)
export const mergeOwnNestedProperty = ({ target, propertyPath, value }: { propertyPath: Array | String /*Property path*/ }) => {
  assert(propertyPath, '• `propertyPath` must be passed.')

  if (!Array.isArray(propertyPath)) propertyPath = [propertyPath]
  let targetProperty = target
  for (let index in propertyPath) {
    if (!hasOwnProperty.call(targetProperty, propertyPath[index])) {
      // create property path recusively
      Object.defineProperty(targetProperty, propertyPath[index], { enumerable: true, writable: true, value: {} })
    }
    targetProperty = targetProperty[propertyPath[index]]
  }
  Object.assign(targetProperty, value)
  return target
}

// set properties only if they do not exist on the target object. Not using `Object.enteries` because it ignores symbols as keys.
export const mergeNonexistentProperties = (targetObject, defaultValue: Object) => {
  // Important: for loops do not support symbol keys iteration, therefore keys, therefore a different approach is taken.
  let propertyKey = [...Object.getOwnPropertySymbols(defaultValue), ...Object.getOwnPropertyNames(defaultValue)]
  let propertyDescriptor = Object.getOwnPropertyDescriptors(defaultValue)
  propertyKey.forEach(key => {
    if (!hasOwnProperty.call(targetObject, key)) Object.defineProperty(targetObject, key, propertyDescriptor[key])
  })
}

// merge arguments array that may have object items
export const mergeArrayWithObjectItem = ({ listTarget, listDefault }) => {
  // merge arguments with default parameters
  for (let index in listTarget) {
    if (typeof listTarget[index] == 'object' && typeof listDefault[index] == 'object') listTarget[index] = Object.assign(listDefault[index], listTarget[index])
    listTarget[index] ||= listDefault[index]
  }
}
