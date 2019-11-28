import { $ } from '../Entity.class.js'
import * as Constructable from '../../Constructable/Constructable.class.js'

module.exports = {
  // creates an entity class (a Constructable with speicific Entity related properties)
  // Important: this function relies on the parent functions of the same key in the delegation chain (similar to `super` in native JS).
  [Constructable.$.key.constructableInstance]: function*({ instance, callerClass = this } = {}) {
    // super implementation should take care of setting the constructableDelegationSetting
    let { superCallback } = function.sent
    if (superCallback) instance = callerClass::superCallback(...arguments) // call implementation higher in the hierarchy.

    let constructableDelegationSetting = callerClass::callerClass[Constructable.$.prototypeDelegation.getter](Constructable.$.key.constructableInstance),
      stateDelegationSetting = callerClass::callerClass[Constructable.$.prototypeDelegation.getter]($.key.stateInstance)

    // set the delegation setting for stateInstance that will be created using the new class instance (contructable)
    constructableDelegationSetting.instancePrototype::callerClass[Constructable.$.prototypeDelegation.setter]({
      [$.key.stateInstance]: {
        instancePrototype: Object.create(stateDelegationSetting.instancePrototype),
      },
    })

    return instance
  },
}
