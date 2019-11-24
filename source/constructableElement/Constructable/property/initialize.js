import { $ } from '../Constructable.class.js'
import { mergeNonexistentProperties, mergeArrayWithObjectItem } from '../../../utility/mergeProperty.js'

module.exports = {
  // set the properties necessary for Constructable pattern usage.       // Initialize Constructable pattern properties.
  [$.key.constructableClass]: function initializeConstuctable({ targetInstance, reference, prototype, description, construtorProperty = this } = {}) {
    if (!reference) {
      let prototypeDelegationSetting = construtorProperty::construtorProperty[$.prototypeDelegation.getter]($.key.constructableClass)
      reference = Object.create(prototypeDelegationSetting.reference || null)
    }
    if (!prototype) {
      let prototypeDelegationSetting = construtorProperty::construtorProperty[$.prototypeDelegation.getter]($.key.constructableClass)
      prototype = Object.create(prototypeDelegationSetting.prototype || null) // Entities prototypes delegate to each other.
    }
    Object.setPrototypeOf(targetInstance, prototype) // inherit own and delegated functionalities.
    // set constructable prototypeDelegation properties - values which will be used in instance creation
    targetInstance::targetInstance[$.prototypeDelegation.setter]({
      [$.key.constructableClass]: {
        prototype: prototype,
        reference: reference,
      },
    })
    let prototypeDelegationGetter = targetInstance::targetInstance[$.prototypeDelegation.getter]
    mergeNonexistentProperties(targetInstance, {
      // in usage through `instanceof` JS api.
      // get [Symbol.species]() {
      //   return targetInstance[$.class] //! Doesn't work as it must return a constructor.
      // },
      // Note: expose `prototype` & `reference` on the instance directly for easier access. (this shouldn't be relied upon when constructing a sub instance / constructable instance)
      get reference() {
        return prototypeDelegationGetter($.key.constructableClass).reference
      },
      // get [$.prototype]() {
      //   return targetInstance::targetInstance[$.prototypeDelegation].getter($.key.constructableClass).prototype
      // },
      [$.class]: construtorProperty, // the class used to construct the instance.
    })
    Object.defineProperty(targetInstance, $.name, { writable: false, enumerable: false, value: description }) // set metadata information for debugging.
    // add debugging information.
    if (!prototype.hasOwnProperty($.metadata)) Object.defineProperty(prototype, $.metadata, { writable: false, enumerable: false, value: { type: Symbol(`${description} functionality`) } })
    return targetInstance
  },

  // initialize a prototype that belongs that is a class.
  [$.key.classInstance]({ targetInstance, construtorProperty = this, description = '' } = {}) {
    if (!targetInstance.hasOwnProperty($.metadata))
      Object.defineProperty(targetInstance, $.metadata, {
        writable: false,
        enumerable: false,
        value: { type: Symbol(`${description} - created by ${construtorProperty[$.name]} class`) },
      }) // set metadata information for debugging.
    targetInstance.constructor = construtorProperty // to preserve functionality of native JS functions integration.
    return targetInstance
  },

  [$.key.configuredClass]({ targetInstance, parameter = [] } = {}) {
    targetInstance.parameter = parameter
    return targetInstance
  },
}
