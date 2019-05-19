import * as symbol from './Symbol.reference.js'
import * as mergedFunctionality from '../functionalityPrototype/mergedFunctionality.js'
import { createObjectWithDelegation } from '../utility/createObjectWithDelegation.js'
import { executionControl } from '../utility/generatorExecutionControl.js'
import { mergeNonexistentProperties } from '../utility/mergeProperty.js'

// set the properties necessary for Constructable pattern usage.
function initializeConstuctable({ targetInstance, reference, prototype, description } = {}) {
  reference ||= Object.create(null)
  prototype ||= Object.create(targetInstance |> Object.getPrototypeOf) // Entities prototypes delegate to each other.
  mergeNonexistentProperties(targetInstance, {
    // set properties only if they do not exist on the target object.
    // self: Symbol(description),
    // get [Symbol.species]() {
    //   return GraphElement
    // },
    [symbol.reference]: reference,
    [symbol.prototype]: prototype, // Entities prototypes delegate to each other.
  })
  Object.defineProperty(targetInstance, symbol.metadata, { writable: false, enumerable: false, value: { type: Symbol(description) } }) // set metadata information for debugging.
  Object.setPrototypeOf(targetInstance, targetInstance[symbol.prototype]) // inherit own and delegated functionalities.
  return targetInstance
}

export const Constructable =
  createObjectWithDelegation({ instanceType: 'object' })
  |> (instance => {
    initializeConstuctable({ description: 'Constructable', targetInstance: instance, reference: mergedFunctionality.Reference, prototype: mergedFunctionality.Prototype })
    instance.symbol = symbol
    return instance
  })

const Reference = Constructable[symbol.reference]
const Prototype = Constructable[symbol.prototype]

/*
                   _        _                    ____       _                  _   _             
   _ __  _ __ ___ | |_ ___ | |_ _   _ _ __   ___|  _ \  ___| | ___  __ _  __ _| |_(_) ___  _ __  
  | '_ \| '__/ _ \| __/ _ \| __| | | | '_ \ / _ \ | | |/ _ \ |/ _ \/ _` |/ _` | __| |/ _ \| '_ \ 
  | |_) | | | (_) | || (_) | |_| |_| | |_) |  __/ |_| |  __/ |  __/ (_| | (_| | |_| | (_) | | | |
  | .__/|_|  \___/ \__\___/ \__|\__, | .__/ \___|____/ \___|_|\___|\__, |\__,_|\__|_|\___/|_| |_|
  |_|                           |___/|_|                           |___/                         
*/
Reference.prototypeDelegation.key = {}
Prototype[Reference.prototypeDelegation.setter.list]({})

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
}
Prototype[Reference.initialize.setter.list]({
  [Reference.initialize.key.constructable]: initializeConstuctable,
  // [Reference.initialize.key.configuredConstructor]({ description, instanceObject } = {}) {
  //   mergeNonexistentProperties(instanceObject, { self: Symbol(description) })
  //   return instanceObject
  // },
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

  // configuredConstructable: Symbol('Funtionality:constructor.key.configuredConstructable'),
}
Prototype[Reference.constructor.setter.list]({
  [Reference.constructor.key.constructable]({ description, reference, prototype, prototypeDelegation, self = this } = {}) {
    prototypeDelegation ||= self[symbol.prototype]
    let instance =
      self[Reference.instantiate.switch]({ implementationKey: Reference.instantiate.key.createObjectWithDelegation })
      |> (g => g.next('intermittent') && g.next({ description, prototypeDelegation: prototypeDelegation }).value)
    self[Reference.initialize.switch]({ implementationKey: Reference.initialize.key.constructable })
      |> (g => g.next('intermittent') && g.next({ description, reference, prototype, targetInstance: instance }).value)
    // Object.setPrototypeOf(instance, instance[symbol.prototype]) // root level specific
    return instance
  },

  // oldConstructable: function*({
  //   description,
  //   instantiateFallback,
  //   initializeFallback,
  //   self = this,
  //   entityInstance,
  //   instantiateSwitchSymbol = Reference.instantiate.key.prototypeInstance,
  //   initializeSwitchSymbol = Reference.initialize.key.constructableInstance,
  // } = {}) {
  //   const shouldHandOverControl = executionControl.shouldHandOver(function.sent)
  //   const step = [
  //     {
  //       passThroughArg: { description },
  //       func: function(previousArg, arg) {
  //         let instance = self::self[Reference.instantiate.switch]({ implementationKey: instantiateSwitchSymbol }) |> (g => g.next('intermittent') && g.next(arg).value)
  //         return { instance }
  //       },
  //       condition: !Boolean(entityInstance),
  //     },
  //     {
  //       passThroughArg: { description },
  //       func: function({ instance }, arg) {
  //         self::self[Reference.initialize.switch]({ implementationKey: initializeSwitchSymbol }) |> (g => g.next('intermittent') && g.next(Object.assign({ instanceObject: instance }, arg)).value)
  //         return instance
  //       },
  //       condition: !Boolean(entityInstance),
  //     },
  //   ]

  //   // Run chain of step functions
  //   let i = 0,
  //     result
  //   while (i < step.length) {
  //     if (step[i].condition && !step[i].condition) {
  //       i++
  //       continue
  //     }
  //     if (shouldHandOverControl) {
  //       yield step[i].passThroughArg
  //       result = step[i].func(result, function.sent)
  //     } else {
  //       result = step[i].func(result, step[i].passThroughArg)
  //     }
  //     i++
  //   }
  //   entityInstance ||= result
  //   entityInstance[Reference.instantiate.fallback] = instantiateFallback
  //   entityInstance[Reference.initialize.fallback] = initializeFallback
  //   return entityInstance
  // },
})

/*
    ____ _ _            _   ___       _             __                
   / ___| (_) ___ _ __ | |_|_ _|_ __ | |_ ___ _ __ / _| __ _  ___ ___ 
  | |   | | |/ _ \ '_ \| __|| || '_ \| __/ _ \ '__| |_ / _` |/ __/ _ \
  | |___| | |  __/ | | | |_ | || | | | ||  __/ |  |  _| (_| | (_|  __/
   \____|_|_|\___|_| |_|\__|___|_| |_|\__\___|_|  |_|  \__,_|\___\___|
*/
Reference.clientInterface.key = {}
Prototype[Reference.clientInterface.setter.list]({}) // no need to client interface, as toplevel Constructables will use the Prototype functionality api directly.
