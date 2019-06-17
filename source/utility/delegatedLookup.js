import assert from 'assert'
import { MultipleDelegation } from '@dependency/multiplePrototypeDelegation'
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
  return delegatedLookup({
    target,
    recursive,
    // multiple nested properties lookup
    retrieveValueFromPrototype: targetObject => {
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

// Return the prototype/prototypes that matches the condition check.
export const conditionDelegatedLookup = ({
  target /*Target object with delegation chain to lookup in.*/,
  recursive = false,
  conditionCheck = false || (prototypeTarget => prototypeTarget.constructor == Object) /*The condition that should be met on the prototype object*/,
}) => {
  assert(conditionCheck, '• conditionCheck callback should be passed parameter.')
  return delegatedLookup({
    target,
    recursive,
    // multiple nested properties lookup
    retrieveValueFromPrototype: targetObject => {
      return conditionCheck(targetObject) ? targetObject : undefined
    },
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
    prototypeQueue = [target] // assign intial target
  while (
    prototypeQueue.length != 0 &&
    !(breakOnFirstMatch && valueAggregatorArray.length > 0) // break While Loop in case only a single match is required.
  ) {
    let targetAggregator = []
    for (let currentTarget of prototypeQueue) {
      let retrievedValue = retrieveValueFromPrototype(currentTarget, property) // callback should decide whether to add value to the array if found.
      if (retrievedValue != undefined) valueAggregatorArray.push(retrievedValue)

      if (breakOnFirstMatch && valueAggregatorArray.length > 0) break // break for loop in case only a single match is required.

      let targetPrototpye = Object.getPrototypeOf(currentTarget)
      // check for multiple delegation return array.
      if (Array.isArray(targetPrototpye) && MultipleDelegation.isInstanceof(currentTarget)) {
        targetAggregator = [...targetAggregator, ...targetPrototpye]
      } else if (targetPrototpye /* not null or undefined */) {
        targetAggregator.push(targetPrototpye)
      }
    }
    prototypeQueue = targetAggregator
  }
  return recursive ? valueAggregatorArray : valueAggregatorArray[0]
}
