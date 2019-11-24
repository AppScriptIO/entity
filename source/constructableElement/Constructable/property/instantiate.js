import { inherits as extend } from 'util'
import { $ } from '../Constructable.class.js'

/* Delegate to Superconstructor */
function extendFromConstructable(constructableTarget, constructableParent) {
  extend(constructableTarget, constructableParent)
  Object.setPrototypeOf(constructableTarget, constructableParent)
}
// inherit from null
function extendFromNull(constructable) {
  Object.setPrototypeOf(constructable, null)
  Object.setPrototypeOf(constructable.prototype, null)
}
// E.g. used to be used with Proxy wrapper, allowing construct & apply handlers.
const createConstructableWithoutContructor = description => {
  // returns an anonymous function, that when called produces a named function.
  return new Function(`return function ${description}(){ throw new Error('• Construction should not be reached, rather the proxy wrapping it should deal with the construct handler.') }`)
}

// general implementation which creates an object delegating to passed param.
/**
 * Create an instance (either a function or an object) with a delegation to another prototype.
 */
module.exports = {
  [$.key.createObjectWithDelegation]: function createObjectWithDelegation({ description, prototypeDelegation = null, targetInstance, instanceType }: { instanceType: 'object' | 'function' } = {}) {
    switch (instanceType) {
      case 'function':
        targetInstance ||= createConstructableWithoutContructor(description)
        Object.setPrototypeOf(targetInstance, prototypeDelegation)
        break
      case 'object':
      default:
        targetInstance ||= Object.create(prototypeDelegation)
        break
    }
    return targetInstance
  },
}
