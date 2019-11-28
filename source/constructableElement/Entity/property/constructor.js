import { $ } from '../Entity.class.js'
import * as Constructable from '../../Constructable/Constructable.class.js'
import { createObjectWithDelegation } from '../../Constructable/property/instantiate.js'
import { MultipleDelegation } from '@dependency/multiplePrototypeDelegation'

function createStateInstanceWithMultipleDelegation({ delegationList = [], callerClass = this } = {}) {
  let stateDelegationSetting = callerClass::callerClass[Constructable.$.prototypeDelegation.getter]($.key.stateInstance)

  let instance = createObjectWithDelegation({ instanceType: 'object' })
  Object.setPrototypeOf(instance, stateDelegationSetting.instancePrototype) // initialize instance with entity delegation values, inherit own and delegated functionalities related to state instance from Entity class.

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

  // Example state instance constructor, used in unit tests.
  [$.key.stateInstance]({ delegationList, callerClass = this } = {}) {
    let instance = callerClass::createStateInstanceWithMultipleDelegation({ delegationList })
    return instance
  },

  // state instance: subclasses will provide an initialization implementation with key 'handleDataInstance'
  [$.key.handleDataInstance]({ data, delegationList, callerClass = this } = {}) {
    let instance = callerClass::createStateInstanceWithMultipleDelegation({ delegationList })
    callerClass::callerClass[Constructable.$.initialize.switch]($.key.handleDataInstance, { recursiveDelegationChainExecution: true })({ targetInstance: instance, data })
    return instance
  },

  // state instance: initialize target instance using concerete bahviors that extend it. Each concrete behavior taps into the construction phase of the instance, adds itself as delegation and processes the instance.
  [$.key.concereteBehavior]({ concreteBehaviorList = [], callerClass = this }) {
    // intercept constructor callback using concrete behaviors
    for (let concereteBehavior of concreteBehaviorList)
      if (concereteBehavior[$.key.concereteBehavior]) constructorCallback = concereteBehavior[$.key.concereteBehavior]({ constructorCallback, currentConcereteBehavior: concereteBehavior })

    // merge data into instance properties with multiple delegation.
    let instance = callerClass::createStateInstanceWithMultipleDelegation({ delegationList: concreteBehaviorList })
    Object.assign(targetInstance, data) // apply data to instance

    callerClass::Constructable.Class[Constructable.$.initialize.switch]($.key.concereteBehavior, { recursiveDelegationChainExecution: true })({ targetInstance, concreteBehaviorList }) // allow classes to hook over the initializaiion process.

    return instance
  },
}
