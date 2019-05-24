import { metadata as metadataSymbol } from '../functionalityPrototype/Symbol.reference.js'
import { instantiateInitialize, constructor, clientInterface } from '../functionalityPrototype/exportFunctionality.js'
import { createObjectWithDelegation } from '../utility/createObjectWithDelegation.js'
import { executionControl } from '../utility/generatorExecutionControl.js'
import { mergeNonexistentProperties, mergeArrayWithObjectItem } from '../utility/mergeProperty.js'

// constructable symbols
const Reference = Object.assign(
  Object.create(Object.prototype),
  {
    reference: 'reference',
    prototype: Symbol('prototype'),
    class: Symbol('class'), // the constructable used to create the instance (to which class does it belong).
    metadata: metadataSymbol,
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
*/
Reference.prototypeDelegation.key = {
  // hold properties required in prototype delegation
  constructable: Symbol('constructable functionality prototypeDelegation'), // defined on top to be used in initialization function.
}
Prototype[Reference.prototypeDelegation.setter.list]({
  [Reference.prototypeDelegation.key.constructable]: {
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
Reference.instantiate.key = {
  // general implementation which creates an object delegating to passed param.
  createObjectWithDelegation: Symbol('Funtionality:instantiate.key.createObjectWithDelegation'),
}
Prototype[Reference.instantiate.setter.list]({
  [Reference.instantiate.key.createObjectWithDelegation]: createObjectWithDelegation,
})

/*
   ___       _ _   _       _ _         
  |_ _|_ __ (_) |_(_) __ _| (_)_______ 
   | || '_ \| | __| |/ _` | | |_  / _ \
   | || | | | | |_| | (_| | | |/ /  __/
  |___|_| |_|_|\__|_|\__,_|_|_/___\___|
*/
Reference.initialize.key = {
  // Initialize Constructable pattern properties.
  constructable: Symbol('Funtionality:initialize.key.constructable'),
  configuredConstructor: Symbol('Funtionality:initialize.key.configuredConstructor'),
}
Prototype[Reference.initialize.setter.list]({
  // set the properties necessary for Constructable pattern usage.
  [Reference.initialize.key.constructable]: function initializeConstuctable({ targetInstance, reference, prototype, description, construtorProperty = null } = {}) {
    if (!reference) {
      let prototypeDelegationSetting = construtorProperty[Reference.prototypeDelegation.getter.list](Reference.prototypeDelegation.key.constructable)
      reference = Object.create(prototypeDelegationSetting.reference || null)
    }
    if (!prototype) {
      let prototypeDelegationSetting = construtorProperty[Reference.prototypeDelegation.getter.list](Reference.prototypeDelegation.key.constructable)
      prototype = Object.create(prototypeDelegationSetting.prototype || null) // Entities prototypes delegate to each other.
    }
    Object.setPrototypeOf(targetInstance, prototype) // inherit own and delegated functionalities.
    // set constructable prototypeDelegation properties - values which will be used in instance creation
    targetInstance::targetInstance[Reference.prototypeDelegation.setter.list]({
      [Reference.prototypeDelegation.key.constructable]: {
        prototype: prototype,
        reference: reference,
      },
    })
    mergeNonexistentProperties(targetInstance, {
      // in usage through `instanceof` JS api.
      // get [Symbol.species]() {
      //   return targetInstance[Reference.class] //! Doesn't work as it must return a constructor.
      // },
      // Note: expose `prototype` & `reference` on the instance directly for easier access. (this shouldn't be relied upon when constructing a sub instance / constructable instance)
      get [Reference.reference]() {
        return targetInstance[Reference.prototypeDelegation.getter.list](Reference.prototypeDelegation.key.constructable).reference
      },
      get [Reference.prototype]() {
        return targetInstance[Reference.prototypeDelegation.getter.list](Reference.prototypeDelegation.key.constructable).prototype
      },
      [Reference.class]: construtorProperty, // the class used to construct the instance.
    })
    // add debugging information.
    Object.defineProperty(targetInstance, Reference.metadata, { writable: false, enumerable: false, value: { type: Symbol(description) } }) // set metadata information for debugging.
    if (!prototype.hasOwnProperty(Reference.metadata))
      Object.defineProperty(prototype, Reference.metadata, { writable: false, enumerable: false, value: { type: Symbol(`${description} functionality`) } })
    return targetInstance
  },
  [Reference.initialize.key.configuredConstructor]({ description, targetInstance, parameter = [] } = {}) {
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
Reference.constructor.key = {
  // Constructable pattern instance - follows the Constructable specification (this module).
  constructable: Symbol('Funtionality:constructor.key.constructable'),
  // create instance of a Constructable that is prepopulated with parameters, calling the functions will use these params. This allows usage of params multiple times without repeating them in each requrest.
  configuredConstructable: Symbol('Funtionality:constructor.key.configuredConstructable'),
}
Prototype[Reference.constructor.setter.list]({
  // generator function that uses a pattern allowing for handing over control to caller - i.e. running the function in steps.
  // TODO: Document pattern used for handing over control to client and pipping results through the chain
  [Reference.constructor.key.constructable]: function*({ description, reference, prototype, prototypeDelegation, self = this } = {}) {
    const shouldHandOverControl = executionControl.shouldHandOver(function.sent)
    prototypeDelegation ||= self[Reference.prototype]
    const step = [
      // execution of steps allows for passing argument for each step and pipping the result of the previous step.
      {
        passThroughArg: { description, prototypeDelegation: prototypeDelegation },
        func: function(previousArg, arg) {
          let instance = self::self[Reference.instantiate.switch]({ implementationKey: Reference.instantiate.key.createObjectWithDelegation }) |> (g => g.next('intermittent') && g.next(arg).value)
          return { instance }
        },
        condition: true,
      },
      {
        passThroughArg: { description, reference, prototype, construtorProperty: self },
        func: function({ instance }, arg) {
          self::self[Reference.initialize.switch]({ implementationKey: Reference.initialize.key.constructable, recursiveDelegationChainExecution: true })
            |> (g => {
              g.next('intermittent')
              // pass to all implemenatations the same argument
              let argumentList = Object.assign({ targetInstance: instance }, arg)
              let result
              do {
                result = g.next(argumentList)
              } while (!result.done)
              // return result.value
            })
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
  [Reference.constructor.key.configuredConstructable]({ description = 'Configured constructable instance.', self = this, parameter } = {}) {
    let instance =
      self[Reference.instantiate.switch]({ implementationKey: Reference.instantiate.key.createObjectWithDelegation })
      |> (g => g.next('intermittent') && g.next({ description, prototypeDelegation: self }).value)
    self[Reference.initialize.switch]({ implementationKey: Reference.initialize.key.configuredConstructor })
      |> (g => g.next('intermittent') && g.next({ description, targetInstance: instance, parameter }).value)
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
  Prototype[Reference.constructor.switch]({ implementationKey: Reference.constructor.key.constructable })
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
Reference.clientInterface.key = {
  constructable: Symbol('Funtionality:clientInterface.key.constructable'),
}
Prototype[Reference.clientInterface.setter.list]({
  /**
   * Example of configured constructable creation: 
    let configuredConstructable = Constructable.clientInterface({ parameter: [] })
    const Entity = new configuredConstructable({ description: 'Entity' })
   */
  [Reference.clientInterface.key.constructable]({ self = this } = {}) {
    let constructorSwitch = Constructable[Reference.constructor.switch],
      clientInterfaceSwitch = Constructable[Reference.clientInterface.switch]
    const proxiedTarget = new Proxy(function() {}, {
      construct(target, argumentList, proxiedTarget) {
        if (self.parameter) mergeArrayWithObjectItem({ listTarget: argumentList, listDefault: self.parameter }) // in case configured constructable which holds default parameter values.
        let instance = self::constructorSwitch({ implementationKey: Reference.constructor.key.constructable }) |> (g => g.next('intermittent') && g.next(...argumentList).value)
        return instance
      },
      apply(target, thisArg, [{ description, parameter = [] } = {}]) {
        let newConfiguredConstructable =
          self::constructorSwitch({ implementationKey: Reference.constructor.key.configuredConstructable }) |> (g => g.next('intermittent') && g.next({ description: description, parameter }).value)
        let clientInterface = newConfiguredConstructable::clientInterfaceSwitch({ implementationKey: Reference.clientInterface.key.constructable }) |> (g => g.next('intermittent') && g.next().value)
        return clientInterface
      },
    })
    return proxiedTarget
  },
})

Constructable.clientInterface = Constructable[Reference.clientInterface.switch]({ implementationKey: Reference.clientInterface.key.constructable }) |> (g => g.next('intermittent') && g.next().value)
