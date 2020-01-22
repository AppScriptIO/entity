import { deepFreeze } from '@dependency/handleJSNativeDataStructure'
import { applyFunctionalityContainerFunction, createSwitch, nestedPropertyDelegatedLookupCurried, mergeOwnNestedPropertyCurried } from '../prototypeMethod.js'
import * as symbol from '../../sharedSymbol.js'

export const $ = {
  // Hold all related objects needed to create a delegation to a specific prototype (e.g. a key may hold `reference` symbols & a functionality `prototype` object) - Holds properties required in prototype delegation
  prototypeDelegation: {
    getter: Symbol('prototypeDelegation.getter'),
    setter: Symbol('prototypeDelegation.setter'),
    list: Symbol('prototypeDelegation.list'),
  },
  // Responsible for the creation of instances with setting prototype delegation - e.g. instance could be a JS Object or a JS Function.
  instantiate: {
    switch: Symbol('instantiate.switch'),
    setter: Symbol('instantiate.setter'),
    getter: Symbol('instantiate.getter'),
    fallback: Symbol('instantiate.fallback'),
    list: Symbol('instantiate.list'),
  },
  // Responsible for manipulating an instance - e.g. add properties to the instance, change delegation, wrap with proxy to change behavior.
  initialize: {
    switch: Symbol('initialize.switch'),
    setter: Symbol('initialize.setter'),
    getter: Symbol('initialize.getter'),
    fallback: Symbol('initialize.fallback'),
    list: Symbol('initialize.list'),
  },
}
// deepFreeze({ object: $, getPropertyImplementation: Object.getOwnPropertyNames })

// functionality
export const f = {
  // [symbol.metadata]: { type: Symbol('Instantiate & Initialize functionality') },
  prototypeDelegation: {
    setter: mergeOwnNestedPropertyCurried({ property: [$.prototypeDelegation.list] }),
    getter: nestedPropertyDelegatedLookupCurried({ baseProperty: [$.prototypeDelegation.list] }),
  },
  instantiate: {
    switch: createSwitch({ fallbackPropertyPath: [$.instantiate.fallback], implementationGetterPropertyPath: [$.instantiate.getter] }),
    setter: mergeOwnNestedPropertyCurried({ property: [$.instantiate.list] }),
    getter: nestedPropertyDelegatedLookupCurried({ baseProperty: [$.instantiate.list] }),
  },
  initialize: {
    switch: createSwitch({ fallbackPropertyPath: [$.initialize.fallback], implementationGetterPropertyPath: [$.initialize.getter] }),
    setter: mergeOwnNestedPropertyCurried({ property: [$.initialize.list] }),
    getter: nestedPropertyDelegatedLookupCurried({ baseProperty: [$.initialize.list] }),
  },
}

// apply functionality
export function apply(targetObject) {
  // [symbol.metadata]: { type: Symbol('Client interface functionality') },
  Object.assign(targetObject, {
    [$.prototypeDelegation.getter]: f.prototypeDelegation.getter,
    [$.prototypeDelegation.setter]: f.prototypeDelegation.setter,
    [$.prototypeDelegation.list]: {},
  })
  Object.assign(targetObject, {
    [$.instantiate.switch]: f.instantiate.switch,
    [$.instantiate.getter]: f.instantiate.getter,
    [$.instantiate.setter]: f.instantiate.setter,
    [$.instantiate.list]: {},
    [$.instantiate.fallback]: undefined,
  })
  Object.assign(targetObject, {
    [$.initialize.switch]: f.initialize.switch,
    [$.initialize.getter]: f.initialize.getter,
    [$.initialize.setter]: f.initialize.setter,
    [$.initialize.list]: {},
    [$.initialize.fallback]: undefined,
  })
  return targetObject
}
