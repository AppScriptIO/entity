import { Reference } from './Symbol.reference.js'
import { deepFreeze } from '../../utility/deepObjectFreeze.js'
import { mergeNonexistentProperties, mergeOwnNestedProperty } from '../../utility/mergeProperty.js'
import { createSwitchGeneratorFunction, nestedPropertyDelegatedLookup } from '../prototypeMethod.js'
import { executionControl } from '../../utility/generatorExecutionControl.js'

export const Prototype = {
  [symbol.metadata]: {
    type: Symbol('Instantiate & Initialize functionality'),
  },
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
}

/**
 *  prototypeDelegation
 */
Prototype[Reference.prototypeDelegation.setter.list]({})

/**
 *  Instantiate
 */
Prototype[Reference.instantiate.setter.list]({
  [Reference.instantiate.key.prototype]({ instanceObject, objectType, prototypeDelegation, construtorProperty, self = this, description }: { objectType: 'object' | 'function' }) {
    return createInstanceWithDelegation({ instanceObject, objectType, prototypeDelegation, construtorProperty, description })
  },
  [Reference.instantiate.key.prototypeInstance]({ instanceType = 'object', self = this }: { instanceType: 'object' | 'function' }) {
    let args = arguments[0]
    let implementationFunc = Prototype[Reference.instantiate.getter.list](Reference.instantiate.key.prototype)
    let instance = self::implementationFunc(
      Object.assign(args, {
        prototypeDelegation: self[Reference.prototypeDelegation.getter.list](Reference.prototypeDelegation.key.entityPrototype),
        construtorProperty: self[Reference.prototypeDelegation.getter.list](Reference.prototypeDelegation.key.entityClass),
        objectType: instanceType,
      }),
    )
    return instance
  },
})

/**
 *  Initialize
 */
Prototype[Reference.initialize.setter.list]({
  [Reference.initialize.key.configuredConstructor]({ description, instanceObject } = {}) {
    mergeNonexistentProperties(instanceObject, { self: Symbol(description) })
    return instanceObject
  },
  [Reference.initialize.key.constructableInstance]: initializeConstructableInstance,

  [Reference.initialize.key.data]({ data, instanceObject, self = this }: { data: Object } = {}) {
    Object.assign(instanceObject, data) // apply data to instance
    return instanceObject
  },
})
