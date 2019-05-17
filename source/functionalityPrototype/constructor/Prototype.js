import { Reference } from './Symbol.reference.js'
import { deepFreeze } from '../../utility/deepObjectFreeze.js'
import { mergeNonexistentProperties, mergeOwnNestedProperty } from '../../utility/mergeProperty.js'
import { createSwitchGeneratorFunction, nestedPropertyDelegatedLookup } from '../prototypeMethod.js'
import { executionControl } from '../../utility/generatorExecutionControl.js'
import * as symbol from '../../constructable/Symbol.reference.js'

export const Prototype = {
  [symbol.metadata]: {
    type: Symbol('Constructor functionality'),
  },
  /**
   * constructor
   **/
  [Reference.constructor.setter.list](implementation: Object) {
    return mergeOwnNestedProperty({ target: this, ownProperty: Reference.constructor.list, value: implementation })
  },
  [Reference.constructor.getter.list](implementationKey: String) {
    return nestedPropertyDelegatedLookup({
      target: this,
      directProperty: Reference.constructor.list,
      nestedProperty: implementationKey,
    })
  },
  [Reference.constructor.switch]: createSwitchGeneratorFunction({
    fallbackSymbol: Reference.constructor.fallback,
    implementationListSymbol: Reference.constructor.getter.list,
  }),
  [Reference.constructor.fallback]: Reference.constructor.key.constructable,
  [Reference.constructor.list]: {},
}

/**
 *  Constructor
 */
Prototype[Reference.constructor.setter.list]({
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

  [Reference.constructor.key.prototypeInstance]: function({ data, self = this } = {}) {
    return (
      self::self[Reference.instantiate.switch]()
      |> (g => {
        g.next('intermittent')
        return g.next({
          instanceType: 'object',
        }).value
      })
      |> (instance =>
        self::self[Reference.initialize.switch]()
        |> (g => {
          g.next('intermittent')
          return g.next({
            data: data,
            instanceObject: instance,
          }).value
        }))
    )
  },
})

// prevent accidental manipulation of delegated prototype
// deepFreeze({ object: Prototype, getPropertyImplementation: Object.getOwnPropertySymbols })
