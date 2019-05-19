import { isGeneratorFunction } from '../utility/isGeneratorFunction.js'
import { executionControl } from '../utility/generatorExecutionControl.js'

// Lookup algorithm used by 'functionality prototype'.
export const nestedPropertyDelegatedLookup = ({ target, directProperty, nestedProperty }) => {
  const hasOwnProperty = Object.prototype.hasOwnProperty // allows supporting objects delefating null.
  let value
  do {
    if (hasOwnProperty.call(target, directProperty) && hasOwnProperty.call(target[directProperty], nestedProperty)) value = target[directProperty][nestedProperty]
    target = Object.getPrototypeOf(target)
  } while (!value && target != null)
  return value
}

// The generator function uses a pattern that allows to handover control (yield values) and propagate to the request function (switch target function)
export const createSwitchGeneratorFunction = function({ fallbackSymbol, implementationListSymbol }) {
  return function*({ implementationKey, self = this }: { implementationKey: String } = {}) {
    const controlArg = function.sent
    implementationKey ||= self[fallbackSymbol]
    const implementation = {
      func: self::self[implementationListSymbol](implementationKey) || throw new Error(`• No implementation constructor found for key ${implementationKey}`),
      passThroughArg: {},
    }
    if (executionControl.shouldHandOver(controlArg)) {
      implementation.passThroughArg = yield implementation.passThroughArg
    }

    // redirect construct to particular implementation using specific execution depending of function type.
    if (isGeneratorFunction(implementation.func)) {
      if (executionControl.shouldPropagate(controlArg)) {
        return self::implementation.func(implementation.passThroughArg)
      } else {
        return self::implementation.func(implementation.passThroughArg) |> (g => g.next('complete').value)
      }
    } else {
      return self::implementation.func(implementation.passThroughArg)
    }
  }
}
