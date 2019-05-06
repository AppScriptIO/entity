import { deepFreeze } from '../utility/deepObjectFreeze.js'

/**
 * ProgrammaticAPIReference for the target extedning object to use. Entity api reference
 * switch - function that redirects to an implementation.
 * list - object holding the implementations.
 * key - built-in implementations keys.
 * getter/setter - functions for implementation lookup and addition.
 **/
export const Reference = {
  prototypeDelegation: {
    setter: {
      list: Symbol('Constructable:prototypeDelegation.setter.list'),
    },
    getter: {
      list: Symbol('Constructable:prototypeDelegation.getter.list'),
    },
    list: Symbol('Constructable:prototypeDelegation.list'),
    key: {
      entityPrototype: Symbol('Constructable:prototypeDelegation.key.entityPrototype'),
      entityClass: Symbol('Constructable:prototypeDelegation.key.entityClass'),
    },
  },

  instantiate: {
    switch: Symbol('Constructable:instantiate.switch'),
    setter: {
      list: Symbol('Constructable:instantiate.setter.list'),
    },
    getter: {
      list: Symbol('Constructable:instantiate.getter.list'),
    },
    fallback: Symbol('Constructable:instantiate.fallback'),
    list: Symbol('Constructable:instantiate.list'),
    key: {
      prototype: Symbol('Constructable:instantiate.key.prototype'),
      prototypeInstance: Symbol('Constructable:instantiate.key.prototypeInstance'),
      configuredConstructableInstance: Symbol('Constructable:instantiate.key.configuredConstructableInstance'),
    },
  },

  initialize: {
    switch: Symbol('Constructable:initialize.switch'),
    setter: {
      list: Symbol('Constructable:initialize.setter.list'),
    },
    getter: {
      list: Symbol('Constructable:initialize.getter.list'),
    },
    fallback: Symbol('Constructable:initialize.fallback'),
    list: Symbol('Constructable:initialize.list'),
    key: {
      data: Symbol('Constructable:initialize.key.data'),
      constructableInstance: Symbol('Constructable:initialize.key.constructableInstance'),
      configuredConstructor: Symbol('Constructable:initialize.key.configuredConstructor'),
    },
  },

  // Constructor combines instantiation, prototypeDelegation, & initialization
  constructor: {
    switch: Symbol('Constructable:constructor.switch'),
    setter: {
      list: Symbol('Constructable:constructor.setter.list'),
    },
    getter: {
      list: Symbol('Constructable:constructor.getter.list'),
    },
    fallback: Symbol('Constructable:constructor.fallback'),
    list: Symbol('Constructable:constructor.list'),
    key: {
      constructable: Symbol('Constructable:constructor.key.constructable'),
      toplevelConstructable: Symbol('Constructable:constructor.key.toplevelConstructable'),
      configuredConstructable: Symbol('Constructable:constructor.key.configuredConstructable'),
      configuredConstructableForToplevelConstructable: Symbol('Constructable:constructor.key.configuredConstructableForToplevelEntity'),
      constructableInstance: Symbol('Constructable:constructor.key.constructableInstance'),
      prototypeInstance: Symbol('Constructable:constructor.key.prototypeInstance'),
    },
  },
}

deepFreeze({ object: Reference, getPropertyImplementation: Object.getOwnPropertyNames })
