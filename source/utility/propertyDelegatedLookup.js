import { metadata } from '../functionalityPrototype/Symbol.reference.js'
const hasOwnProperty = Object.prototype.hasOwnProperty // allows supporting objects delefating null.

/** Lookup algorithm used by 'functionality prototype'.
 * In case multiple matching properties the array produces is ordered from the target object property to the delegated (parent) objects` properties. // property is nested in multiple levels e.g. target[symbol][key][property]
 */
export const nestedPropertyDelegatedLookup = ({
  target,
  recursive = false,
  propertyPath, // direct property / base property to check in.
}: {
  propertyPath: Array | String,
}) => {
  return propertyDelegatedLookup({
    target,
    recursive,
    // multiple nested properties lookup
    getPropertyCallback: targetObject => {
      if (!Array.isArray(propertyPath)) propertyPath = [propertyPath] // use same implementation for all cases.
      let propertyValue = targetObject
      for (let property of propertyPath) {
        if (hasOwnProperty.call(propertyValue, property)) propertyValue = propertyValue[property]
        else return undefined
      }
      return propertyValue
    },
  })
}

// lookup recursively for property on target
export const propertyDelegatedLookup = ({
  target, // the object to lookup property on.
  recursive = false, // recusively lookup and allow to return multiple results.
  property, // optional as the property key can be in the closure of the callback function.
  // callback to hand over control to caller function.
  getPropertyCallback = (target, property) => (target[property] ? target[property] : undefined),
} = {}) => {
  let aggregatorArray = [],
    breakOnFirstMatch = !recursive
  do {
    let propertyValue = getPropertyCallback(target, property) // callback should decide whether to add value to the array if found.
    if (propertyValue != undefined) aggregatorArray.push(propertyValue)
    if (breakOnFirstMatch && aggregatorArray.length > 0) break // break in case only a single match is required.
    target = Object.getPrototypeOf(target)
  } while (target != null)
  return recursive ? aggregatorArray : aggregatorArray[0]
}
