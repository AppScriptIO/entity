import { deepFreeze } from '@dependency/handleJSNativeDataStructure'
import { createSwitch, nestedPropertyDelegatedLookupCurried, mergeOwnNestedPropertyCurried } from '../prototypeMethod.js'
import * as symbol from '../../sharedSymbol.js'

// reference to symbol keys.
export const $ = {
  clientInterface: {
    switch: Symbol('clientInterface.switch'),
    setter: Symbol('clientInterface.setter'),
    getter: Symbol('clientInterface.getter'),
    fallback: Symbol('clientInterface.fallback'),
    list: Symbol('clientInterface.list'),
  },
}
// deepFreeze({ object: $, getPropertyImplementation: Object.getOwnPropertyNames })

// functionality
const f = {
  // switch function
  switch: createSwitch({ fallbackPropertyPath: [$.clientInterface.fallback], implementationGetterPropertyPath: [$.clientInterface.getter] }),
  setter: mergeOwnNestedPropertyCurried({ property: [$.clientInterface.list] }),
  getter: nestedPropertyDelegatedLookupCurried({ baseProperty: [$.clientInterface.list] }),
}

// apply functionality
export function apply(targetObject) {
  Object.assign(targetObject, {
    // [symbol.metadata]: { type: Symbol('Client interface functionality') },
    [$.clientInterface.switch]: f.switch,
    [$.clientInterface.getter]: f.getter,
    [$.clientInterface.setter]: f.setter,
    [$.clientInterface.list]: {},
    [$.clientInterface.fallback]: undefined,
  })
  return targetObject
}
