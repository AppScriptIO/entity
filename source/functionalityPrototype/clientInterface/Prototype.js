import { Reference } from './Reference.js'
import { mergeOwnNestedProperty } from '../../utility/mergeProperty.js'
import { createSwitchGeneratorFunction, nestedPropertyDelegatedLookupAdapter } from '../prototypeMethod.js'
import * as symbol from '../Symbol.reference.js'

export const Prototype = {
  [symbol.metadata]: {
    type: Symbol('Client interface functionality'),
  },
  [Reference.clientInterface.setter.list](implementation: Object) {
    return mergeOwnNestedProperty({ target: this, ownProperty: Reference.clientInterface.list, value: implementation })
  },
  [Reference.clientInterface.getter.list]: nestedPropertyDelegatedLookupAdapter({ baseProperty: Reference.clientInterface.list }),
  [Reference.clientInterface.switch]: createSwitchGeneratorFunction({ fallbackSymbol: Reference.clientInterface.fallback, implementationGetterSymbol: Reference.clientInterface.getter.list }),
  [Reference.clientInterface.fallback]: undefined,
  [Reference.clientInterface.list]: {},
}
