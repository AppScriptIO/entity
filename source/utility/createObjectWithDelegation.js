import { createConstructableWithoutContructor } from './createConstructableWithoutContructor.js'

/**
 * Create an instance (either a function or an object) with a delegation to another prototype.
 */
export function createObjectWithDelegation({ description, prototypeDelegation = null, targetInstance, instanceType }: { instanceType: 'object' | 'function' }) {
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
}
