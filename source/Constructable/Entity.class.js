import { Constructable } from './Constructable.class.js'
import { mergeArrayWithObjectItem } from '../utility/mergeProperty.js'
import * as symbol from '../functionalityPrototype/Symbol.reference.js'

export const Entity = new Constructable.clientInterface({ description: 'Entity' })

const Reference = Entity[Constructable['reference'].reference]
const Prototype = Entity[Constructable['reference'].prototype]

/*
                   _        _                    ____       _                  _   _             
   _ __  _ __ ___ | |_ ___ | |_ _   _ _ __   ___|  _ \  ___| | ___  __ _  __ _| |_(_) ___  _ __  
  | '_ \| '__/ _ \| __/ _ \| __| | | | '_ \ / _ \ | | |/ _ \ |/ _ \/ _` |/ _` | __| |/ _ \| '_ \ 
  | |_) | | | (_) | || (_) | |_| |_| | |_) |  __/ |_| |  __/ |  __/ (_| | (_| | |_| | (_) | | | |
  | .__/|_|  \___/ \__\___/ \__|\__, | .__/ \___|____/ \___|_|\___|\__, |\__,_|\__|_|\___/|_| |_|
  |_|                           |___/|_|                           |___/                         
*/
Reference.prototypeDelegation = {
  // TODO: Add implementation for creating prototype chains related to Graph instances and shared prototype tree functionality.
  key: {
    entity: Symbol('Funtionality:prototypeDelegation.key.entity'), // type Object, usually contains `prototype` protperty
  },
}
Prototype[Constructable['reference'].prototypeDelegation.setter.list]({
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
Prototype[Constructable['reference'].instantiate.setter.list]({})

/*
    ___       _ _   _       _ _         
  |_ _|_ __ (_) |_(_) __ _| (_)_______ 
    | || '_ \| | __| |/ _` | | |_  / _ \
    | || | | | | |_| | (_| | | |/ /  __/
  |___|_| |_|_|\__|_|\__,_|_|_/___\___|
*/
Reference.initialize = {
  key: {
    // initialize instance with entity delegation values.
    entity: Symbol('Funtionality:initialize.key.entity'),
    // merge data into instance properties
    data: Symbol('Funtionality:initialize.key.data'),
    configuredClass: Symbol('Funtionality:initialize.key.configuredClass'),
  },
}
Prototype[Constructable['reference'].initialize.setter.list]({
  [Reference.initialize.key.entity]({ targetInstance, prototype, construtorProperty }, previousResult /* in case multiple constructor function found and executed. */) {
    if (!prototype) {
      let prototypeDelegationGetter = construtorProperty[Constructable['reference'].prototypeDelegation.getter.list]
      let prototypeDelegationSetting = construtorProperty::prototypeDelegationGetter(Reference.prototypeDelegation.key.entity)
      prototype = prototypeDelegationSetting.prototype // Entities prototypes delegate to each other.
    }
    Object.setPrototypeOf(targetInstance, prototype) // inherit own and delegated functionalities.
  },
  [Reference.initialize.key.data]({ data = {}, targetInstance }: { data: Object } = {}) {
    Object.assign(targetInstance, data) // apply data to instance
    return targetInstance
  },
  // Example: Trying to override a symbol of a parent class in the child class properties, when called with recursive option (e.g. in Constructable['reference'].construct) will execute all functions with the same key throughout the prototype chain.
  // [Constructable['reference'].initialize.key.constructable]() {
  //   console.log(`Executed together with other Constructable['reference'].initialize.key.constructable in the prototype chain`)
  // },
  [Reference.initialize.key.configuredClass]({ description = 'configuredClass', targetInstance, parameter = [] } = {}) {
    Object.defineProperty(targetInstance, Reference.metadata, { writable: false, enumerable: false, value: { type: Symbol(description) } }) // set metadata information for debugging.
    targetInstance.parameter = parameter
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
    // merge data into instance properties
    data: Symbol('Funtionality:constructor.key.data'),
    configuredClass: Symbol('Funtionality:constructor.key.configuredClass'),
  },
}
Prototype[Constructable['reference'].constructor.setter.list]({
  [Reference.constructor.key.data]({ data, delegationList, self = this } = {}) {
    let instantiateSwitch = self[Constructable['reference'].instantiate.switch],
      initializeSwitch = self[Constructable['reference'].initialize.switch]
    let instance =
      self::instantiateSwitch({ implementationKey: Constructable['reference'].instantiate.key.createObjectWithDelegation }) |> (g => g.next('intermittent') && g.next({ instanceType: 'object' }).value)
    self::initializeSwitch({ implementationKey: Reference.initialize.key.entity, recursiveDelegationChainExecution: true })
      |> (g => {
        g.next('intermittent')
        // pass to all implemenatations the same argument
        let generator
        do {
          generator = g.next({ targetInstance: instance, construtorProperty: self })
        } while (!generator.done)
        // return generator.value
      })
    self::initializeSwitch({ implementationKey: Reference.initialize.key.data, recursiveDelegationChainExecution: true })
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
  [Reference.constructor.key.configuredClass]({ description, self = this, parameter } = {}) {
    let instance =
      self[Constructable['reference'].instantiate.switch]({ implementationKey: Reference.instantiate.key.createObjectWithDelegation })
      |> (g => g.next('intermittent') && g.next({ description, prototypeDelegation: self }).value)
    self[Constructable['reference'].initialize.switch]({ implementationKey: Reference.initialize.key.configuredClass })
      |> (g => g.next('intermittent') && g.next({ description, targetInstance: instance, parameter }).value)
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
    entity: Symbol('Funtionality:clientInterface.key.entity'),
  },
}
Prototype[Constructable['reference'].clientInterface.setter.list]({
  [Reference.clientInterface.key.entity]({
    callerClass = this,
    constructorImplementation = throw new Error('• Parameter `constructorImplementation` must be passed.'),
    configuredConstructableImplementation = Reference.constructor.key.configuredClass,
    clientInterfaceImplementation = Reference.clientInterface.key.entity,
    // apply changes to arguments data structure.
    argumentListAdapter,
  } = {}) {
    let constructorSwitch = Constructable[Constructable['reference'].constructor.switch],
      clientInterfaceSwitch = Constructable[Constructable['reference'].clientInterface.switch]
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
          |> (g =>
            g.next('intermittent') &&
            //Pass same arguments from previous client itnerface
            g.next({ constructorImplementation, configuredConstructableImplementation, clientInterfaceImplementation, argumentListAdapter }).value)
        return clientInterface
      },
    })
    return proxiedTarget
  },
})

// client interface for creating sub class instance delegating to the `Constructable` functionality chain.
Entity.clientInterfaceConstructable =
  Entity[Constructable['reference'].clientInterface.switch]({ implementationKey: Constructable['reference'].clientInterface.key.constructable }) |> (g => g.next('intermittent') && g.next().value)

// Entity instance relating to prototype chain with functionality specific to the implementer class (sub class, e.g. Graph Element)
Entity.clientInterface =
  Entity[Constructable['reference'].clientInterface.switch]({ implementationKey: Reference.clientInterface.key.entity })
  |> (g =>
    g.next('intermittent') &&
    g.next({
      constructorImplementation: Reference.constructor.key.data,
    }).value)
