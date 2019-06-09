import { Constructable } from './Constructable.class.js'
import { mergeArrayWithObjectItem } from '../utility/mergeProperty.js'
import * as symbol from '../functionalityPrototype/Symbol.reference.js'
import { delegateToMultipleObject as multipleDelegationProxy } from '@dependency/multiplePrototypeDelegation'
// shorter forms for switch functions
const instantiateSwitch = Constructable[Constructable.reference.instantiate.functionality].switch,
  initializeSwitch = Constructable[Constructable.reference.initialize.functionality].switch,
  constructorSwitch = Constructable[Constructable.reference.constructor.functionality].switch,
  clientInterfaceSwitch = Constructable[Constructable.reference.clientInterface.functionality].switch

export const { class: Entity, reference: Reference, constructablePrototype: Prototype } = new Constructable.clientInterface({ description: 'Entity' })
Object.assign(Reference, {
  key: {
    multipleDelegation: Symbol('Multiple delegation'),
    mergeDataToInstance: Symbol('mergeDataToInstance'),
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
      let prototypeDelegationSetting = construtorProperty::Constructable[Constructable.reference.prototypeDelegation.functionality].getter(Reference.key.entityInstance)
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
  [Reference.key.mergeDataToInstance]({ data = {}, targetInstance }: { data: Object } = {}) {
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
      constructorSwitch({ implementationKey: Entity.reference.key.prototypeForInstance }) |> (g => g.next('intermittent') && g.next({ description: 'Prototype for entity instances' }).value)
    targetInstance::Constructable[Constructable.reference.prototypeDelegation.functionality].setter({
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
    let entityClass = callerClass::constructorSwitch({ implementationKey: Constructable.reference.key.constructableClass }) |> (g => g.next('intermittent') && g.next({ description }).value)
    entityClass::initializeSwitch({ implementationKey: Reference.key.entityClass }) |> (g => g.next('intermittent') && g.next({ targetInstance: entityClass }).value)
    return entityClass
  },
  [Reference.key.multipleDelegation]({ delegationList, callerClass = this } = {}) {
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
          generator = g.next({ targetInstance: instance, construtorProperty: callerClass })
        } while (!generator.done)
        // return generator.value
      })

    // add additional delegation prototypes
    callerClass::initializeSwitch({ implementationKey: Reference.key.multipleDelegation }) |> (g => g.next('intermittent') && g.next({ targetInstance: instance, delegationList }).value)

    return instance
  },
  // merge data into instance properties with multiple delegation.
  [Reference.key.mergeDataToInstance]({ data, delegationList, callerClass = this } = {}) {
    let instance = callerClass::constructorSwitch({ implementationKey: Entity.reference.key.multipleDelegation }) |> (g => g.next('intermittent') && g.next({ delegationList }).value)
    // initialize instance data.
    callerClass::initializeSwitch({ implementationKey: Reference.key.mergeDataToInstance, recursiveDelegationChainExecution: true })
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
  // prototype - creates a prototype that belongs to the caller class (sets constructor to class)
  [Reference.key.prototypeForInstance]({ propertyObject /* The prototype initial value */, callerClass = this, description } = {}, previousResult) {
    // get the parent entity pattern related prototype.
    let parentEntityPrototypeDelegation = callerClass::Constructable[Constructable.reference.prototypeDelegation.functionality].getter(Reference.key.entityInstance) || null
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
    let clientInterface =
      callerClass::clientInterfaceSwitch({ implementationKey: Constructable.reference.key.constructableClass })
      |> (g =>
        g.next('intermittent') &&
        g.next({
          constructorImplementation: Reference.key.entityClass,
          returnedInstanceAdapter: instance => ({
            class: instance,
            reference: instance[Constructable.reference.reference],
            constructablePrototype: instance::Constructable[Constructable.reference.prototypeDelegation.functionality].getter(Constructable.reference.key.constructableClass).prototype,
            entityPrototype: instance::Constructable[Constructable.reference.prototypeDelegation.functionality].getter(Reference.key.entityInstance).prototype,
          }),
        }).value)
    return clientInterface
  },
  // Entity instance relating to prototype chain with functionality specific to the implementer class (sub class, e.g. Graph Element)
  // create an instance using entity defined prototype and innitialization functions. Used by Entity classes to create an interface for their class.
  [Reference.key.instanceDelegatingToEntityInstancePrototype]({
    constructorImplementation = throw new Error('• Parameter `constructorImplementation` must be passed.'),
    argumentListAdapter, // apply changes to arguments data structure.
  } = {}) {
    const callerClass = this,
      clientInterfaceArguments = arguments

    const proxiedTarget = new Proxy(function() {}, {
      construct(target, argumentList, proxiedTarget) {
        if (argumentListAdapter) argumentListAdapter(argumentList) // restructure arguments
        if (callerClass.parameter) mergeArrayWithObjectItem({ listTarget: argumentList, listDefault: callerClass.parameter }) // in case configured constructable which holds default parameter values.
        let instance = callerClass::constructorSwitch({ implementationKey: constructorImplementation }) |> (g => g.next('intermittent') && g.next(...argumentList).value)
        return instance
      },
      apply(target, thisArg, [{ description, parameter = [] } = {}]) {
        let newConfiguredConstructable =
          callerClass::constructorSwitch({ implementationKey: Constructable.reference.key.configuredClass }) |> (g => g.next('intermittent') && g.next({ description: description, parameter }).value)
        let clientInterface =
          newConfiguredConstructable::clientInterfaceSwitch({ implementationKey: Reference.key.instanceDelegatingToEntityInstancePrototype })
          |> (g => g.next('intermittent') && /* Pass same arguments from previous client itnerface */ g.next(...clientInterfaceArguments).value)
        return clientInterface
      },
    })
    return proxiedTarget
  },
  [Reference.key.mergeDataToInstance]({ callerClass = this } = {}) {
    let g = callerClass::Prototype[Constructable.reference.clientInterface.functionality].switch({ implementationKey: Reference.key.instanceDelegatingToEntityInstancePrototype })
    return (
      g.next('intermittent') &&
      g.next({
        constructorImplementation: Reference.key.mergeDataToInstance,
        argumentListAdapter: argumentList => {
          argumentList[0] = { data: argumentList[0] }
          return argumentList
        },
      }).value
    )
  },
})

// client interface for creating sub class instance delegating to the `Entity` & `Constructable` functionality chain.
Entity.clientInterface = Entity::clientInterfaceSwitch({ implementationKey: Reference.key.entityClass }) |> (g => g.next('intermittent') && g.next({}).value)
