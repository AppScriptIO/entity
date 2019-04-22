import * as symbol from '../Symbol.constant.js'
import { Reference } from './Reference.js'
import { Prototype } from './Prototype.js'
import { createConstructableWithoutContructor } from '../utility/createConstructableWithoutContructor.js'
import { executionControl } from '../utility/prototypeFunctionality.js'
import { mergeNonexistentProperties } from '../utility/mergeProperty.js'
function createInstanceWithDelegation({ description, prototypeDelegation = null, instanceObject, objectType, construtorProperty = null }) {
  switch (objectType) {
    case 'function':
      instanceObject ||= createConstructableWithoutContructor(description)
      Object.setPrototypeOf(instanceObject, prototypeDelegation)
      break
    case 'object':
    default:
      instanceObject ||= Object.create(prototypeDelegation)
      break
  }
  Object.defineProperty(instanceObject, symbol.constructor, {
    value: construtorProperty,
    writable: true,
    enumerable: false,
    configurable: false,
  })
  return instanceObject
}
function initializeConstructableInstance({ description, instanceObject, reference, prototype, rootLevelPrototype = false } = {}) {
  reference ||= Object.create(null)
  prototype ||= Object.create(instanceObject |> Object.getPrototypeOf) // Entities prototypes delegate to each other.
  mergeNonexistentProperties(instanceObject, {
    // set properties only if they do not exist on the target object.
    // self: Symbol(description),
    // get [Symbol.species]() {
    //   return GraphElement
    // },
    [symbol.reference]: reference,
    [symbol.prototype]: prototype, // Entities prototypes delegate to each other.
  })
  Object.defineProperty(instanceObject, symbol.metadata, { writable: false, enumerable: false, value: { self: Symbol(description) } })
  if (rootLevelPrototype) Object.setPrototypeOf(instanceObject, instanceObject[symbol.prototype])
  // instanceObject[Reference.prototypeDelegation.setter.list]({
  //   [Reference.prototypeDelegation.key.entityPrototype]: instanceObject.prototype,
  //   [Reference.prototypeDelegation.key.entityClass]: instanceObject,
  // })
  return instanceObject
}
function rootLevelConstructableInstance({ description, reference, prototype, prototypeDelegation }) {
  let instance = createInstanceWithDelegation({ description, prototypeDelegation: prototypeDelegation })
  return initializeConstructableInstance({ description, reference, prototype, instanceObject: instance, rootLevelPrototype: true })
}

export const Constructable = rootLevelConstructableInstance({ description: 'Constructable' })
Constructable[symbol.prototype] |> (_ => Object.assign(_, Prototype))
Constructable[symbol.reference] |> (_ => Object.assign(_, Reference))

/**
 *  Instantiate
 */
Constructable[symbol.prototype][Reference.instantiate.setter.list]({
  [Reference.instantiate.key.prototype]({ instanceObject, objectType, prototypeDelegation, construtorProperty, self = this, description }: { objectType: 'object' | 'function' }) {
    return createInstanceWithDelegation({ instanceObject, objectType, prototypeDelegation, construtorProperty, description })
  },
  [Reference.instantiate.key.prototypeInstance]({ instanceType = 'object', self = this }: { instanceType: 'object' | 'function' }) {
    let args = arguments[0]
    let implementationFunc = Prototype[Reference.instantiate.getter.list](Reference.instantiate.key.prototype)
    let instance = self::implementationFunc(
      Object.assign(args, {
        prototypeDelegation: self[Reference.prototypeDelegation.getter.list](Reference.prototypeDelegation.key.entityPrototype),
        construtorProperty: self[Reference.prototypeDelegation.getter.list](Reference.prototypeDelegation.key.entityClass),
        objectType: instanceType,
      }),
    )
    return instance
  },
})

/**
 *  Initialize
 */
Constructable[symbol.prototype][Reference.initialize.setter.list]({
  [Reference.initialize.key.configuredConstructor]({ description, instanceObject } = {}) {
    mergeNonexistentProperties(instanceObject, { self: Symbol(description) })
    return instanceObject
  },
  [Reference.initialize.key.constructableInstance]: initializeConstructableInstance,
})

/**
 *  Constructor
 */
Constructable[symbol.prototype][Reference.constructor.setter.list]({
  [Reference.constructor.key.constructable]: function*({
    description,
    instantiateFallback,
    initializeFallback,
    self = this,
    entityInstance,
    instantiateSwitchSymbol = Reference.instantiate.key.prototypeInstance,
    initializeSwitchSymbol = Reference.initialize.key.constructableInstance,
  } = {}) {
    const shouldHandOverControl = executionControl.shouldHandOver(function.sent)
    const step = [
      {
        passThroughArg: { description },
        func: function(previousArg, arg) {
          let instance = self::self[Reference.instantiate.switch]({ implementationKey: instantiateSwitchSymbol }) |> (g => g.next('intermittent') && g.next(arg).value)
          return { instance }
        },
        condition: !Boolean(entityInstance),
      },
      {
        passThroughArg: { description },
        func: function({ instance }, arg) {
          self::self[Reference.initialize.switch]({ implementationKey: initializeSwitchSymbol }) |> (g => g.next('intermittent') && g.next(Object.assign({ instanceObject: instance }, arg)).value)
          return instance
        },
        condition: !Boolean(entityInstance),
      },
    ]

    // Run chain of step functions
    let i = 0,
      result
    while (i < step.length) {
      if (step[i].condition && !step[i].condition) {
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
    entityInstance ||= result
    entityInstance[Reference.instantiate.fallback] = instantiateFallback
    entityInstance[Reference.initialize.fallback] = initializeFallback
    return entityInstance
  },
  [Reference.constructor.key.configuredConstructable]: function({ description = 'prototypeInstanceConfiguredConstructable', instantiateFallback, initializeFallback, self = this } = {}) {
    let implementationFunc = self[Reference.constructor.getter.list](Reference.constructor.key.constructable)
    let configuredInstance =
      self::implementationFunc({
        description: description,
        instantiateFallback: instantiateFallback || Reference.instantiate.key.prototypeInstance,
        initializeFallback: initializeFallback || Reference.initialize.key.data,
        instantiateSwitchSymbol: Reference.instantiate.key.prototype,
        initializeSwitchSymbol: Reference.initialize.key.configuredConstructor,
        // instantiateSwitchSymbol: Reference.instantiate.key.prototypeInstance,
        // initializeSwitchSymbol: Reference.initialize.key.constructableInstance,
      })
      |> (iterateConstructable => {
        let instantiateArg = iterateConstructable.next('intermittent').value
        let initializeArg = iterateConstructable.next(Object.assign(instantiateArg, { prototypeDelegation: self, construtorProperty: self })).value
        return iterateConstructable.next(Object.assign(initializeArg, { description })).value
      })
    return configuredInstance
  },
  [Reference.constructor.key.toplevelConstructable]: function({ description = 'ToplevelConstructable', prototypeDelegation = Prototype, reference } = {}) {
    let implementationFunc = Prototype[Reference.constructor.getter.list](Reference.constructor.key.constructable)
    let entityInstance =
      this::implementationFunc({
        description: description,
        instantiateFallback: Reference.instantiate.key.prototypeInstance,
        initializeFallback: Reference.initialize.key.constructableInstance,
        instantiateSwitchSymbol: Reference.instantiate.key.prototypeInstance,
        initializeSwitchSymbol: Reference.initialize.key.constructableInstance,
      })
      |> (iterateConstructable => {
        let instantiateArg = iterateConstructable.next('intermittent').value
        let initializeArg = iterateConstructable.next(Object.assign(instantiateArg, { prototypeDelegation: Prototype })).value
        return iterateConstructable.next(Object.assign(initializeArg, { prototypeDelegation })).value
      })
    return entityInstance
  },
  [Reference.constructor.key.configuredConstructableForToplevelEntity]: function({ description, self = this } = {}) {
    let instance =
      self::self[Reference.instantiate.switch]({ implementationKey: Reference.instantiate.key.prototype })
      |> (g => g.next('intermittent') && g.next({ description, prototypeDelegation: self, construtorProperty: self }).value)
    self::self[Reference.initialize.switch]({ implementationKey: Reference.initialize.key.configuredConstructor })
      |> (g => g.next('intermittent') && g.next({ description, instanceObject: instance }).value)
    return instance
  },
  [Reference.constructor.key.constructableInstance]: function({ instanceType, description, reference, prototype, prototypeDelegation, self = this } = {}) {
    let instance =
      self::self[Reference.instantiate.switch]({ implementationKey: Reference.instantiate.key.prototype })
      |> (g => g.next('intermittent') && g.next({ instanceType, description, prototypeDelegation: self[symbol.prototype], construtorProperty: self }).value)
    self::self[Reference.initialize.switch]({ implementationKey: Reference.initialize.key.constructableInstance })
      |> (g => g.next('intermittent') && g.next({ description, instanceObject: instance, reference, prototype, rootLevelPrototype: true }).value)
    return instance
  },
})
