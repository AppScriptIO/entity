import { deepFreeze } from '@dependency/handleJSNativeDataStructure'
import { nestedPropertyDelegatedLookup } from '../../../utility/delegatedLookup.js'
import { createSwitch, nestedPropertyDelegatedLookupCurried, mergeOwnNestedPropertyCurried } from '../prototypeMethod.js'
import * as symbol from '../../sharedSymbol.js'

/**
 * ProgrammaticAPI$ for the target extedning object to use. Entity api reference - reference to symbol keys.
 **/
export const $ = {
  // Constructor combines instantiation, prototypeDelegation, & initialization
  constructor: {
    switch: Symbol('constructor.switch'),
    setter: Symbol('constructor.setter'),
    getter: Symbol('constructor.getter'),
    fallback: Symbol('constructor.fallback'),
    list: Symbol('constructor.list'),
  },

}
// deepFreeze({ object: $, getPropertyImplementation: Object.getOwnPropertyNames })

const f = {
  // [symbol.metadata]: { type: Symbol('Constructor functionality') },
  // function that redirects to an implementation
  switch: createSwitch({ fallbackPropertyPath: [$.constructor.fallback], implementationGetterPropertyPath: [$.constructor.getter] }),
  // getter/setter - functions for implementation lookup and addition.
  setter: mergeOwnNestedPropertyCurried({ property: [$.constructor.list] }),
  getter: nestedPropertyDelegatedLookupCurried({ baseProperty: [$.constructor.list] }),
}
// deepFreeze({ object: functionality, getPropertyImplementation: Object.getOwnPropertySymbols }) // prevent accidental manipulation of delegated prototype

export function apply(targetObject) {
  // [symbol.metadata]: { type: Symbol('Client interface functionality') },
  Object.assign(targetObject, {
    [$.constructor.switch]: f.switch,
    [$.constructor.getter]: f.getter,
    [$.constructor.setter]: f.setter,
    [$.constructor.list]: {},
    [$.constructor.fallback]: undefined,
  })
  return targetObject
}
