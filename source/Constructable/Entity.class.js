import { Constructable } from './Constructable.class.js'
import { mergeArrayWithObjectItem } from '../utility/mergeProperty.js'
import * as symbol from '../functionalityPrototype/Symbol.reference.js'
import { delegateToMultipleObject as multipleDelegationProxy } from '@dependency/multiplePrototypeDelegation'

export const Entity = new Constructable.clientInterface({ description: 'Entity' })
const Reference = Object.assign(Entity[Constructable.reference.reference], {
  key: {
    multipleDelegation: Symbol('Multiple delegation initialization'),
    data: Symbol('data initialization'),
    // class related
    prototype: Symbol('prototype delegation object creation for Entity instances.'),
    entityClass: Symbol('entity class related'),
    configuredClass: Symbol('Configured class related'),
    // instance related
    entityInstance: Symbol('Entity instance related'),
    instanceDelegatingToClassPrototype: Symbol('instanceDelegatingToClassPrototype'),
  },
})
const Prototype = Entity::Entity[Constructable.reference.prototypeDelegation.functionality].getter(Constructable.reference.key.constructableClass).prototype // or `Entity |> Object.getPrototypeOf`

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
      [symbol.metadata]: { type: 'Entity class prototype for `entity` prototypeDelegation chain.' },
    },
  },
})

/*
   ___           _              _   _       _       
  |_ _|_ __  ___| |_ __ _ _ __ | |_(_) __ _| |_ ___ 
   | || '_ \/ __| __/ _` | '_ \| __| |/ _` | __/ _ \
   | || | | \__ \ || (_| | | | | |_| | (_| | ||  __/
  |___|_| |_|___/\__\__,_|_| |_|\__|_|\__,_|\__\___|
*/
Prototype::Prototype[Constructable.reference.instantiate.functionality].setter({})

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
      let prototypeDelegationGetter = construtorProperty::construtorProperty[Constructable.reference.prototypeDelegation.functionality].getter
      let prototypeDelegationSetting = construtorProperty::prototypeDelegationGetter(Reference.key.entityInstance)
      prototype = prototypeDelegationSetting.prototype // Entities prototypes delegate to each other.
    }
    Object.setPrototypeOf(targetInstance, prototype) // inherit own and delegated functionalities.
  },
  [Reference.key.multipleDelegation]({ targetInstance, delegationList = [] }, previousResult /* in case multiple constructor function found and executed. */) {
    if (delegationList.length == 0) return
    delegationList.unshift(targetInstance |> Object.getPrototypeOf) // add the class prototype to the additional prototypes to delegate to.
    return multipleDelegationProxy({ targetObject: targetInstance, delegationList })
  },
  // merge data into instance properties
  [Reference.key.data]({ data = {}, targetInstance }: { data: Object } = {}) {
    Object.assign(targetInstance, data) // apply data to instance
    return targetInstance
  },

  // Example: Trying to override a symbol of a parent class in the child class properties, when called with recursive option (e.g. in Constructable.reference.construct) will execute all functions with the same key throughout the prototype chain.
  // [Constructable.reference.initialize.key.constructableClass]() {
  //   console.log(`Executed together with other Constructable.reference.initialize.key.constructableClass in the prototype chain`)
  // },

  [Reference.key.entityClass]({ targetInstance, callerClass = this } = {}) {
    let constructorSwitch = callerClass::callerClass[Constructable.reference.constructor.functionality].switch
    let entityPrototypeDelegation =
      constructorSwitch({ implementationKey: Entity.reference.key.prototype }) |> (g => g.next('intermittent') && g.next({ description: 'Entity.reference.key.entityClass' }).value)
    targetInstance::targetInstance[Constructable.reference.prototypeDelegation.functionality].setter({
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
    const initializeSwitch = callerClass[Constructable.reference.initialize.functionality].switch,
      constructorSwitch = callerClass[Constructable.reference.constructor.functionality].switch
    let entityClass = callerClass::constructorSwitch({ implementationKey: Constructable.reference.key.constructableClass }) |> (g => g.next('intermittent') && g.next({ description }).value)
    entityClass::initializeSwitch({ implementationKey: Reference.key.entityClass }) |> (g => g.next('intermittent') && g.next({ targetInstance: entityClass }).value)
    return entityClass
  },
  // merge data into instance properties
  [Reference.key.data]({ data, delegationList, callerClass = this } = {}) {
    let instantiateSwitch = callerClass[Constructable.reference.instantiate.functionality].switch,
      initializeSwitch = callerClass[Constructable.reference.initialize.functionality].switch

    // create instance
    let instance =
      callerClass::instantiateSwitch({ implementationKey: Constructable.reference.key.createObjectWithDelegation }) |> (g => g.next('intermittent') && g.next({ instanceType: 'object' }).value)

    // delegate to the Entity constructable class
    callerClass::initializeSwitch({ implementationKey: Reference.key.entityInstance, recursiveDelegationChainExecution: true })
      |> (g => {
        g.next('intermittent')
        // pass to all implemenatations the same argument
        let generator
        do {
          generator = g.next({ targetInstance: instance, construtorProperty: callerClass, delegationList })
        } while (!generator.done)
        // return generator.value
      })

    // add additional delegation prototypes
    callerClass::initializeSwitch({ implementationKey: Reference.key.multipleDelegation }) |> (g => g.next('intermittent') && g.next({ targetInstance: instance, delegationList }).value)

    // initialize instance data.
    callerClass::initializeSwitch({ implementationKey: Reference.key.data, recursiveDelegationChainExecution: true })
      |> (g => {
        g.next('intermittent')
        // pass to all implemenatations the same argument
        let generator
        do {
          generator = g.next({ targetInstance: instance, data: data })
        } while (!generator.done)
        // return generator.value
      })
    return instance
  },
  // TODO: merge this implementation with the Constructable implementation.
  [Reference.key.configuredClass]({ description = 'Configued Class', callerClass = this, parameter } = {}) {
    let instance =
      callerClass::callerClass[Constructable.reference.instantiate.functionality].switch({ implementationKey: Reference.key.createObjectWithDelegation })
      |> (g => g.next('intermittent') && g.next({ description, prototypeDelegation: callerClass }).value)
    callerClass::callerClass[Constructable.reference.initialize.functionality].switch({ implementationKey: Constructable.reference.key.classInstance })
      |> (g => g.next('intermittent') && g.next({ targetInstance: instance, description: description }).value)
    instance.parameter = parameter
    return instance
  },
  // prototype - creates a prototype that belongs to the caller class (sets constructor to class)
  [Reference.key.prototype]({ propertyObject /* The prototype initial value */, callerClass = this, description } = {}, previousResult) {
    let instance =
      callerClass::callerClass[Constructable.reference.instantiate.functionality].switch({ implementationKey: Reference.key.createObjectWithDelegation })
      |> (g => g.next('intermittent') && g.next().value)
    callerClass::callerClass[Constructable.reference.initialize.functionality].switch({ implementationKey: Constructable.reference.key.classInstance })
      |> (g => g.next('intermittent') && g.next({ targetInstance: instance, description: description }).value)
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
  [Reference.key.entityClass]() {
    const callerClass = this
    let constructorSwitch = Constructable[Constructable.reference.constructor.functionality].switch
    const proxiedTarget = new Proxy(function() {}, {
      construct(target, argumentList, proxiedTarget) {
        let instance = callerClass::constructorSwitch({ implementationKey: Reference.key.entityClass }) |> (g => g.next('intermittent') && g.next(...argumentList).value)
        return instance
      },
    })
    return proxiedTarget
  },

  // Entity instance relating to prototype chain with functionality specific to the implementer class (sub class, e.g. Graph Element)
  // create an instance using entity defined prototype and innitialization functions. Used by Entity classes to create an interface for their class.
  [Reference.key.instanceDelegatingToClassPrototype]({
    constructorImplementation = throw new Error('• Parameter `constructorImplementation` must be passed.'),
    configuredConstructableImplementation = Reference.key.configuredClass,
    clientInterfaceImplementation = Reference.key.instanceDelegatingToClassPrototype,
    // apply changes to arguments data structure.
    argumentListAdapter,
  } = {}) {
    const callerClass = this,
      clientInterfaceArguments = arguments
    let constructorSwitch = Constructable[Constructable.reference.constructor.functionality].switch,
      clientInterfaceSwitch = Constructable[Constructable.reference.clientInterface.functionality].switch
    const proxiedTarget = new Proxy(function() {}, {
      construct(target, argumentList, proxiedTarget) {
        if (argumentListAdapter) argumentListAdapter(argumentList) // restructure arguments
        if (callerClass.parameter) mergeArrayWithObjectItem({ listTarget: argumentList, listDefault: callerClass.parameter }) // in case configured constructable which holds default parameter values.
        let instance = callerClass::constructorSwitch({ implementationKey: constructorImplementation }) |> (g => g.next('intermittent') && g.next(...argumentList).value)
        return instance
      },
      apply(target, thisArg, [{ description, parameter = [] } = {}]) {
        let newConfiguredConstructable =
          callerClass::constructorSwitch({ implementationKey: configuredConstructableImplementation }) |> (g => g.next('intermittent') && g.next({ description: description, parameter }).value)
        let clientInterface =
          newConfiguredConstructable::clientInterfaceSwitch({ implementationKey: clientInterfaceImplementation })
          |> (g => g.next('intermittent') && /* Pass same arguments from previous client itnerface */ g.next(...clientInterfaceArguments).value)
        return clientInterface
      },
    })
    return proxiedTarget
  },
})

// client interface for creating sub class instance delegating to the `Entity` & `Constructable` functionality chain.
Entity.clientInterface =
  Entity::Entity[Constructable.reference.clientInterface.functionality].switch({ implementationKey: Reference.key.entityClass }) |> (g => g.next('intermittent') && g.next({}).value)
