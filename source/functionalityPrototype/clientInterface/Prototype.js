import { Reference } from './Reference.js'
import { mergeOwnNestedProperty } from '../../utility/mergeProperty.js'
import { createSwitchGeneratorFunction, nestedPropertyDelegatedLookup } from '../prototypeMethod.js'
import * as symbol from '../../constructable/Symbol.reference.js'

export const Prototype = {
  [symbol.metadata]: {
    type: Symbol('Client interface functionality'),
  },
  /**
   * clientInterface
   **/
  [Reference.clientInterface.setter.list](implementation: Object) {
    return mergeOwnNestedProperty({ target: this, ownProperty: Reference.clientInterface.list, value: implementation })
  },
  [Reference.clientInterface.getter.list](implementationKey: String) {
    return nestedPropertyDelegatedLookup({ target: this, directProperty: Reference.clientInterface.list, nestedProperty: implementationKey })
  },
  [Reference.clientInterface.switch]: createSwitchGeneratorFunction({ fallbackSymbol: Reference.clientInterface.fallback, implementationListSymbol: Reference.clientInterface.getter.list }),
  [Reference.clientInterface.fallback]: Reference.clientInterface.key.prototypeConstruct,
  [Reference.clientInterface.list]: {},
}

/**
 *  ClientInterface
 */
Prototype[Reference.clientInterface.setter.list]({
  [Reference.clientInterface.key.prototypeConstruct]({ configuredConstructable, self = this, interfaceTarget } = {}) {
    interfaceTarget ||= self
    const proxiedTarget = new Proxy(
      function() {} || interfaceTarget,
      Object.assign({
        apply(target, thisArg, [{ description } = {}]) {
          // TODO: Create constructable for configured constructables creation. wehre adding config will alter the behavior of instance creation.
          let newConfiguredConstructable =
            self[Reference.constructor.switch]({ implementationKey: Reference.constructor.key.configuredConstructable })
            |> (g => {
              g.next('intermittent')
              return g.next({
                description: description,
                initializeFallback: configuredConstructable[Reference.initialize.fallback],
              }).value
            })
          let clientInterface =
            self[Reference.clientInterface.switch]({ implementationKey: Reference.clientInterface.key.prototypeConstruct })
            |> (g => {
              g.next('intermittent')
              return g.next({ configuredConstructable: newConfiguredConstructable }).value
            })
          return clientInterface
        },
        construct(target, argumentList, proxiedTarget) {
          return (
            configuredConstructable::configuredConstructable[Reference.constructor.switch]({
              implementationKey: Reference.constructor.key.prototypeInstance,
            })
            |> (g => {
              g.next('intermittent')
              return g.next({ data: argumentList[0] })
            })
          )
        },
      }),
    )
    return proxiedTarget
  },
  [Reference.clientInterface.key.entityConstruct]({ configuredConstructable, self = this, interfaceTarget } = {}) {
    interfaceTarget ||= self
    const proxiedTarget = new Proxy(
      function() {} || interfaceTarget,
      Object.assign({
        construct(target, [{ description, instanceType, reference, prototypeDelegation }: { instanceType: 'object' | 'function' } = {}], proxiedTarget) {
          return (
            configuredConstructable[Reference.constructor.switch]({ implementationKey: Reference.constructor.key.constructableInstance })
            |> (g => {
              g.next('intermittent')
              return g.next({ description, instanceType, reference, prototypeDelegation }).value
            })
          )
        },
      }),
    )
    return proxiedTarget
  },
})
