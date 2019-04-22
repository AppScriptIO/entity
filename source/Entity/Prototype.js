import { Reference } from './Reference.js'
import { mergeOwnNestedProperty } from '../utility/mergeProperty.js'
import { createSwitchGeneratorFunction, nestedPropertyDelegatedLookup } from '../utility/prototypeFunctionality.js'

export const Prototype = {
  /**
   * clientInterface
   **/
  [Reference.clientInterface.setter.list](implementation: Object) {
    return mergeOwnNestedProperty({ target: this, ownProperty: Reference.clientInterface.list, value: implementation })
  },
  [Reference.clientInterface.getter.list](implementationKey: String) {
    return nestedPropertyDelegatedLookup({ target: this, directProperty: Reference.clientInterface.list, nestedProperty: implementationKey })
  },
  [Reference.clientInterface.switch]: createSwitchGeneratorFunction({ fallbackSymbol: Reference.clientInterface.fallback, implementationListSymbol: Reference.clientInterface.getter.list }),
  [Reference.clientInterface.fallback]: Reference.clientInterface.key.prototypeConstruct,
  [Reference.clientInterface.list]: {},
}
