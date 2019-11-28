import { $ } from '../Entity.class.js'
import * as Constructable from '../../Constructable/Constructable.class.js'
import { createObjectWithDelegation } from '../../Constructable/property/instantiate.js'

export function multipleDelegation({ delegationList, callerClass = this } = {}) {
  let instance = createObjectWithDelegation({ instanceType: 'object' })
  // delegate to the Entity constructable class
  // initialize instance with entity delegation values.
  if (!prototype) {
    let prototypeDelegationSetting = callerClass::Constructable.Class[Constructable.$.prototypeDelegation.getter]($.key.stateInstance)
    prototype = prototypeDelegationSetting.instancePrototype // Entities prototypes delegate to each other.
  }
  Object.setPrototypeOf(instance, prototype) // inherit own and delegated functionalities.
  // add additional delegation prototypes
  if (delegationList.length > 0) MultipleDelegation.addDelegation({ targetObject: instance, delegationList })
  return instance
}

// Example: Trying to override a symbol of a parent class in the child class properties, when called with recursive option (e.g. in Constructable.$.construct) will execute all functions with the same key throughout the prototype chain.
// export [Constructable.$.initialize.key.constructableInstance]() {
//   console.log(`Executed together with other Constructable.$.initialize.key.constructableInstance in the prototype chain`)
// }
module.exports = {
  // [$.key.constructableInstance] - when called it is inherited from parent functionality.

  // initialize target instance using concerete bahviors that extend it. Each concrete behavior taps into the construction phase of the instance, adds itself as delegation and processes the instance.
  [$.key.concereteBehavior]({
    concreteBehaviorList = [],
    constructorImplementation = $.key.mergeDataToInstance,
    // example interception callback
    callerClass = this,
  }) {
    // intercept constructor callback using concrete behaviors
    for (let concereteBehavior of concreteBehaviorList)
      if (concereteBehavior[$.key.concereteBehavior]) constructorCallback = concereteBehavior[$.key.concereteBehavior]({ constructorCallback, currentConcereteBehavior: concereteBehavior })
    // merge data into instance properties with multiple delegation.
    let instance = callerClass::multipleDelegation({ delegationList: concreteBehaviorList })
    Object.assign(targetInstance, data) // apply data to instance

    callerClass::Constructable.Class[Constructable.$.initialize.switch]($.key.concereteBehavior, { recursiveDelegationChainExecution: true })({ targetInstance, concreteBehaviorList }) // allow classes to hook over the initializaiion process.
    return instance
  },

  // subclasses will provide an initialization implementation with key 'handleDataInstance'
  [$.key.handleDataInstance]({ data, delegationList, callerClass = this } = {}) {
    let instance = callerClass::multipleDelegation({ delegationList })
    // initialize instance data.
    callerClass::Constructable.Class[Constructable.$.initialize.switch]($.key.handleDataInstance, { recursiveDelegationChainExecution: true })({
      targetInstance: instance,
      data: data,
    })
    return instance
  },

}
