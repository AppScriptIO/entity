import { isGeneratorFunction } from '../utility/isGeneratorFunction.js'
import { executionControl } from '../utility/generatorExecutionControl.js'
import { nestedPropertyDelegatedLookup } from '../utility/nestedPropertyDelefatedLookup.js'

export const nestedPropertyDelegatedLookupAdapter = ({ baseProperty }) =>
  function(implementationKey: String, recursive: Boolean = false, callerClass = this) {
    return nestedPropertyDelegatedLookup({
      target: callerClass,
      baseProperty,
      nestedProperty: implementationKey,
      recursive,
    })
  }

// The generator function uses a pattern that allows to handover control (yield values) and propagate to the request function (switch target function)
export const createSwitchGeneratorFunction = function({
  fallbackSymbol,
  implementationGetterSymbol, // the getter function for the implementation using its key.
}) {
  let generatorFunction = function*({
    implementationKey,
    // Like the native JS behavior for `constructor` function that calls the super constructor as well in the chain.
    recursiveDelegationChainExecution = false, // Execute all functions in the delegation chain that match the `implementationKey` value. e.g. use initialization function from each class in the prototype chain.
    callerClass = this, // the constructable class that initiated the function call.
  }: { implementationKey: String } = {}) {
    const controlArg = function.sent
    implementationKey ||= callerClass[fallbackSymbol]

    if (recursiveDelegationChainExecution) {
      let result = callerClass::callerClass[implementationGetterSymbol](implementationKey, true)
      console.log(result)
    }

    const implementation = {
      func: callerClass::callerClass[implementationGetterSymbol](implementationKey) || throw new Error(`• No implementation constructor found for key ${implementationKey}`),
      passThroughArg: {},
    }
    if (executionControl.shouldHandOver(controlArg)) {
      implementation.passThroughArg = yield implementation.passThroughArg
    }

    // redirect construct to particular implementation using specific execution depending of function type.
    if (isGeneratorFunction(implementation.func)) {
      if (executionControl.shouldPropagate(controlArg)) {
        return callerClass::implementation.func(implementation.passThroughArg)
      } else {
        return callerClass::implementation.func(implementation.passThroughArg) |> (g => g.next('complete').value)
      }
    } else {
      return callerClass::implementation.func(implementation.passThroughArg)
    }
  }
  return generatorFunction
}
