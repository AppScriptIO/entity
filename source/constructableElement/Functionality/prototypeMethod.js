import assert from 'assert'
import { mergeOwnNestedProperty, isGeneratorFunction } from '@dependency/handleJSNativeDataStructure'
import { nestedPropertyDelegatedLookup } from '../../utility/delegatedLookup.js'
import { getNestedObject } from '../../utility/getNestedObject.js'

export const nestedPropertyDelegatedLookupCurried = ({ baseProperty }) => {
  if (!Array.isArray(baseProperty)) baseProperty = [baseProperty]
  return function(implementationKey: String, recursive: Boolean = false, callerClass = this) {
    assert(implementationKey, `• implementationKey must be passed, cannot be undefined.`)
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

/**
 * @return {Array<Object>}
 */
function lookupImplementation({ implementationKey, fallbackPropertyPath, callerClass = this, implementationGetterPropertyPath, recursiveDelegationChainExecution }) {
  implementationKey ||= getNestedObject(callerClass, fallbackPropertyPath)
  let lookupResult // implementation functions to execute
  let implementationGetter = getNestedObject(callerClass, implementationGetterPropertyPath) // returns as nested property, in this case it is a getter function
  if (recursiveDelegationChainExecution) {
    lookupResult = callerClass::implementationGetter(implementationKey, true /*recursive execution of multiple implementations*/)
    assert(lookupResult && lookupResult.length > 0, `• No implementation constructor found for key ${implementationKey.toString()}`)
  } else {
    // single implementation
    lookupResult = callerClass::implementationGetter(implementationKey)
    assert(lookupResult, `• No implementation constructor found for key ${(implementationKey && implementationKey.toString()) || implementationKey}`)
  }
  if (!Array.isArray(lookupResult)) lookupResult = [lookupResult] // for preventing separate code for execution.
  // preparate functions registered for a specific implementation
  return lookupResult
}

/**
 * Change interface behavior for non generator targets - expose generator as regular function for quick non propagating calls.
 * When the generator's iterator is called the construct trap will iterate over it and return the result.
 * @param implementationGetterPropertyPath the getter function for the implementation using its key.
 **/
export const createSwitch = ({ fallbackPropertyPath, implementationGetterPropertyPath }) => {
  // expose an interface with two subsequent function calls
  return function switchInterface(
    implementationKey: string,
    {
      /* Like the native JS behavior for `constructor` function that calls the super constructor as well in the chain.
      No longer applied: //// Functions using recursive option must follow the function definition -  function(argumentList<Object>, previousResult<any>)
    */
      recursiveDelegationChainExecution = false, // Execute all functions in the delegation chain that match the `implementationKey` value. e.g. use initialization function from each class in the prototype chain.
      executionAlgorithm, // decides the interface used in executing the implemenations
      callerClass = this, // the constructable class that initiated the function call.
    } = {},
  ) {
    // lookup implementation functions:
    let implementationArray = callerClass::lookupImplementation({ implementationKey, fallbackPropertyPath, implementationGetterPropertyPath, recursiveDelegationChainExecution })
    if (implementationArray.length == 0) return function() {} // return empty dummy function to keep the flow of the client code.
    // execution algorithm switch
    {
      /** Send the parent implementation as callback to the child implementation function using Generators `function.sent` */
      function provideAsCallbackInFunctionChain() {
        function createCallbackFunc(targetFunction, superCallback) {
          let funcCallback
          /* Deal with different function types - redirect construct to particular implementation using specific execution depending of function type.        
               Usage: ```function* implementation() {
                  let { superCallback } = function.sent
                  if (superCallback) instance = callerClass::superCallback(...arguments)
                }```
            */
          if (isGeneratorFunction(targetFunction))
            funcCallback = function() {
              let iterator = this::targetFunction(...arguments)
              let iteratorObject = iterator.next({ superCallback })
              assert(iteratorObject.done, `• Generator implementation function must not yield results, only recieve the superCallback and return a value.`)
              return iteratorObject.value
            }
          else funcCallback = targetFunction // in case a regular function, then the superCallback will not be passed and so the execution chain will break.

          return funcCallback
        }

        implementationArray.reverse() // start from parent implementations - will result in the following order: [<parent>, ... , <child>] in hierarchy of implementations
        let previousLoopCallback = null
        for (let index = 0; index < implementationArray.length; index++) {
          let currentFunction = implementationArray[index]
          let callback = createCallbackFunc(currentFunction, previousLoopCallback)
          previousLoopCallback = callback
        }
        let result = callerClass::previousLoopCallback(...arguments) // the lowest implementation in delegation hierarchy
        return result
      }

      switch (executionAlgorithm) {
        case 'provideAsCallbackInFunctionChain':
        default:
          return provideAsCallbackInFunctionChain
          break
      }
    }
  }
}
