import { createConstructableWithoutContructor } from '../utility/createConstructableWithoutContructor.js'
import * as symbol from './Symbol.reference.js'
import { mergeNonexistentProperties } from '../utility/mergeProperty.js'

export function createInstanceWithDelegation({ description, prototypeDelegation = null, instanceObject, objectType, construtorProperty = null }) {
  switch (objectType) {
    case 'function':
      instanceObject ||= createConstructableWithoutContructor(description)
      Object.setPrototypeOf(instanceObject, prototypeDelegation)
      break
    case 'object':
    default:
      instanceObject ||= Object.create(prototypeDelegation)
      break
  }
  Object.defineProperty(instanceObject, symbol.constructor, {
    value: construtorProperty,
    writable: true,
    enumerable: false,
    configurable: false,
  })
  return instanceObject
}

export function initializeConstructableInstance({ description, instanceObject, reference, prototype } = {}) {
  reference ||= Object.create(null)
  prototype ||= Object.create(instanceObject |> Object.getPrototypeOf) // Entities prototypes delegate to each other.
  mergeNonexistentProperties(instanceObject, {
    // set properties only if they do not exist on the target object.
    // self: Symbol(description),
    // get [Symbol.species]() {
    //   return GraphElement
    // },
    [symbol.reference]: reference,
    [symbol.prototype]: prototype, // Entities prototypes delegate to each other.
  })
  // set metadata information for debugging.
  Object.defineProperty(instanceObject, symbol.metadata, { writable: false, enumerable: false, value: { type: Symbol(description) } })
  // instanceObject[Reference.prototypeDelegation.setter.list]({
  //   [Reference.prototypeDelegation.key.entityPrototype]: instanceObject.prototype,
  //   [Reference.prototypeDelegation.key.entityClass]: instanceObject,
  // })
  return instanceObject
}

export function rootLevelConstructableInstance({ description, reference, prototype, prototypeDelegation }) {
  let instance = createInstanceWithDelegation({ description, prototypeDelegation: prototypeDelegation })
  initializeConstructableInstance({ description, reference, prototype, instanceObject: instance })
  Object.setPrototypeOf(instance, instance[symbol.prototype]) // root level specific
  return instance
}
