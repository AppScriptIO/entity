import { deepFreeze } from '../../utility/deepObjectFreeze.js'

export const Reference = {
  // Hold all related objects needed to create a delegation to a specific prototype (e.g. a key may hold `reference` symbols & a functionality `prototype` object)
  prototypeDelegation: {
    functionality: Symbol('prototypeDelegation functionality methods'),
    list: Symbol('prototypeDelegation implementation list'),
  },

  // Responsible for the creation of instances with setting prototype delegation - e.g. instance could be a JS Object or a JS Function.
  instantiate: {
    functionality: Symbol('instantiate functionality methods'),
    list: Symbol('instantiate implementation list'),
    fallback: Symbol('instantiate fallback implementation key'),
  },

  // Responsible for manipulating an instance - e.g. add properties to the instance, change delegation, wrap with proxy to change behavior.
  initialize: {
    functionality: Symbol('initialize functionality methods'),
    list: Symbol('initialize implementation list'),
    fallback: Symbol('initialize fallback implementation key'),
  },
}

// deepFreeze({ object: Reference, getPropertyImplementation: Object.getOwnPropertyNames })
