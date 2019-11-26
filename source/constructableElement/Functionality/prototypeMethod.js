import assert from 'assert'
import { isGeneratorFunction } from '../../utility/isGeneratorFunction.js'
import { executionControl } from '../../utility/generatorExecutionControl.js'
import { nestedPropertyDelegatedLookup } from '../../utility/delegatedLookup.js'
import { mergeOwnNestedProperty } from '../../utility/mergeProperty.js'
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

/** interface allowing to externally manipulate the behavior of the function */
export const createSwitchGeneratorFunction = function({
  fallbackPropertyPath,
  implementationGetterPropertyPath, // the getter function for the implementation using its key.
}) {
  if (!Array.isArray(fallbackPropertyPath)) fallbackPropertyPath = [fallbackPropertyPath]
  if (!Array.isArray(implementationGetterPropertyPath)) implementationGetterPropertyPath = [implementationGetterPropertyPath]

  /* The generator function uses a pattern that allows to handover control (yield values) and propagate to the request function (switch target function)
  The switch function supports:
  - Generator function yielding.
  - Generator functions as regular functions - when handover parameter is false.
  - regular functions
*/
  let generatorFunction = function*(
    implementationKey: string,
    // options
    {
      /* Like the native JS behavior for `constructor` function that calls the super constructor as well in the chain.
      Functions using recursive option must follow the function definition -  function(argumentList<Object>, previousResult<any>)
    */
      recursiveDelegationChainExecution = false, // Execute all functions in the delegation chain that match the `implementationKey` value. e.g. use initialization function from each class in the prototype chain.
      callerClass = this, // the constructable class that initiated the function call.
    } = {},
  ) {
    const controlArg = function.sent,
      shouldHandOver = executionControl.shouldHandOver(controlArg),
      shouldPropagate = executionControl.shouldPropagate(controlArg)

    implementationKey ||= getNestedObject(callerClass, fallbackPropertyPath)

    let implementation: Object | Array<Object>, lookupResult // implementation functions to execute
    let implementationGetter = getNestedObject(callerClass, implementationGetterPropertyPath) // returns as nested property, in this case it is a function
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
        // return the regular function (non-generator)
        result = currentResult
      }
    }

    return result
  }

  /**
   * Change interface behavior for non generator targets - expose generator as regular function for quick non propagating calls.
   * When the generator's iterator is called the construct trap will iterate over it and return the result.
   **/
  return new Proxy(generatorFunction, {
    apply(target, thisArg, argumentList) {
      let iterator = Reflect.apply(target, thisArg, argumentList)
      return new Proxy(function() {} /*allow non function to set apply handler*/, {
        apply(_, thisArg, _argumentList) {
          return (
            // execute iterator till the end.
            iterator
            |> (g => {
              g.next('intermittent')
              // pass to all implemenatations the same argument
              let iterator
              do {
                iterator = g.next(..._argumentList)
              } while (!iterator.done)
              return iterator.value
            })
          )
        },
        get(_, property, receiver) {
          let value = Reflect.get(iterator, property, receiver)
          if (property == 'next') return iterator::value // bind the original target iterator to prevent and error as the native generator implementation checks the target executing 'next' function.
          return value
        },
      })
    },
  })
}

/** this example was used with the above switch function, which allows to separate the function into steps and allows to intercept them from the client.
  generator function that uses a pattern allowing for handing over control to caller - i.e. running the function in steps.
  TODO: Document pattern used for handing over control to client and pipping results through the chain
*/
// let exampleOfHandoverPattern = {
//   [$.key.constructableClass]: function*({ description, reference, prototype, prototypeDelegation } = {}, { callerClass = this } = {}) {
//     prototypeDelegation ||= callerClass::callerClass[$.prototypeDelegation.getter]($.key.constructableClass).prototype
//     const step = [
//       // execution of steps allows for passing argument for each step and pipping the result of the previous step.
//       {
//         passThroughArg: { description, prototype: prototypeDelegation },
//         func: function(previousArg, arg) {
//           // get the prototype set in 'prototypeDelegation' list of the caller
//           let instance = createObjectWithDelegation(arg)
//           return { instance }
//         },
//         condition: true,
//       },
//       {
//         passThroughArg: { description, reference, prototype, construtorProperty: callerClass },
//         func: function({ instance }, arg) {
//           Object.assign(arg, { targetInstance: instance }) // pass to all implemenatations the same argument
//           callerClass::callerClass[$.initialize.switch]($.key.constructableClass, { recursiveDelegationChainExecution: true })(arg)
//           callerClass::callerClass[$.initialize.switch]($.key.classInstance)(lodash.pick(arg, ['description', 'targetInstance', 'construtorProperty']))
//           return instance
//         },
//         condition: true,
//       },
//     ]

//     // Run chain of step functions
//     let i = 0,
//       result,
//       shouldHandOverControl = executionControl.shouldHandOver(function.sent)
//     while (i < step.length) {
//       if (step[i].condition == false) {
//         i++
//         continue
//       }
//       if (shouldHandOverControl) {
//         yield step[i].passThroughArg
//         result = step[i].func(result, function.sent)
//       } else {
//         result = step[i].func(result, step[i].passThroughArg)
//       }
//       i++
//     }
//     return result
//   },
// }
