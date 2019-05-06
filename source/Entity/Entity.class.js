// require('@dependency/javascriptTestRunner').subprocessInspector()

import * as symbol from '../Symbol.constant.js'
import { Reference } from './Reference.js'
import { Prototype } from './Prototype.js'
import { Constructable } from '../Constructable/Constructable.class.js'

export const Entity =
  Constructable[Constructable[symbol.reference].constructor.switch]({ implementationKey: Constructable[symbol.reference].constructor.key.constructableInstance })
  |> (g => {
    g.next('intermittent')
    return g.next({ description: 'Entity' }).value
  })

Entity[symbol.reference] |> (_ => Object.assign(_, Reference))
Entity[symbol.prototype] |> (_ => Object.assign(_, Prototype))

/**
 *  prototypeDelegation
 */
Entity[symbol.prototype][Constructable[symbol.reference].prototypeDelegation.setter.list]({})

/**
 *  Instantiate
 */
Entity[symbol.prototype][Constructable[symbol.reference].instantiate.setter.list]({})

/**
 *  Initialize
 */
Entity[symbol.prototype][Constructable[symbol.reference].initialize.setter.list]({
  [Constructable[symbol.reference].initialize.key.data]({ data, instanceObject, self = this }: { data: Object } = {}) {
    Object.assign(instanceObject, data) // apply data to instance
    return instanceObject
  },
})

/**
 *  Constructor
 */
Entity[symbol.prototype][Constructable[symbol.reference].constructor.setter.list]({
  [Constructable[symbol.reference].constructor.key.prototypeInstance]: function({ data, self = this } = {}) {
    return (
      self::self[Constructable[symbol.reference].instantiate.switch]()
      |> (g => {
        g.next('intermittent')
        return g.next({
          instanceType: 'object',
        }).value
      })
      |> (instance =>
        self::self[Constructable[symbol.reference].initialize.switch]()
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

/**
 *  ClientInterface
 */
Entity[symbol.prototype][Entity[symbol.reference].clientInterface.setter.list]({
  [Entity[symbol.reference].clientInterface.key.prototypeConstruct]({ configuredConstructable, self = this, interfaceTarget } = {}) {
    interfaceTarget ||= self
    const proxiedTarget = new Proxy(
      function() {} || interfaceTarget,
      Object.assign({
        apply(target, thisArg, [{ description } = {}]) {
          // TODO: Create constructable for configured constructables creation. wehre adding config will alter the behavior of instance creation.
          let newConfiguredConstructable =
            self[Constructable[symbol.reference].constructor.switch]({ implementationKey: Constructable[symbol.reference].constructor.key.configuredConstructable })
            |> (g => {
              g.next('intermittent')
              return g.next({
                description: description,
                initializeFallback: configuredConstructable[Constructable[symbol.reference].initialize.fallback],
              }).value
            })
          let clientInterface =
            self[Entity[symbol.reference].clientInterface.switch]({ implementationKey: Entity[symbol.reference].clientInterface.key.prototypeConstruct })
            |> (g => {
              g.next('intermittent')
              return g.next({ configuredConstructable: newConfiguredConstructable }).value
            })
          return clientInterface
        },
        construct(target, argumentList, proxiedTarget) {
          return (
            configuredConstructable::configuredConstructable[Constructable[symbol.reference].constructor.switch]({
              implementationKey: Constructable[symbol.reference].constructor.key.prototypeInstance,
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
  [Entity[symbol.reference].clientInterface.key.entityConstruct]({ configuredConstructable, self = this, interfaceTarget } = {}) {
    interfaceTarget ||= self
    const proxiedTarget = new Proxy(
      function() {} || interfaceTarget,
      Object.assign({
        construct(target, [{ description, instanceType, reference, prototypeDelegation }: { instanceType: 'object' | 'function' } = {}], proxiedTarget) {
          return (
            configuredConstructable[Constructable[symbol.reference].constructor.switch]({ implementationKey: Constructable[symbol.reference].constructor.key.constructableInstance })
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

// Create client interface
const configuredConstructable =
  Entity[Constructable[symbol.reference].constructor.switch]({ implementationKey: Constructable[symbol.reference].constructor.key.constructable })
  |> (g =>
    g.next('intermittent') &&
    g.next({
      description: 'EntityConstructableForClientInterface',
      instantiateFallback: Constructable[symbol.reference].instantiate.key.prototypeInstance,
      initializeFallback: Constructable[symbol.reference].initialize.key.constructableInstance,
      instantiateSwitchSymbol: Constructable[symbol.reference].instantiate.key.prototypeInstance,
      initializeSwitchSymbol: Constructable[symbol.reference].initialize.key.constructableInstance,
    }).value)

Entity.clientInterface =
  Entity[Entity[symbol.reference].clientInterface.switch]({ implementationKey: Entity[symbol.reference].clientInterface.key.entityConstruct })
  |> (g => g.next('intermittent') && g.next({ configuredConstructable: configuredConstructable }).value)
