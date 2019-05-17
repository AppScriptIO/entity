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
