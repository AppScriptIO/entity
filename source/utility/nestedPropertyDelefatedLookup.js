import { metadata } from '../functionalityPrototype/Symbol.reference.js'
/** Lookup algorithm used by 'functionality prototype'.
 * In case multiple matching properties the array produces is ordered from the target object property to the delegated (parent) objects` properties.
 */
export const nestedPropertyDelegatedLookup = ({
  target, // the object to lookup property on.
  baseProperty, // direct property / base property to check in.
  nestedProperty, // nested property key to check if exist.
  recursive = false, // recusively lookup and allow to return multiple results.
}) => {
  const hasOwnProperty = Object.prototype.hasOwnProperty // allows supporting objects delefating null.
  let result = [],
    breakOnFirstMatch = !recursive
  do {
    if (hasOwnProperty.call(target, baseProperty) && hasOwnProperty.call(target[baseProperty], nestedProperty)) {
      target[baseProperty][nestedProperty] |> result.push
    }
    if (breakOnFirstMatch && result.length > 0) break // break in case only a single match is required.
    target = Object.getPrototypeOf(target)
  } while (target != null)

  return recursive ? result : result[0]
}
