import { mergeNonexistentProperties, mergeArrayWithObjectItem } from '../../../utility/mergeProperty.js'
import { $ } from '../Constructable.class.js'

module.exports = {
  // set the properties necessary for Constructable pattern usage.   Initialize Constructable pattern properties.
  [$.key.constructableClass]: function({ instance, label } = {}, previousInitializationResult) {
    let reference = this::this[$.prototypeDelegation.getter]($.key.constructableClass).reference
    let prototype = this::this[$.prototypeDelegation.getter]($.key.constructableClass).prototype // Constructor prototypes delegate to each other

    Object.setPrototypeOf(instance, prototype) // inherit own and delegated functionalities.
    instance[$.reference] = reference

    // create new prototype and reference for constructableClass delegation
    // set constructable prototypeDelegation properties - values which will be used in instance creation
    instance::instance[$.prototypeDelegation.setter]({
      [$.key.constructableClass]: {
        prototype: instance, // Constructor prototypes delegate to each other
        reference: instance.$,
      },
    })

    mergeNonexistentProperties(instance, {
      constructor: this, // the class used to construct the instance. - // to preserve functionality of native JS functions integration.
      [$.label]: label,

      // in usage through `instanceof` JS api: //! Doesn't work as it must return a constructor.
      // get [Symbol.species]() {
      //   return instance[$.class]
      // },
    })

    // Object.defineProperty(instance, $.metadata, { writable: false, enumerable: false, value: description }) // set metadata information for debugging.

    return instance
  },
}
