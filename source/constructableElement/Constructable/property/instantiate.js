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
// create a function (constructable) without a constructor (throws when run)  E.g. used to be used with Proxy wrapper, allowing construct & apply handlers.
const createConstructableWithoutContructor = () => {
  // returns an anonymous function, that when called produces a named function.
  return new Function(`return function (){ throw new Error('• Construction should not be reached, rather the proxy wrapping it should deal with the construct handler.') }`)
}

/**
 * Create an instance (either a function or an object) with a delegation to another prototype.
 * general implementation which creates an object delegating to passed param.
 */
export function createObjectWithDelegation({ prototype = null, instanceType }: { instanceType: 'object' | 'function' } = {}) {
  let instance
  switch (instanceType) {
    case 'function':
      instance = createConstructableWithoutContructor()
      Object.setPrototypeOf(targetInstance, prototype)
      break
    case 'object':
    default:
      instance = Object.create(prototype)
      break
  }
  return instance
}
