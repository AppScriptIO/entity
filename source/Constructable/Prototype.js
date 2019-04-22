import { deepFreeze } from '../utility/deepObjectFreeze.js'
import { mergeNonexistentProperties, mergeOwnNestedProperty } from '../utility/mergeProperty.js'
import { createSwitchGeneratorFunction, nestedPropertyDelegatedLookup, executionControl } from '../utility/prototypeFunctionality.js'
import { Reference } from './Reference.js'

export const Prototype = {
  /**
   * prototypeDelegation
   */
  [Reference.prototypeDelegation.setter.list](implementation: Object) {
    // set constractor property on prototype
    // for (const key of Object.keys(implementation)) {
    //   //???? Not needed
    //   implementation[key].constructor = this
    // }
    return mergeOwnNestedProperty({
      target: this,
      ownProperty: Reference.prototypeDelegation.list,
      value: implementation,
    })
  },
  [Reference.prototypeDelegation.getter.list](implementationKey: String) {
    return nestedPropertyDelegatedLookup({
      target: this,
      directProperty: Reference.prototypeDelegation.list,
      nestedProperty: implementationKey,
    })
  },
  [Reference.prototypeDelegation.list]: {},

  /**
   * instance - instantiate
   */
  [Reference.instantiate.setter.list](implementation: Object) {
    return mergeOwnNestedProperty({ target: this, ownProperty: Reference.instantiate.list, value: implementation })
  },
  [Reference.instantiate.getter.list](implementationKey: String) {
    return nestedPropertyDelegatedLookup({
      target: this,
      directProperty: Reference.instantiate.list,
      nestedProperty: implementationKey,
    })
  },
  [Reference.instantiate.switch]: createSwitchGeneratorFunction({
    fallbackSymbol: Reference.instantiate.fallback,
    implementationListSymbol: Reference.instantiate.getter.list,
  }),
  [Reference.instantiate.list]: {},

  /**
   * instance - initialize
   */
  [Reference.initialize.setter.list](implementation: Object) {
    return mergeOwnNestedProperty({ target: this, ownProperty: Reference.initialize.list, value: implementation })
  },
  [Reference.initialize.getter.list](implementationKey: String) {
    return nestedPropertyDelegatedLookup({
      target: this,
      directProperty: Reference.initialize.list,
      nestedProperty: implementationKey,
    })
  },
  [Reference.initialize.switch]: createSwitchGeneratorFunction({
    fallbackSymbol: Reference.initialize.fallback,
    implementationListSymbol: Reference.initialize.getter.list,
  }),
  [Reference.initialize.list]: {},

  /**
   * constructor
   **/
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
  [Reference.constructor.fallback]: Reference.constructor.key.constructable,
  [Reference.constructor.list]: {},
}

// prevent accidental manipulation of delegated prototype
// deepFreeze({ object: Prototype, getPropertyImplementation: Object.getOwnPropertySymbols })
