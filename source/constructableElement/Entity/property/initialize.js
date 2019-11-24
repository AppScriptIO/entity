import { $ } from '../Entity.class.js'
import * as Constructable from '../../Constructable/Constructable.class.js'
import { MultipleDelegation } from '@dependency/multiplePrototypeDelegation'

module.exports = {
  // initialize instance with entity delegation values.
  [$.key.entityInstance]: function({ targetInstance, prototype, construtorProperty }, previousResult /* in case multiple constructor function found and executed. */) {
    if (!prototype) {
      let prototypeDelegationSetting = construtorProperty::Constructable.Class[Constructable.$.prototypeDelegation.getter]($.key.entityInstance)
      prototype = prototypeDelegationSetting.prototype // Entities prototypes delegate to each other.
    }
    Object.setPrototypeOf(targetInstance, prototype) // inherit own and delegated functionalities.
  },

  [$.key.multipleDelegation]: function({ targetInstance, delegationList = [] }, previousResult /* in case multiple constructor function found and executed. */) {
    if (delegationList.length == 0) return
    MultipleDelegation.addDelegation({ targetObject: targetInstance, delegationList })
  },

  // merge data into instance properties
  [$.key.mergeDataToInstance]: function({ data = {}, targetInstance }: { data: Object } = {}) {
    Object.assign(targetInstance, data) // apply data to instance
    return targetInstance
  },

  // Example: Trying to override a symbol of a parent class in the child class properties, when called with recursive option (e.g. in Constructable.$.construct) will execute all functions with the same key throughout the prototype chain.
  // export [Constructable.$.initialize.key.constructableClass]() {
  //   console.log(`Executed together with other Constructable.$.initialize.key.constructableClass in the prototype chain`)
  // }

  [$.key.entityClass]: function({ targetInstance, callerClass = this } = {}) {
    let entityPrototypeDelegation = callerClass::Constructable.Class[Constructable.$.constructor.switch]($.key.prototypeForInstance)({ description: 'Prototype for entity instances' })
    // set prototypeDelegation on the target class's Constructable Prototype, because it is used for subclasses entityPrototype delegation.
    let targetConstructablePrototype = targetInstance::Constructable.Class[Constructable.$.prototypeDelegation.getter](Constructable.$.key.constructableClass).prototype
    targetConstructablePrototype::Constructable.Class[Constructable.$.prototypeDelegation.setter]({
      [$.key.entityInstance]: {
        prototype: entityPrototypeDelegation,
      },
    })
    return targetInstance
  },
}
