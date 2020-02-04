import assert from 'assert'
import { MultipleDelegation } from '@dependency/handlePrototypeDelegation'
import { metadata } from '../constructableElement/Functionality/sharedSymbol.js'
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
  return delegatedLookup({
    target,
    recursive,
    // multiple nested properties lookup
    retrieveValueFromPrototype: targetObject => {
      if (!Array.isArray(propertyPath)) propertyPath = [propertyPath] // use same implementation for all cases.
      for (let property of propertyPath) {
        let targetPropertyArray = [...Object.keys(Object.getOwnPropertyDescriptors(targetObject)), ...Object.getOwnPropertySymbols(targetObject)]
        if (targetPropertyArray.includes(property)) targetObject = targetObject[property]
        else return undefined
      }
      let propertyValue = targetObject
      return propertyValue
    },
  })
}

// Return the prototype/prototypes that matches the condition check.
export const conditionDelegatedLookup = ({
  target /*Target object with delegation chain to lookup in.*/,
  recursive = false,
  conditionCheck = prototypeTarget => prototypeTarget.constructor == Object /*The condition that should be met on the prototype object*/,
}) => {
  assert(conditionCheck, '• conditionCheck callback should be passed parameter.')
  return delegatedLookup({
    target,
    recursive,
    // multiple nested properties lookup
    retrieveValueFromPrototype: targetObject => (conditionCheck(targetObject) ? targetObject : undefined),
  })
}

// lookup recursively for property on target
export const delegatedLookup = ({
  target, // the object to lookup property on.
  recursive = false, // recusively lookup and allow to return multiple results.
  property, // optional as the property key can be in the closure of the callback function.
  // callback to hand over control to caller function.
  retrieveValueFromPrototype = (target, property) => (target[property] ? target[property] : undefined),
} = {}) => {
  let valueAggregatorArray = [],
    breakOnFirstMatch = !recursive,
    prototypeQueue = [target],
    visitedObject = new Set() // track visited objects, and prevent lookup on same object reference. This also adds support for circular delegation

  let index = 0
  do {
    let currentTarget = prototypeQueue[index]
    if (visitedObject.has(currentTarget)) {
      index++
      continue
    } else visitedObject.add(currentTarget)

    let retrievedValue = retrieveValueFromPrototype(currentTarget, property) // callback should decide whether to add value to the array if found.
    if (retrievedValue != undefined) valueAggregatorArray.push(retrievedValue)

    if (breakOnFirstMatch && valueAggregatorArray.length > 0) break // break for loop in case only a single match is required.

    let targetPrototpye = Object.getPrototypeOf(currentTarget)
    // check for multiple delegation return array.
    if (Array.isArray(targetPrototpye) && currentTarget instanceof MultipleDelegation) {
      prototypeQueue = prototypeQueue.concat(targetPrototpye)
    } else if (targetPrototpye /* not null or undefined */) {
      prototypeQueue.push(targetPrototpye)
    }
    index++
  } while (
    prototypeQueue.length > index &&
    !(breakOnFirstMatch && valueAggregatorArray.length > 0) // break While Loop in case only a single match is required.
  )

  return recursive ? valueAggregatorArray : valueAggregatorArray[0]
}
