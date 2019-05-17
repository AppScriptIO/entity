import { deepFreeze } from '../../utility/deepObjectFreeze.js'

export const Reference = {
  prototypeDelegation: {
    setter: {
      list: Symbol('Funtionality:prototypeDelegation.setter.list'),
    },
    getter: {
      list: Symbol('Funtionality:prototypeDelegation.getter.list'),
    },
    list: Symbol('Funtionality:prototypeDelegation.list'),
  },

  instantiate: {
    switch: Symbol('Funtionality:instantiate.switch'),
    setter: {
      list: Symbol('Funtionality:instantiate.setter.list'),
    },
    getter: {
      list: Symbol('Funtionality:instantiate.getter.list'),
    },
    fallback: Symbol('Funtionality:instantiate.fallback'),
    list: Symbol('Funtionality:instantiate.list'),
  },

  initialize: {
    switch: Symbol('Funtionality:initialize.switch'),
    setter: {
      list: Symbol('Funtionality:initialize.setter.list'),
    },
    getter: {
      list: Symbol('Funtionality:initialize.getter.list'),
    },
    fallback: Symbol('Funtionality:initialize.fallback'),
    list: Symbol('Funtionality:initialize.list'),
  },
}

Reference.prototypeDelegation.key = {
  entityPrototype: Symbol('Funtionality:prototypeDelegation.key.entityPrototype'),
  entityClass: Symbol('Funtionality:prototypeDelegation.key.entityClass'),
}

Reference.instantiate.key = {
  prototype: Symbol('Funtionality:instantiate.key.prototype'),
  prototypeInstance: Symbol('Funtionality:instantiate.key.prototypeInstance'),
  configuredConstructableInstance: Symbol('Funtionality:instantiate.key.configuredConstructableInstance'),
}

Reference.initialize.key = {
  data: Symbol('Funtionality:initialize.key.data'),
  constructableInstance: Symbol('Funtionality:initialize.key.constructableInstance'),
  configuredConstructor: Symbol('Funtionality:initialize.key.configuredConstructor'),
}

deepFreeze({ object: Reference, getPropertyImplementation: Object.getOwnPropertyNames })
