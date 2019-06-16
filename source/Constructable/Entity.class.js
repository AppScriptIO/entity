import { Constructable } from './Constructable.class.js'
import { mergeArrayWithObjectItem } from '../utility/mergeProperty.js'
import * as symbol from '../functionalityPrototype/Symbol.reference.js'
import { MultipleDelegation } from '@dependency/multiplePrototypeDelegation'
// shorter forms for switch functions
const instantiateSwitch = Constructable[Constructable.reference.instantiate.functionality].switch,
  initializeSwitch = Constructable[Constructable.reference.initialize.functionality].switch,
  constructorSwitch = Constructable[Constructable.reference.constructor.functionality].switch,
  clientInterfaceSwitch = Constructable[Constructable.reference.clientInterface.functionality].switch

export const { class: Entity, reference: Reference, constructablePrototype: Prototype } = new Constructable.clientInterface({ description: 'Entity' })
Object.assign(Reference, {
  key: {
    multipleDelegation: Symbol('Multiple delegation'),
    concereteBehavior: Symbol('Concerete Behavior / Implementation'), // concerete behaviors are instance implementations (holding a specific algorithm) that extend the target instance through delegation, and initialize the target instance with their own logic
    mergeDataToInstance: Symbol('mergeDataToInstance'),
    handleDataInstance: Symbol('handleDataInstance'),
    entityClass: Symbol('entity class related'),
    prototypeForInstance: Symbol('prototype delegation object creation for Entity instances.'),
    entityInstance: Symbol('Entity instance related'),
    instanceDelegatingToEntityInstancePrototype: Symbol('instanceDelegatingToEntityInstancePrototype'),
  },
})

/*
                   _        _                    ____       _                  _   _             
   _ __  _ __ ___ | |_ ___ | |_ _   _ _ __   ___|  _ \  ___| | ___  __ _  __ _| |_(_) ___  _ __  
  | '_ \| '__/ _ \| __/ _ \| __| | | | '_ \ / _ \ | | |/ _ \ |/ _ \/ _` |/ _` | __| |/ _ \| '_ \ 
  | |_) | | | (_) | || (_) | |_| |_| | |_) |  __/ |_| |  __/ |  __/ (_| | (_| | |_| | (_) | | | |
  | .__/|_|  \___/ \__\___/ \__|\__, | .__/ \___|____/ \___|_|\___|\__, |\__,_|\__|_|\___/|_| |_|
  |_|                           |___/|_|                           |___/                         
*/
Prototype::Prototype[Constructable.reference.prototypeDelegation.functionality].setter({
  // for direct objects created from Entity immediately
  [Reference.key.entityInstance]: {
    prototype: {
      // type Object, usually contains `prototype` protperty
      [symbol.metadata]: { type: 'Prototype of Entity pattern - on toplevel Entity constructable.' },
    },
  },
})

/*
    ___       _ _   _       _ _         
  |_ _|_ __ (_) |_(_) __ _| (_)_______ 
    | || '_ \| | __| |/ _` | | |_  / _ \
    | || | | | | |_| | (_| | | |/ /  __/
  |___|_| |_|_|\__|_|\__,_|_|_/___\___|
*/
Prototype::Prototype[Constructable.reference.initialize.functionality].setter({
  // initialize instance with entity delegation values.
  [Reference.key.entityInstance]({ targetInstance, prototype, construtorProperty }, previousResult /* in case multiple constructor function found and executed. */) {
    if (!prototype) {
      let prototypeDelegationSetting = construtorProperty::Constructable[Constructable.reference.prototypeDelegation.functionality].getter(Reference.key.entityInstance)
      prototype = prototypeDelegationSetting.prototype // Entities prototypes delegate to each other.
    }
    Object.setPrototypeOf(targetInstance, prototype) // inherit own and delegated functionalities.
  },
  [Reference.key.multipleDelegation]({ targetInstance, delegationList = [] }, previousResult /* in case multiple constructor function found and executed. */) {
    if (delegationList.length == 0) return
    MultipleDelegation.addDelegation({ targetObject: targetInstance, delegationList })
  },
  // merge data into instance properties
  [Reference.key.mergeDataToInstance]({ data = {}, targetInstance }: { data: Object } = {}) {
    Object.assign(targetInstance, data) // apply data to instance
    return targetInstance
  },

  // Example: Trying to override a symbol of a parent class in the child class properties, when called with recursive option (e.g. in Constructable.reference.construct) will execute all functions with the same key throughout the prototype chain.
  // [Constructable.reference.initialize.key.constructableClass]() {
  //   console.log(`Executed together with other Constructable.reference.initialize.key.constructableClass in the prototype chain`)
  // },

  [Reference.key.entityClass]({ targetInstance, callerClass = this } = {}) {
    let constructorSwitch = Constructable[Constructable.reference.constructor.functionality].switch
    let entityPrototypeDelegation = callerClass::constructorSwitch({ implementationKey: Entity.reference.key.prototypeForInstance })({ description: 'Prototype for entity instances' })
    // set prototypeDelegation on the target class's Constructable Prototype, because it is used for subclasses entityPrototype delegation.
    let targetConstructablePrototype = targetInstance::Constructable[Constructable.reference.prototypeDelegation.functionality].getter(Constructable.reference.key.constructableClass).prototype
    targetConstructablePrototype::Constructable[Constructable.reference.prototypeDelegation.functionality].setter({
      [Entity.reference.key.entityInstance]: {
        prototype: entityPrototypeDelegation,
      },
    })
    return targetInstance
  },
})

/*
    ____                _                   _             
   / ___|___  _ __  ___| |_ _ __ _   _  ___| |_ ___  _ __ 
  | |   / _ \| '_ \/ __| __| '__| | | |/ __| __/ _ \| '__|
  | |__| (_) | | | \__ \ |_| |  | |_| | (__| || (_) | |   
   \____\___/|_| |_|___/\__|_|   \__,_|\___|\__\___/|_|   
*/
Prototype::Prototype[Constructable.reference.constructor.functionality].setter({
  // creates an entity class (a Constructable with speicific Entity related properties)
  [Reference.key.entityClass]({ description, callerClass = this } = {}) {
    let entityClass = callerClass::constructorSwitch({ implementationKey: Constructable.reference.key.constructableClass })({ description })
    entityClass::initializeSwitch({ implementationKey: Reference.key.entityClass })({ targetInstance: entityClass })
    return entityClass
  },
  [Reference.key.multipleDelegation]({ delegationList, callerClass = this } = {}) {
    // create instance
    let instance = callerClass::instantiateSwitch({ implementationKey: Constructable.reference.key.createObjectWithDelegation })({ instanceType: 'object' })

    // delegate to the Entity constructable class
    callerClass::initializeSwitch({ implementationKey: Reference.key.entityInstance, recursiveDelegationChainExecution: true })({ targetInstance: instance, construtorProperty: callerClass })

    // add additional delegation prototypes
    callerClass::initializeSwitch({ implementationKey: Reference.key.multipleDelegation })({ targetInstance: instance, delegationList })

    return instance
  },
  // initialize target instance using concerete bahviors that extend it. Each concrete behavior taps into the construction phase of the instance, adds itself as delegation and processes the instance.
  [Reference.key.concereteBehavior]({
    concreteBehaviorList = [],
    constructorImplementation = Reference.key.mergeDataToInstance,
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
      let instance = callerClass::constructorSwitch({ implementationKey: constructorImplementation })(...args)
      args[0].targetInstance = instance
      callerClass::initializeSwitch({ implementationKey: Reference.key.concereteBehavior, recursiveDelegationChainExecution: true })(...args) // allow classes to hook over the initializaiion process.
      return instance
    }
    // intercept constructor callback using concrete behaviors
    for (let concereteBehavior of concreteBehaviorList) {
      if (concereteBehavior[Reference.key.concereteBehavior])
        constructorCallback = concereteBehavior[Reference.key.concereteBehavior]({ constructorCallback, currentConcereteBehavior: concereteBehavior })
    }
    // intercept using intercept callback parameter
    if (interceptCallback) constructorCallback = interceptCallback(constructorCallback)
    return constructorCallback(...arguments)
  },
  // merge data into instance properties with multiple delegation.
  [Reference.key.mergeDataToInstance]({ data, delegationList, callerClass = this } = {}) {
    let instance = callerClass::constructorSwitch({ implementationKey: Reference.key.multipleDelegation })({ delegationList })
    // initialize instance data.
    callerClass::initializeSwitch({ implementationKey: Reference.key.mergeDataToInstance, recursiveDelegationChainExecution: true })({ targetInstance: instance, data: data })
    return instance
  },
  // subclasses will provide an initialization implementation with key 'handleDataInstance'
  [Reference.key.handleDataInstance]({ data, delegationList, callerClass = this } = {}) {
    let instance = callerClass::constructorSwitch({ implementationKey: Reference.key.multipleDelegation })({ delegationList })
    // initialize instance data.
    callerClass::initializeSwitch({ implementationKey: Reference.key.handleDataInstance, recursiveDelegationChainExecution: true })({ targetInstance: instance, data: data })
    return instance
  },
  // prototype - creates a prototype that belongs to the caller class (sets constructor to class)
  [Reference.key.prototypeForInstance]({ propertyObject /* The prototype initial value */, callerClass = this, description } = {}, previousResult) {
    // get the parent entity pattern related prototype.
    let parentEntityPrototypeDelegation = callerClass::Constructable[Constructable.reference.prototypeDelegation.functionality].getter(Reference.key.entityInstance).prototype || null
    let instance = callerClass::instantiateSwitch({ implementationKey: Constructable.reference.key.createObjectWithDelegation })({ description, prototypeDelegation: parentEntityPrototypeDelegation })
    callerClass::initializeSwitch({ implementationKey: Constructable.reference.key.classInstance })({ targetInstance: instance, description: description })
    if (propertyObject) Object.assign(instance, propertyObject)
    return instance
  },
})

/*
    ____ _ _            _   ___       _             __                
   / ___| (_) ___ _ __ | |_|_ _|_ __ | |_ ___ _ __ / _| __ _  ___ ___ 
  | |   | | |/ _ \ '_ \| __|| || '_ \| __/ _ \ '__| |_ / _` |/ __/ _ \
  | |___| | |  __/ | | | |_ | || | | | ||  __/ |  |  _| (_| | (_|  __/
   \____|_|_|\___|_| |_|\__|___|_| |_|\__\___|_|  |_|  \__,_|\___\___|
*/
Prototype::Prototype[Constructable.reference.clientInterface.functionality].setter({
  // create an entity class that has follows that Entity pattern to create instances with custom prototype chains.
  [Reference.key.entityClass]({ callerClass = this }) {
    let clientInterface = callerClass::clientInterfaceSwitch({ implementationKey: Constructable.reference.key.constructableClass })({
      constructorImplementation: Reference.key.entityClass,
      returnedInstanceAdapter: instance => ({
        class: instance,
        reference: instance[Constructable.reference.reference],
        constructablePrototype: instance::Constructable[Constructable.reference.prototypeDelegation.functionality].getter(Constructable.reference.key.constructableClass).prototype,
        entityPrototype: instance::Constructable[Constructable.reference.prototypeDelegation.functionality].getter(Reference.key.entityInstance).prototype,
      }),
    })
    return clientInterface
  },
  // Entity instance relating to prototype chain with functionality specific to the implementer class (sub class, e.g. Graph Element)
  // create an instance using entity defined prototype and innitialization functions. Used by Entity classes to create an interface for their class.
  [Reference.key.instanceDelegatingToEntityInstancePrototype]({
    constructorImplementation,
    // intercept client interface to allow external manipulation of its behavior.
    clientInterfaceInterceptCallback = clientInterfaceTarget => callerClass::clientInterfaceSwitch({ implementationKey: 'argumentsAdapterOnConstruction' })({ clientInterfaceTarget }), // 'false' for preventing this feature from executing or using the default value.
    clientInterfaceCallbackList = [],
    callerClass = this,
  } = {}) {
    if (!constructorImplementation) throw new Error('• Parameter `constructorImplementation` must be passed.')
    if (clientInterfaceInterceptCallback) clientInterfaceCallbackList.push(clientInterfaceInterceptCallback)

    let createClientInterface = (initialProxyTarget = function() {}) => {
      let constructCallback = argumentList => callerClass::constructorSwitch({ implementationKey: constructorImplementation })(...argumentList)
      return new Proxy(initialProxyTarget, {
        construct(target, argumentList, proxiedTarget) {
          if (callerClass.parameter) mergeArrayWithObjectItem({ listTarget: argumentList, listDefault: callerClass.parameter }) // in case configured constructable which holds default parameter values.
          return constructCallback(argumentList)
        },
        apply(target, thisArg, [{ description, parameter = [], clientInterfaceInterceptCallback = false /* prevent default value assignment */ } = {}]) {
          let newConfiguredConstructable = callerClass::constructorSwitch({ implementationKey: Constructable.reference.key.configuredClass })({ description, parameter })
          // Pass same arguments from previous client itnerface
          return newConfiguredConstructable::clientInterfaceSwitch({ implementationKey: Reference.key.instanceDelegatingToEntityInstancePrototype })({
            constructorImplementation,
            clientInterfaceInterceptCallback,
            clientInterfaceCallbackList,
          })
        },
      })
    }

    let clientInterfaceTarget = createClientInterface()
    clientInterfaceTarget = clientInterfaceCallbackList.reduce((accumulator, callback) => callback(accumulator), clientInterfaceTarget)
    return clientInterfaceTarget
  },
  // Restructure arguments when constructed, this function is used by creating a proxy around the client interface proxy.
  argumentsAdapterOnConstruction({
    clientInterfaceTarget,
    argumentListAdapter = argumentList => (argumentList[0] = { data: argumentList[0] }), // Restructure argument list
  }) {
    return new Proxy(clientInterfaceTarget, {
      construct(target, argumentList, proxiedTarget) {
        argumentListAdapter(argumentList)
        return Reflect.construct(target, argumentList, proxiedTarget)
      },
    })
  },
})

// client interface for creating sub class instance delegating to the `Entity` & `Constructable` functionality chain.
Entity.clientInterface = Entity::clientInterfaceSwitch({ implementationKey: Reference.key.entityClass })({})
