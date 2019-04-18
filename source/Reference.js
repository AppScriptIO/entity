import { deepFreeze } from './utility/deepObjectFreeze.js'

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
      list: Symbol('Entity:prototypeDelegation.setter.list'),
    },
    getter: {
      list: Symbol('Entity:prototypeDelegation.getter.list'),
    },
    list: Symbol('Entity:prototypeDelegation.list'),
    key: {
      entityPrototype: Symbol('Entity:prototypeDelegation.key.entityPrototype'),
      entityClass: Symbol('Entity:prototypeDelegation.key.entityClass'),
    },
  },

  instance: {
    instantiate: {
      switch: Symbol('Entity:instance.instantiate.switch'),
      setter: {
        list: Symbol('Entity:instance.instantiate.setter.list'),
      },
      getter: {
        list: Symbol('Entity:instance.instantiate.getter.list'),
      },
      fallback: Symbol('Entity:instance.instantiate.fallback'),
      list: Symbol('Entity:instance.instantiate.list'),
      key: {
        prototype: Symbol('Entity:instance.instantiate.key.prototype'),
        prototypeInstance: Symbol('Entity:instance.instantiate.key.prototypeInstance'),
        entityInstance: Symbol('Entity:instance.instantiate.key.entityInstance'),
        configuredConstructableInstance: Symbol('Entity:instance.instantiate.key.configuredConstructableInstance'),
      },
    },
    initialize: {
      switch: Symbol('Entity:instance.initialize.switch'),
      setter: {
        list: Symbol('Entity:instance.initialize.setter.list'),
      },
      getter: {
        list: Symbol('Entity:instance.initialize.getter.list'),
      },
      fallback: Symbol('Entity:instance.initialize.fallback'),
      list: Symbol('Entity:instance.initialize.list'),
      key: {
        data: Symbol('Entity:instance.initialize.key.data'),
        entityInstance: Symbol('Entity:instance.initialize.key.entityInstance'),
        toplevelEntityInstance: Symbol('Entity:instance.initialize.key.toplevelEntityInstance'),
        configurableConstructor: Symbol('Entity:instance.initialize.key.configurableConstructor'),
      },
    },
  },

  // Constructor combines instantiation, prototypeDelegation, & initialization
  constructor: {
    switch: Symbol('Entity:constructor.switch'),
    setter: {
      list: Symbol('Entity:constructor.setter.list'),
    },
    getter: {
      list: Symbol('Entity:constructor.getter.list'),
    },
    fallback: Symbol('Entity:constructor.fallback'),
    list: Symbol('Entity:constructor.list'),
    key: {
      constructable: Symbol('Entity:constructor.key.constructable'),
      toplevelConstructable: Symbol('Entity:constructor.key.toplevelConstructable'),
      configuredConstructable: Symbol('Entity:constructor.key.configuredConstructable'),
    },
  },

  clientInterface: {
    switch: Symbol('Entity:clientInterface.switch'),
    setter: {
      list: Symbol('Entity:clientInterface.setter.list'),
    },
    getter: {
      list: Symbol('Entity:clientInterface.getter.list'),
    },
    fallback: Symbol('Entity:clientInterface.fallback'),
    list: Symbol('Entity:clientInterface.list'),
    key: {
      prototypeConstruct: Symbol('Entity:clientInterface.key.prototypeConstruct'),
      entityConstruct: Symbol('Entity:clientInterface.key.entityConstruct'),
      // toplevelEntityConstruct: Symbol('Entity:clientInterface.key.toplevelEntityConstruct'),
    },
  },
}

deepFreeze({ object: Reference, getPropertyImplementation: Object.getOwnPropertyNames })
