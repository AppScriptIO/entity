import { deepFreeze } from '../../utility/deepObjectFreeze.js'

export const Reference = {
  // Hold all related objects needed to create a delegation to a specific prototype (e.g. a key may hold `reference` symbols & a functionality `prototype` object)
  prototypeDelegation: {
    list: Symbol('Funtionality:prototypeDelegation.list'),
    setter: {
      list: Symbol('Funtionality:prototypeDelegation.setter.list'),
    },
    getter: {
      list: Symbol('Funtionality:prototypeDelegation.getter.list'),
    },
  },

  // Responsible for the creation of instances with setting prototype delegation - e.g. instance could be a JS Object or a JS Function.
  instantiate: {
    switch: Symbol('Funtionality:instantiate.switch'),
    fallback: Symbol('Funtionality:instantiate.fallback'),
    list: Symbol('Funtionality:instantiate.list'),
    setter: {
      list: Symbol('Funtionality:instantiate.setter.list'),
    },
    getter: {
      list: Symbol('Funtionality:instantiate.getter.list'),
    },
  },

  // Responsible for manipulating an instance - e.g. add properties to the instance, change delegation, wrap with proxy to change behavior.
  initialize: {
    switch: Symbol('Funtionality:initialize.switch'),
    fallback: Symbol('Funtionality:initialize.fallback'),
    list: Symbol('Funtionality:initialize.list'),
    setter: {
      list: Symbol('Funtionality:initialize.setter.list'),
    },
    getter: {
      list: Symbol('Funtionality:initialize.getter.list'),
    },
  },
}

// deepFreeze({ object: Reference, getPropertyImplementation: Object.getOwnPropertyNames })
