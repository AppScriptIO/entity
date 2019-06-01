import { Constructable } from './Constructable.class.js'
import { mergeArrayWithObjectItem } from '../utility/mergeProperty.js'
import * as symbol from '../functionalityPrototype/Symbol.reference.js'
import { delegateToMultipleObject as multipleDelegationProxy } from '@dependency/multiplePrototypeDelegation'
export const Entity = new Constructable.clientInterface({ description: 'Entity' })

const Reference = Entity[Constructable.reference.reference]
const Prototype = Entity[Constructable.reference.prototype]

/*
                   _        _                    ____       _                  _   _             
   _ __  _ __ ___ | |_ ___ | |_ _   _ _ __   ___|  _ \  ___| | ___  __ _  __ _| |_(_) ___  _ __  
  | '_ \| '__/ _ \| __/ _ \| __| | | | '_ \ / _ \ | | |/ _ \ |/ _ \/ _` |/ _` | __| |/ _ \| '_ \ 
  | |_) | | | (_) | || (_) | |_| |_| | |_) |  __/ |_| |  __/ |  __/ (_| | (_| | |_| | (_) | | | |
  | .__/|_|  \___/ \__\___/ \__|\__, | .__/ \___|____/ \___|_|\___|\__, |\__,_|\__|_|\___/|_| |_|
  |_|                           |___/|_|                           |___/                         
*/
Reference.prototypeDelegation = {
  key: {
    entity: Symbol('Funtionality:prototypeDelegation.key.entity'), // type Object, usually contains `prototype` protperty
  },
}
Prototype[Constructable.reference.prototypeDelegation.setter.list]({
  // for direct objects created from Entity immediately
  [Reference.prototypeDelegation.key.entity]: {
    prototype: {
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
Prototype[Constructable.reference.instantiate.setter.list]({})

/*
    ___       _ _   _       _ _         
  |_ _|_ __ (_) |_(_) __ _| (_)_______ 
    | || '_ \| | __| |/ _` | | |_  / _ \
    | || | | | | |_| | (_| | | |/ /  __/
  |___|_| |_|_|\__|_|\__,_|_|_/___\___|
*/
Reference.initialize = {
  key: {
    entityClass: Symbol('Funtionality:initialize.key.entityClass'),
    // initialize instance with entity delegation values.
    entity: Symbol('Funtionality:initialize.key.entity'),
    // merge data into instance properties
    data: Symbol('Funtionality:initialize.key.data'),
    multipleDelegation: Symbol('Funtionality:initialize.key.multipleDelegation'),
    // initialize a prototype that belongs to an entity class.
    classInstance: Symbol('Funtionality:initialize.key.classInstance'),
  },
}
Prototype[Constructable.reference.initialize.setter.list]({
  [Reference.initialize.key.entity]({ targetInstance, prototype, construtorProperty }, previousResult /* in case multiple constructor function found and executed. */) {
    if (!prototype) {
      let prototypeDelegationGetter = construtorProperty[Constructable.reference.prototypeDelegation.getter.list]
      let prototypeDelegationSetting = construtorProperty::prototypeDelegationGetter(Reference.prototypeDelegation.key.entity)
      prototype = prototypeDelegationSetting.prototype // Entities prototypes delegate to each other.
    }
    Object.setPrototypeOf(targetInstance, prototype) // inherit own and delegated functionalities.
  },
  [Reference.initialize.key.multipleDelegation]({ targetInstance, delegationList = [] }, previousResult /* in case multiple constructor function found and executed. */) {
    if (delegationList.length == 0) return
    delegationList.unshift(targetInstance |> Object.getPrototypeOf) // add the class prototype to the additional prototypes to delegate to.
    return multipleDelegationProxy({ targetObject: targetInstance, delegationList })
  },
  [Reference.initialize.key.data]({ data = {}, targetInstance }: { data: Object } = {}) {
    Object.assign(targetInstance, data) // apply data to instance
    return targetInstance
  },
  // Example: Trying to override a symbol of a parent class in the child class properties, when called with recursive option (e.g. in Constructable.reference.construct) will execute all functions with the same key throughout the prototype chain.
  // [Constructable.reference.initialize.key.constructable]() {
  //   console.log(`Executed together with other Constructable.reference.initialize.key.constructable in the prototype chain`)
  // },
  [Reference.initialize.key.classInstance]({ targetInstance, callerClass = this, description = '' } = {}) {
    Object.defineProperty(targetInstance, Constructable.reference.metadata, {
      writable: false,
      enumerable: false,
      value: { type: Symbol(`${callerClass[Constructable.reference.name]} ${description}`) },
    }) // set metadata information for debugging.
    targetInstance.constructor = callerClass // to preserve functionality of native JS functions.
    return targetInstance
  },
  [Reference.initialize.key.entityClass]({ targetInstance, callerClass = this } = {}) {
    let constructorSwitch = callerClass::callerClass[Constructable.reference.constructor.switch]
    let entityPrototypeDelegation =
      constructorSwitch({ implementationKey: Entity.reference.constructor.key.prototype })
      |> (g => g.next('intermittent') && g.next({ description: 'Entity.reference.prototypeDelegation.key.entity' }).value)
    targetInstance[Constructable.reference.prototypeDelegation.setter.list]({
      [Entity.reference.prototypeDelegation.key.entity]: {
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
Reference.constructor = {
  key: {
    // creates an entity class (a Constructable with speicific Entity related properties)
    entityClass: Symbol('Funtionality:constructor.key.entityClass'),
    // merge data into instance properties
    data: Symbol('Funtionality:constructor.key.data'),
    configuredClass: Symbol('Funtionality:constructor.key.configuredClass'),
    // prototype - creates a prototype that belongs to the caller class (sets constructor to class)
    prototype: Symbol('Funtionality:constructor.key.prototype'),
  },
}
Prototype[Constructable.reference.constructor.setter.list]({
  [Reference.constructor.key.entityClass]({ description, callerClass = this } = {}) {
    const initializeSwitch = callerClass[Constructable.reference.initialize.switch],
      constructorSwitch = callerClass[Constructable.reference.constructor.switch]
    let entityClass = callerClass::constructorSwitch({ implementationKey: Constructable.reference.constructor.key.constructable }) |> (g => g.next('intermittent') && g.next({ description }).value)
    entityClass::initializeSwitch({ implementationKey: Reference.initialize.key.entityClass }) |> (g => g.next('intermittent') && g.next({ targetInstance: entityClass }).value)
    return entityClass
  },
  [Reference.constructor.key.data]({ data, delegationList, callerClass = this } = {}) {
    let instantiateSwitch = callerClass[Constructable.reference.instantiate.switch],
      initializeSwitch = callerClass[Constructable.reference.initialize.switch]

    // create instance
    let instance =
      callerClass::instantiateSwitch({ implementationKey: Constructable.reference.instantiate.key.createObjectWithDelegation })
      |> (g => g.next('intermittent') && g.next({ instanceType: 'object' }).value)

    // delegate to the Entity constructable class
    callerClass::initializeSwitch({ implementationKey: Reference.initialize.key.entity, recursiveDelegationChainExecution: true })
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
    callerClass::initializeSwitch({ implementationKey: Reference.initialize.key.multipleDelegation }) |> (g => g.next('intermittent') && g.next({ targetInstance: instance, delegationList }).value)

    // initialize instance data.
    callerClass::initializeSwitch({ implementationKey: Reference.initialize.key.data, recursiveDelegationChainExecution: true })
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
  [Reference.constructor.key.configuredClass]({ description = 'Configued Class', callerClass = this, parameter } = {}) {
    let instance =
      callerClass[Constructable.reference.instantiate.switch]({ implementationKey: Reference.instantiate.key.createObjectWithDelegation })
      |> (g => g.next('intermittent') && g.next({ description, prototypeDelegation: callerClass }).value)
    callerClass[Constructable.reference.initialize.switch]({ implementationKey: Reference.initialize.key.classInstance })
      |> (g => g.next('intermittent') && g.next({ targetInstance: instance, description: description }).value)
    instance.parameter = parameter
    return instance
  },
  [Reference.constructor.key.prototype]({ propertyObject /* The prototype initial value */, callerClass = this, description } = {}, previousResult) {
    let instance =
      callerClass::callerClass[Constructable.reference.instantiate.switch]({ implementationKey: Reference.instantiate.key.createObjectWithDelegation })
      |> (g => g.next('intermittent') && g.next().value)
    callerClass[Constructable.reference.initialize.switch]({ implementationKey: Reference.initialize.key.classInstance })
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
Reference.clientInterface = {
  key: {
    // create an entity class that has follows that Entity pattern to create instances with custom prototype chains.
    entityClass: Symbol('Funtionality:clientInterface.key.entityClass'),
    // create an instance using entity defined prototype and innitialization functions. Used by Entity classes to create an interface for their class.
    instanceDelegatingToClassPrototype: Symbol('Funtionality:clientInterface.key.instanceDelegatingToClassPrototype'),
  },
}
Prototype[Constructable.reference.clientInterface.setter.list]({
  [Reference.clientInterface.key.entityClass]() {
    const callerClass = this
    let constructorSwitch = Constructable[Constructable.reference.constructor.switch]
    const proxiedTarget = new Proxy(function() {}, {
      construct(target, argumentList, proxiedTarget) {
        let instance = callerClass::constructorSwitch({ implementationKey: Reference.constructor.key.entityClass }) |> (g => g.next('intermittent') && g.next(...argumentList).value)
        return instance
      },
    })
    return proxiedTarget
  },

  // Entity instance relating to prototype chain with functionality specific to the implementer class (sub class, e.g. Graph Element)
  [Reference.clientInterface.key.instanceDelegatingToClassPrototype]({
    constructorImplementation = throw new Error('• Parameter `constructorImplementation` must be passed.'),
    configuredConstructableImplementation = Reference.constructor.key.configuredClass,
    clientInterfaceImplementation = Reference.clientInterface.key.instanceDelegatingToClassPrototype,
    // apply changes to arguments data structure.
    argumentListAdapter,
  } = {}) {
    const callerClass = this,
      clientInterfaceArguments = arguments
    let constructorSwitch = Constructable[Constructable.reference.constructor.switch],
      clientInterfaceSwitch = Constructable[Constructable.reference.clientInterface.switch]
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
Entity.clientInterface = Entity[Constructable.reference.clientInterface.switch]({ implementationKey: Reference.clientInterface.key.entityClass }) |> (g => g.next('intermittent') && g.next({}).value)
