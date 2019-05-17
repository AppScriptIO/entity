import * as symbol from './Symbol.reference.js'
import { Prototype, Reference } from '../functionalityPrototype/mergedFunctionality.js'
import { createInstanceWithDelegation, initializeConstructableInstance, rootLevelConstructableInstance } from '../utility/instanceManipulation.js'

export const Constructable = rootLevelConstructableInstance({ description: 'Constructable' }) // construct instance with functionality

export const Entity =
  Prototype[Reference.constructor.switch]({ implementationKey: Reference.constructor.key.constructableInstance })
  |> (g => {
    g.next('intermittent')
    return g.next({ description: 'Entity' }).value
  })

Entity[symbol.reference] |> (_ => Object.assign(_, Reference))
Entity[symbol.prototype] |> (_ => Object.assign(_, Prototype))

// Create client interface
const configuredConstructable =
  Entity[Reference.constructor.switch]({ implementationKey: Reference.constructor.key.constructable })
  |> (g =>
    g.next('intermittent') &&
    g.next({
      description: 'EntityConstructableForClientInterface',
      instantiateFallback: Reference.instantiate.key.prototypeInstance,
      initializeFallback: Reference.initialize.key.constructableInstance,
      instantiateSwitchSymbol: Reference.instantiate.key.prototypeInstance,
      initializeSwitchSymbol: Reference.initialize.key.constructableInstance,
    }).value)

Entity.clientInterface =
  Entity[Entity[symbol.reference].clientInterface.switch]({ implementationKey: Entity[symbol.reference].clientInterface.key.entityConstruct })
  |> (g => g.next('intermittent') && g.next({ configuredConstructable: configuredConstructable }).value)

debugger
