import { metadata as metadataSymbol } from '../functionalityPrototype/Symbol.reference.js'
import { instantiateInitialize, constructor, clientInterface } from '../functionalityPrototype/exportFunctionality.js'
import { createObjectWithDelegation } from '../utility/createObjectWithDelegation.js'
import { executionControl } from '../utility/generatorExecutionControl.js'
import { mergeNonexistentProperties, mergeArrayWithObjectItem } from '../utility/mergeProperty.js'
import * as lodash from 'lodash'

// constructable symbols
const Reference = Object.assign(
  Object.create(Object.prototype),
  {
    name: Symbol('Own class name'), // own class name
    class: Symbol('class'), // the constructable used to create the instance (to which class does it belong).
    reference: 'reference', // reference key to be set on the class for short access to `prototypeDelegation.reference`.
    metadata: metadataSymbol,
    key: {
      createObjectWithDelegation: Symbol('createObjectWithDelegation'),
      classInstance: Symbol('class instance related'), // set constructor.
      configuredClass: Symbol('Configured class/constructable related'), // an instance that delegates to static class and holds default paramerts to be used on call.
      constructableClass: Symbol('Constructable related'),
    },
  },
  instantiateInitialize.Reference,
  constructor.Reference,
  clientInterface.Reference,
)
// constructable functionality
const Prototype = Object.assign(Object.create(Object.prototype), instantiateInitialize.Prototype, constructor.Prototype, clientInterface.Prototype)

/*
                   _        _                    ____       _                  _   _             
   _ __  _ __ ___ | |_ ___ | |_ _   _ _ __   ___|  _ \  ___| | ___  __ _  __ _| |_(_) ___  _ __  
  | '_ \| '__/ _ \| __/ _ \| __| | | | '_ \ / _ \ | | |/ _ \ |/ _ \/ _` |/ _` | __| |/ _ \| '_ \ 
  | |_) | | | (_) | || (_) | |_| |_| | |_) |  __/ |_| |  __/ |  __/ (_| | (_| | |_| | (_) | | | |
  | .__/|_|  \___/ \__\___/ \__|\__, | .__/ \___|____/ \___|_|\___|\__, |\__,_|\__|_|\___/|_| |_|
  |_|                           |___/|_|                           |___/                         
  hold properties required in prototype delegation
*/
Prototype::Prototype[Reference.prototypeDelegation.functionality].setter({
  [Reference.key.constructableClass]: {
    prototype: Prototype,
    reference: Reference,
  },
})

/*
 
   ___           _              _   _       _       
  |_ _|_ __  ___| |_ __ _ _ __ | |_(_) __ _| |_ ___ 
   | || '_ \/ __| __/ _` | '_ \| __| |/ _` | __/ _ \
   | || | | \__ \ || (_| | | | | |_| | (_| | ||  __/
  |___|_| |_|___/\__\__,_|_| |_|\__|_|\__,_|\__\___|
*/
Prototype::Prototype[Reference.instantiate.functionality].setter({
  // general implementation which creates an object delegating to passed param.
  [Reference.key.createObjectWithDelegation]: createObjectWithDelegation,
})
/*
   ___       _ _   _       _ _         
  |_ _|_ __ (_) |_(_) __ _| (_)_______ 
   | || '_ \| | __| |/ _` | | |_  / _ \
   | || | | | | |_| | (_| | | |/ /  __/
  |___|_| |_|_|\__|_|\__,_|_|_/___\___|
*/
Prototype::Prototype[Reference.initialize.functionality].setter({
  // set the properties necessary for Constructable pattern usage.       // Initialize Constructable pattern properties.
  [Reference.key.constructableClass]: function initializeConstuctable({ targetInstance, reference, prototype, description, construtorProperty = this } = {}) {
    if (!reference) {
      let prototypeDelegationSetting = construtorProperty::construtorProperty[Reference.prototypeDelegation.functionality].getter(Reference.key.constructableClass)
      reference = Object.create(prototypeDelegationSetting.reference || null)
    }
    if (!prototype) {
      let prototypeDelegationSetting = construtorProperty::construtorProperty[Reference.prototypeDelegation.functionality].getter(Reference.key.constructableClass)
      prototype = Object.create(prototypeDelegationSetting.prototype || null) // Entities prototypes delegate to each other.
    }
    Object.setPrototypeOf(targetInstance, prototype) // inherit own and delegated functionalities.
    // set constructable prototypeDelegation properties - values which will be used in instance creation
    targetInstance::targetInstance[Reference.prototypeDelegation.functionality].setter({
      [Reference.key.constructableClass]: {
        prototype: prototype,
        reference: reference,
      },
    })
    let prototypeDelegationGetter = targetInstance::targetInstance[Reference.prototypeDelegation.functionality].getter
    mergeNonexistentProperties(targetInstance, {
      // in usage through `instanceof` JS api.
      // get [Symbol.species]() {
      //   return targetInstance[Reference.class] //! Doesn't work as it must return a constructor.
      // },
      // Note: expose `prototype` & `reference` on the instance directly for easier access. (this shouldn't be relied upon when constructing a sub instance / constructable instance)
      get reference() {
        return prototypeDelegationGetter(Reference.key.constructableClass).reference
      },
      // get [Reference.prototype]() {
      //   return targetInstance::targetInstance[Reference.prototypeDelegation.functionality].getter(Reference.key.constructableClass).prototype
      // },
      [Reference.class]: construtorProperty, // the class used to construct the instance.
    })
    Object.defineProperty(targetInstance, Reference.name, { writable: false, enumerable: false, value: description }) // set metadata information for debugging.
    // add debugging information.
    if (!prototype.hasOwnProperty(Reference.metadata))
      Object.defineProperty(prototype, Reference.metadata, { writable: false, enumerable: false, value: { type: Symbol(`${description} functionality`) } })
    return targetInstance
  },
  // initialize a prototype that belongs that is a class.
  [Reference.key.classInstance]({ targetInstance, construtorProperty = this, description = '' } = {}) {
    if (!targetInstance.hasOwnProperty(Reference.metadata))
      Object.defineProperty(targetInstance, Reference.metadata, {
        writable: false,
        enumerable: false,
        value: { type: Symbol(`${description} - created by ${construtorProperty[Reference.name]} class`) },
      }) // set metadata information for debugging.
    targetInstance.constructor = construtorProperty // to preserve functionality of native JS functions integration.
    return targetInstance
  },
  [Reference.key.configuredClass]({ targetInstance, parameter = [] } = {}) {
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
Prototype::Prototype[Reference.constructor.functionality].setter({
  // generator function that uses a pattern allowing for handing over control to caller - i.e. running the function in steps.
  // Constructable pattern instance - follows the Constructable specification (this module).
  // TODO: Document pattern used for handing over control to client and pipping results through the chain
  [Reference.key.constructableClass]: function*({ description, reference, prototype, prototypeDelegation, callerClass = this } = {}) {
    const shouldHandOverControl = executionControl.shouldHandOver(function.sent)
    prototypeDelegation ||= callerClass::callerClass[Reference.prototypeDelegation.functionality].getter(Reference.key.constructableClass).prototype
    const step = [
      // execution of steps allows for passing argument for each step and pipping the result of the previous step.
      {
        passThroughArg: { description, prototypeDelegation: prototypeDelegation },
        func: function(previousArg, arg) {
          let instance =
            callerClass::callerClass[Reference.instantiate.functionality].switch({ implementationKey: Reference.key.createObjectWithDelegation }) |> (g => g.next('intermittent') && g.next(arg).value)
          return { instance }
        },
        condition: true,
      },
      {
        passThroughArg: { description, reference, prototype, construtorProperty: callerClass },
        func: function({ instance }, arg) {
          // pass to all implemenatations the same argument
          let argumentObject = Object.assign({ targetInstance: instance }, arg)
          callerClass::callerClass[Reference.initialize.functionality].switch({ implementationKey: Reference.key.constructableClass, recursiveDelegationChainExecution: true })
            |> (g => {
              g.next('intermittent')
              let generator
              do {
                generator = g.next(argumentObject)
              } while (!generator.done)
              // return generator.value
            })
          callerClass::callerClass[Reference.initialize.functionality].switch({ implementationKey: Reference.key.classInstance })
            |> (g => g.next('intermittent') && g.next(lodash.pick(argumentObject, ['description', 'targetInstance', 'construtorProperty'])).value)
          return instance
        },
        condition: true,
      },
    ]

    // Run chain of step functions
    let i = 0,
      result
    while (i < step.length) {
      if (step[i].condition == false) {
        i++
        continue
      }
      if (shouldHandOverControl) {
        yield step[i].passThroughArg
        result = step[i].func(result, function.sent)
      } else {
        result = step[i].func(result, step[i].passThroughArg)
      }
      i++
    }
    return result
  },
  [Reference.key.classInstance]({ description = 'Class', callerClass = this } = {}) {
    let instance =
      callerClass::callerClass[Reference.instantiate.functionality].switch({ implementationKey: Reference.key.createObjectWithDelegation })
      |> (g => g.next('intermittent') && g.next({ description, prototypeDelegation: callerClass }).value)
    callerClass::callerClass[Reference.initialize.functionality].switch({ implementationKey: Reference.key.classInstance })
      |> (g => g.next('intermittent') && g.next({ targetInstance: instance, description: description }).value)
    return instance
  },
  // create instance of a Constructable that is prepopulated with parameters, calling the functions will use these params. This allows usage of params multiple times without repeating them in each requrest.
  [Reference.key.configuredClass]({ description = 'Configured Class.', parameter, callerClass = this } = {}) {
    let instance =
      callerClass::callerClass[Reference.constructor.functionality].switch({ implementationKey: Reference.key.classInstance })
      |> (g => g.next('intermittent') && g.next({ description: description }).value)
    callerClass::callerClass[Reference.initialize.functionality].switch({ implementationKey: Reference.key.configuredClass })
      |> (g => g.next('intermittent') && g.next({ targetInstance: instance, parameter }).value)
    return instance
  },
})

/*
 *   ____                _                   _        _     _         ____ _                
 *  / ___|___  _ __  ___| |_ _ __ _   _  ___| |_ __ _| |__ | | ___   / ___| | __ _ ___ ___  
 * | |   / _ \| '_ \/ __| __| '__| | | |/ __| __/ _` | '_ \| |/ _ \ | |   | |/ _` / __/ __| 
 * | |__| (_) | | | \__ \ |_| |  | |_| | (__| || (_| | |_) | |  __/ | |___| | (_| \__ \__ \ 
 * \____\___/|_| |_|___/\__|_|   \__,_|\___|\__\__,_|_.__/|_|\___|  \____|_|\__,_|___/___/ 
  
   Creation of Constructable class relies on functionality from it's own prototype. Therefore defining functionality implementations comes before the class creation. 
   Another way could be - using the imported functionalities as their own separate prototype, but this will create Constructable in another level in the delegation chain, which is not needed.
*/
export const Constructable =
  Prototype::Prototype[Reference.constructor.functionality].switch({ implementationKey: Reference.key.constructableClass })
  |> (g =>
    g.next('intermittent') &&
    g.next({ description: 'Constructable', reference: Reference, prototype: Prototype /* Passing prototype & reference will prevent creation of another prototype chain level. */ }).value)

/*
    ____ _ _            _   ___       _             __                
   / ___| (_) ___ _ __ | |_|_ _|_ __ | |_ ___ _ __ / _| __ _  ___ ___ 
  | |   | | |/ _ \ '_ \| __|| || '_ \| __/ _ \ '__| |_ / _` |/ __/ _ \
  | |___| | |  __/ | | | |_ | || | | | ||  __/ |  |  _| (_| | (_|  __/
   \____|_|_|\___|_| |_|\__|___|_| |_|\__\___|_|  |_|  \__,_|\___\___|
*/
let prototypeDelegationGetter = Constructable[Reference.prototypeDelegation.functionality].getter
Prototype::Prototype[Reference.clientInterface.functionality].setter({
  /**
   * Example of configured constructable creation: 
    let configuredConstructable = Constructable.clientInterface({ parameter: [] })
    const Entity = new configuredConstructable({ description: 'Entity' })
   */
  [Reference.key.constructableClass]({
    constructorImplementation,
    returnedInstanceAdapter = instance => ({
      class: instance,
      reference: instance[Reference.reference],
      constructablePrototype: instance::prototypeDelegationGetter(Reference.key.constructableClass).prototype,
    }),
    callerClass = this,
  } = {}) {
    let constructorSwitch = Constructable[Reference.constructor.functionality].switch,
      clientInterfaceSwitch = Constructable[Reference.clientInterface.functionality].switch,
      prototypeDelegationGetter = Constructable[Reference.prototypeDelegation.functionality].getter
    let configuredConstructableImplementation = Reference.key.configuredClass,
      clientInterfaceImplementation = Reference.key.constructableClass

    const proxiedTarget = new Proxy(function() {}, {
      construct(target, argumentList, proxiedTarget) {
        if (callerClass.parameter) mergeArrayWithObjectItem({ listTarget: argumentList, listDefault: callerClass.parameter }) // in case configured constructable which holds default parameter values.
        let instance = callerClass::constructorSwitch({ implementationKey: constructorImplementation }) |> (g => g.next('intermittent') && g.next(...argumentList).value)
        return returnedInstanceAdapter ? returnedInstanceAdapter(instance) : instance
      },
      apply(target, thisArg, [{ description, parameter = [] } = {}]) {
        let newConfiguredConstructable =
          callerClass::constructorSwitch({ implementationKey: configuredConstructableImplementation }) |> (g => g.next('intermittent') && g.next({ description: description, parameter }).value)
        let clientInterface = newConfiguredConstructable::clientInterfaceSwitch({ implementationKey: clientInterfaceImplementation }) |> (g => g.next('intermittent') && g.next().value)
        return clientInterface
      },
    })
    return proxiedTarget
  },
})

Constructable.clientInterface =
  Constructable::Constructable[Reference.clientInterface.functionality].switch({ implementationKey: Reference.key.constructableClass })
  |> (g => g.next('intermittent') && g.next({ constructorImplementation: Reference.key.constructableClass }).value)
