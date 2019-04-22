import { isGeneratorFunction } from './isGeneratorFunction.js'
/**
 * Generators pattern
 * @param executionType - in a generator the first next(<argument>) call argument, catched using `function.sent`
 * Note about `propagation` of contorl - cannot use `yield*` techniques because - as it will call next without arguments implicitly. Therefore propagating in this way won't work, as dealing with uncontrolled next call isn't possible.
 **/
export const executionControl = {
  shouldHandOver: (executionType: Array | String) => {
    if (!Array.isArray(executionType)) executionType = [executionType]
    switch (true) {
      case executionType.includes('intermittent'):
      case executionType.includes('propagate'):
        return true
        break
      default:
      case executionType.includes('complete'):
        return false
    }
  },
  shouldPropagate: (executionType: Array | String) => {
    if (!Array.isArray(executionType)) executionType = [executionType]
    switch (true) {
      case executionType.includes('propagate'):
        return true
        break
      default:
      case executionType.includes('intermittent'):
      case executionType.includes('complete'):
        return false
    }
  },
}

export const nestedPropertyDelegatedLookup = ({ target, directProperty, nestedProperty }) => {
  const hasOwnProperty = Object.prototype.hasOwnProperty // allows supporting objects delefating null.
  let value
  do {
    if (hasOwnProperty.call(target, directProperty) && hasOwnProperty.call(target[directProperty], nestedProperty)) value = target[directProperty][nestedProperty]
    target = Object.getPrototypeOf(target)
  } while (!value && target != null)
  return value
}

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
