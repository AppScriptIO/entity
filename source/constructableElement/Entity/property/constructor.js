import { $ } from '../Entity.class.js'
import * as Constructable from '../../Constructable/Constructable.class.js'

module.exports = {
  // creates an entity class (a Constructable with speicific Entity related properties)
  [$.key.entityClass]({ description, callerClass = this } = {}) {
    let entityClass = callerClass::Constructable.Class[Constructable.$.constructor.switch](Constructable.$.key.constructableClass)({ description })
    entityClass::Constructable.Class[Constructable.$.initialize.switch]($.key.entityClass)({ targetInstance: entityClass })
    return entityClass
  },

  [$.key.multipleDelegation]({ delegationList, callerClass = this } = {}) {
    // create instance
    let instance = callerClass::Constructable.Class[Constructable.$.instantiate.switch](Constructable.$.key.createObjectWithDelegation)({ instanceType: 'object' })

    // delegate to the Entity constructable class
    callerClass::Constructable.Class[Constructable.$.initialize.switch]($.key.entityInstance, { recursiveDelegationChainExecution: true })({
      targetInstance: instance,
      construtorProperty: callerClass,
    })

    // add additional delegation prototypes
    callerClass::Constructable.Class[Constructable.$.initialize.switch]($.key.multipleDelegation)({ targetInstance: instance, delegationList })

    return instance
  },

  // initialize target instance using concerete bahviors that extend it. Each concrete behavior taps into the construction phase of the instance, adds itself as delegation and processes the instance.
  [$.key.concereteBehavior]({
    concreteBehaviorList = [],
    constructorImplementation = $.key.mergeDataToInstance,
    constructorCallback,
    // Additional interception function
    interceptCallback = false ||
      // example interception callback
      (constructorCallback =>
        new Proxy(constructorCallback, {
          apply(target, thisArg, argumentList) {
            return Reflect.apply(...arguments)
          },
        })),
    callerClass = this,
  }) {
    constructorCallback ||= (...args) => {
      let instance = callerClass::Constructable.Class[Constructable.$.constructor.switch](constructorImplementation)(...args)
      args[0].targetInstance = instance
      callerClass::Constructable.Class[Constructable.$.initialize.switch]($.key.concereteBehavior, { recursiveDelegationChainExecution: true })(...args) // allow classes to hook over the initializaiion process.
      return instance
    }
    // intercept constructor callback using concrete behaviors
    for (let concereteBehavior of concreteBehaviorList) {
      if (concereteBehavior[$.key.concereteBehavior]) constructorCallback = concereteBehavior[$.key.concereteBehavior]({ constructorCallback, currentConcereteBehavior: concereteBehavior })
    }
    // intercept using intercept callback parameter
    if (interceptCallback) constructorCallback = interceptCallback(constructorCallback)
    return constructorCallback(...arguments)
  },

  // merge data into instance properties with multiple delegation.
  [$.key.mergeDataToInstance]({ data, delegationList, callerClass = this } = {}) {
    let instance = callerClass::Constructable.Class[Constructable.$.constructor.switch]($.key.multipleDelegation)({ delegationList })
    // initialize instance data.
    callerClass::Constructable.Class[Constructable.$.initialize.switch]($.key.mergeDataToInstance, { recursiveDelegationChainExecution: true })({
      targetInstance: instance,
      data: data,
    })
    return instance
  },

  // subclasses will provide an initialization implementation with key 'handleDataInstance'
  [$.key.handleDataInstance]({ data, delegationList, callerClass = this } = {}) {
    let instance = callerClass::Constructable.Class[Constructable.$.constructor.switch]($.key.multipleDelegation)({ delegationList })
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
    let instance = callerClass::Constructable.Class[Constructable.$.instantiate.switch](Constructable.$.key.createObjectWithDelegation)({
      description,
      prototypeDelegation: parentEntityPrototypeDelegation,
    })
    callerClass::Constructable.Class[Constructable.$.initialize.switch](Constructable.$.key.classInstance)({ targetInstance: instance, description: description })
    if (propertyObject) Object.assign(instance, propertyObject)
    return instance
  },
}
