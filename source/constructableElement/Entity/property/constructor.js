import { $ } from '../Entity.class.js'
import * as Constructable from '../../Constructable/Constructable.class.js'
import { createObjectWithDelegation } from '../../Constructable/property/instantiate.js'
import { MultipleDelegation } from '@dependency/handlePrototypeDelegation'

function createStateInstanceWithMultipleDelegation({ delegationList = [] } = {}) {
  const callerClass = this
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
  [$.key.stateInstance]({ callerClass = this } = {}, { delegationList } = {}) {
    let instance = callerClass::createStateInstanceWithMultipleDelegation({ delegationList })
    return instance
  },

  // state instance: subclasses will provide an initialization implementation with key 'handleDataInstance'
  [$.key.handleDataInstance]({ callerClass = this } = {}, ...args) {
    let instance = callerClass::createStateInstanceWithMultipleDelegation()
    // allows the subclasses to add additional initialization steps to deal with the data parameter provided.
    callerClass::callerClass[Constructable.$.initialize.switch]($.key.handleDataInstance, { recursiveDelegationChainExecution: true })({ targetInstance: instance }, ...args)
    return instance
  },

  /* state instance: initialize target instance using concerete bahviors that extend it. Each concrete behavior taps into the construction phase of the instance, adds itself as delegation and processes the instance.
    The name `concreteBehavior` comes from the pattern used for multiple behaviors/delegation on objects.
    concreteBehavior = state instance that has `Entity.$.key.concereteBehavior` in it's chain, to be executed during the initialization phase of another instance that uses it.
  */
  [$.key.concereteBehavior]({ callerClass = this } = {}, { delegationList, concreteBehaviorList = [] }) {
    // merge data into instance properties with multiple delegation.
    let instance = callerClass::createStateInstanceWithMultipleDelegation({ delegationList })

    // related to class implementation (different than the state instance attached implmenetation below)
    callerClass::callerClass[Constructable.$.initialize.switch]($.key.concereteBehavior, { recursiveDelegationChainExecution: true })({ targetInstance: instance }, { concreteBehaviorList }) // allow classes to hook over the initializaiion process.

    /**  initialize instance using concrete behaviors instance themselves - i.e. prototypes to add must have a concereteBehavior implementation registered on them.
     * Each concerete behavior must implement an initialization function registered in it's protype chain: 
     * In this example they will add themselves to the delegation chain of the instance:
         [Entity.$.key.concereteBehavior]({ targetInstance, concereteBehavior }) {
            MultipleDelegation.addDelegation({ targetObject: targetInstance, delegationList: [concereteBehavior] })
            return targetInstance
          }
       */
    for (let concereteBehavior of concreteBehaviorList) {
      if (concereteBehavior[$.key.concereteBehavior]) concereteBehavior[$.key.concereteBehavior]({ targetInstance: instance }, { concereteBehavior })
    }

    return instance
  },
}
