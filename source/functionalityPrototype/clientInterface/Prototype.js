import { Reference } from './Reference.js'
import { createSwitchGeneratorFunction, nestedPropertyDelegatedLookupCurried, mergeOwnNestedPropertyCurried } from '../prototypeMethod.js'
import * as symbol from '../Symbol.reference.js'

export const Prototype = {
  // [symbol.metadata]: { type: Symbol('Client interface functionality') },
  [Reference.clientInterface.functionality]: {
    setter: mergeOwnNestedPropertyCurried({ property: Reference.clientInterface.list }),
    getter: nestedPropertyDelegatedLookupCurried({ baseProperty: Reference.clientInterface.list }),
    switch: createSwitchGeneratorFunction({ fallbackPropertyPath: Reference.clientInterface.fallback, implementationGetterPropertyPath: [Reference.clientInterface.functionality, 'getter'] }),
  },
  [Reference.clientInterface.list]: {},
  [Reference.clientInterface.fallback]: undefined,
}
