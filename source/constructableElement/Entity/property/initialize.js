import { $ } from '../Entity.class.js'
import * as Constructable from '../../Constructable/Constructable.class.js'

module.exports = {
  // creates an entity class (a Constructable with speicific Entity related properties)
  // Important: this function relies on the parent functions of the same key in the delegation chain (similar to `super` in native JS).
  [Constructable.$.key.constructableInstance]: function*({ instance } = {}, { callerClass = this } = {}) {
    // super implementation should take care of setting the constructableDelegationSetting
    let { superCallback } = function.sent
    if (superCallback) instance = callerClass::superCallback(...arguments) // call implementation higher in the hierarchy.

    let stateDelegationSetting = callerClass::callerClass[Constructable.$.prototypeDelegation.getter]($.key.stateInstance)

    // set the delegation setting for stateInstance that will be created using the new class instance (contructable)
    instance::callerClass[Constructable.$.prototypeDelegation.setter]({
      [$.key.stateInstance]: {
        instancePrototype: Object.assign(Object.create(stateDelegationSetting.instancePrototype), {
          constructor: instance, // constructor for subsequent state instances created using the newly created constructable instance - preserve native JS constructor property functionality
        }),
      },
    })

    return instance
  },

  // default implementation - prevent throwing when no implementation found in child classes
  [$.key.handleDataInstance]({ targetInstance, data }) {
    return targetInstance
  },

  // default implementation - prevent throwing when no implementation found in child classes
  [$.key.concereteBehavior]({ targetInstance, concreteBehaviorList }) {
    return targetInstance
  },
}
