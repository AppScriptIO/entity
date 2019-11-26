import { $ } from '../Entity.class.js'
import * as Constructable from '../../Constructable/Constructable.class.js'

export function multipleDelegation({ delegationList, callerClass = this } = {}) {
  let instance = callerClass::Constructable.Class[Constructable.$.instantiate.switch]('createObjectWithDelegation')({ instanceType: 'object' })
  // delegate to the Entity constructable class
  callerClass::Constructable.Class[Constructable.$.initialize.switch]($.key.entityInstance, { recursiveDelegationChainExecution: true })({
    targetInstance: instance,
    construtorProperty: callerClass,
  })
  // add additional delegation prototypes
  if (delegationList.length > 0) MultipleDelegation.addDelegation({ targetObject: instance, delegationList })
  return instance
}

module.exports = {
  // creates an entity class (a Constructable with speicific Entity related properties)
  [$.key.entityClass]({ description, callerClass = this } = {}) {
    let entityClass = callerClass::Constructable.Class[Constructable.$.constructor.switch](Constructable.$.key.constructableClass)({ description })
    entityClass::Constructable.Class[Constructable.$.initialize.switch]($.key.entityClass)({ targetInstance: entityClass })
    return entityClass
  },

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

  // prototype - creates a prototype that belongs to the caller class (sets constructor to class)
  [$.key.prototypeForInstance]({ propertyObject /* The prototype initial value */, callerClass = this, description } = {}, previousResult) {
    // get the parent entity pattern related prototype.
    let parentEntityPrototypeDelegation = callerClass::Constructable.Class[Constructable.$.prototypeDelegation.getter]($.key.entityInstance).prototype || null
    let instance = callerClass::Constructable.Class[Constructable.$.instantiate.switch]('createObjectWithDelegation')({ description, prototype: parentEntityPrototypeDelegation })
    callerClass::Constructable.Class[Constructable.$.initialize.switch](Constructable.$.key.classInstance)({ targetInstance: instance, description: description })
    if (propertyObject) Object.assign(instance, propertyObject)
    return instance
  },
}
