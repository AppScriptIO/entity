import assert from 'assert'
import { isGeneratorFunction } from '../utility/isGeneratorFunction.js'
import { executionControl } from '../utility/generatorExecutionControl.js'
import { nestedPropertyDelegatedLookup } from '../utility/propertyDelegatedLookup.js'
import { mergeOwnNestedProperty } from '../utility/mergeProperty.js'
import { getNestedObject } from '../utility/getNestedObject.js'

export const nestedPropertyDelegatedLookupCurried = ({ baseProperty }) => {
  if (!Array.isArray(baseProperty)) baseProperty = [baseProperty]
  return function(implementationKey: String, recursive: Boolean = false, callerClass = this) {
    assert(implementationKey, `• implementationKey must be passed.`)
    return nestedPropertyDelegatedLookup({
      target: callerClass,
      propertyPath: [...baseProperty, implementationKey],
      recursive,
    })
  }
}

export const mergeOwnNestedPropertyCurried = ({ property }) => {
  if (!Array.isArray(property)) property = [property]
  return function(implementation: Object) {
    return mergeOwnNestedProperty({ target: this, propertyPath: property, value: implementation })
  }
}

// The generator function uses a pattern that allows to handover control (yield values) and propagate to the request function (switch target function)
export const createSwitchGeneratorFunction = function({
  fallbackPropertyPath,
  implementationGetterPropertyPath, // the getter function for the implementation using its key.
}) {
  if (!Array.isArray(fallbackPropertyPath)) fallbackPropertyPath = [fallbackPropertyPath]
  if (!Array.isArray(implementationGetterPropertyPath)) implementationGetterPropertyPath = [implementationGetterPropertyPath]

  let generatorFunction = function*({
    implementationKey,
    /* Like the native JS behavior for `constructor` function that calls the super constructor as well in the chain.
      Functions using recursive option must follow the function definition -  function(argumentList<Object>, previousResult<any>)
    */
    recursiveDelegationChainExecution = false, // Execute all functions in the delegation chain that match the `implementationKey` value. e.g. use initialization function from each class in the prototype chain.
    callerClass = this, // the constructable class that initiated the function call.
  }: { implementationKey: String } = {}) {
    const controlArg = function.sent,
      shouldHandOver = executionControl.shouldHandOver(controlArg),
      shouldPropagate = executionControl.shouldPropagate(controlArg)

    implementationKey ||= getNestedObject(callerClass, fallbackPropertyPath)

    let implementation: Object | Array<Object>, lookupResult // implementation functions to execute
    let implementationGetter = getNestedObject(callerClass, implementationGetterPropertyPath)
    if (recursiveDelegationChainExecution) {
      lookupResult = callerClass::implementationGetter(implementationKey, true /*recursive execution of multiple implementations*/)
      assert(lookupResult && lookupResult.length > 0, `• No implementation constructor found for key ${implementationKey.toString()}`)
    } else {
      // single implementation
      lookupResult = callerClass::implementationGetter(implementationKey)
      assert(lookupResult, `• No implementation constructor found for key ${(implementationKey && implementationKey.toString()) || implementationKey}`)
    }
    if (!Array.isArray(lookupResult)) lookupResult = [lookupResult] // for preventing separate code for execution.
    implementation = lookupResult.map((func, index) => {
      return { func: func, passThroughArg: {} /** Note: supporting array args is possible but adds additional complexity */ }
    })

    let result = null // acts as previous result (similar to reduce function but allows usage of `yield*` keyword)
    for (let index in implementation) {
      // NOte: execution starts from the first matching function in the prototype chain to the last i.e. from class caller to delegated object. This behavior is similar to the native JS `constructor` execution behavior in class inheritance.
      if (shouldHandOver) implementation[index].passThroughArg = yield implementation[index].passThroughArg // client should manipulate `implementation.passThroughArg` for each function in the chain.
      let currentResult = callerClass::implementation[index].func(implementation[index].passThroughArg, result /*pipe previous result as second paramter*/)

      // Deal with different function types - redirect construct to particular implementation using specific execution depending of function type.
      if (isGeneratorFunction(implementation[index].func)) {
        if (shouldPropagate) {
          // using `yield*` requires the client to make an additional empty call and adds, and makes differentiating yields more difficult.
          //TODO: Test for proper client ability to interact with this usecase (`yield*`)
          result = yield* currentResult
        } else {
          result = currentResult |> (g => g.next('complete').value)
        }
      } else {
        // regular function (non-generator)
        result = currentResult
      }
    }

    return result
  }

  return generatorFunction
}
