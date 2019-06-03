import { Reference } from './Reference.js'
import { deepFreeze } from '../../utility/deepObjectFreeze.js'
import { createSwitchGeneratorFunction, nestedPropertyDelegatedLookupCurried, mergeOwnNestedPropertyCurried } from '../prototypeMethod.js'
import * as symbol from '../Symbol.reference.js'

export const Prototype = {
  // [symbol.metadata]: { type: Symbol('Constructor functionality') },
  [Reference.constructor.functionality]: {
    setter: mergeOwnNestedPropertyCurried({ property: Reference.constructor.list }),
    getter: nestedPropertyDelegatedLookupCurried({ baseProperty: Reference.constructor.list }),
    switch: createSwitchGeneratorFunction({ fallbackPropertyPath: Reference.constructor.fallback, implementationGetterPropertyPath: [Reference.constructor.functionality, 'getter'] }),
  },
  [Reference.constructor.list]: {},
  [Reference.constructor.fallback]: undefined,
}

// prevent accidental manipulation of delegated prototype
// deepFreeze({ object: Prototype, getPropertyImplementation: Object.getOwnPropertySymbols })
