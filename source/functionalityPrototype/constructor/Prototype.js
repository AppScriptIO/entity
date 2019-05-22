import { Reference } from './Reference.js'
import { deepFreeze } from '../../utility/deepObjectFreeze.js'
import { mergeNonexistentProperties, mergeOwnNestedProperty } from '../../utility/mergeProperty.js'
import { createSwitchGeneratorFunction, nestedPropertyDelegatedLookup } from '../prototypeMethod.js'
import * as symbol from '../Symbol.reference.js'

export const Prototype = {
  [symbol.metadata]: {
    type: Symbol('Constructor functionality'),
  },
  [Reference.constructor.setter.list](implementation: Object) {
    return mergeOwnNestedProperty({ target: this, ownProperty: Reference.constructor.list, value: implementation })
  },
  [Reference.constructor.getter.list](implementationKey: String) {
    return nestedPropertyDelegatedLookup({
      target: this,
      directProperty: Reference.constructor.list,
      nestedProperty: implementationKey,
    })
  },
  [Reference.constructor.switch]: createSwitchGeneratorFunction({
    fallbackSymbol: Reference.constructor.fallback,
    implementationListSymbol: Reference.constructor.getter.list,
  }),
  [Reference.constructor.fallback]: undefined,
  [Reference.constructor.list]: {},
}

// prevent accidental manipulation of delegated prototype
// deepFreeze({ object: Prototype, getPropertyImplementation: Object.getOwnPropertySymbols })
