import { deepFreeze } from '../../utility/deepObjectFreeze.js'

/**
 * ProgrammaticAPIReference for the target extedning object to use. Entity api reference
 * switch - function that redirects to an implementation.
 * list - object holding the implementations.
 * key - built-in implementations keys.
 * getter/setter - functions for implementation lookup and addition.
 **/
export const Reference = {
  // Constructor combines instantiation, prototypeDelegation, & initialization
  constructor: {
    switch: Symbol('Funtionality:constructor.switch'),
    setter: {
      list: Symbol('Funtionality:constructor.setter.list'),
    },
    getter: {
      list: Symbol('Funtionality:constructor.getter.list'),
    },
    fallback: Symbol('Funtionality:constructor.fallback'),
    list: Symbol('Funtionality:constructor.list'),
  },
}

Reference.constructor.key = {
  constructable: Symbol('Funtionality:constructor.key.constructable'),
  toplevelConstructable: Symbol('Funtionality:constructor.key.toplevelConstructable'),
  configuredConstructable: Symbol('Funtionality:constructor.key.configuredConstructable'),
  configuredConstructableForToplevelConstructable: Symbol('Funtionality:constructor.key.configuredConstructableForToplevelEntity'),
  constructableInstance: Symbol('Funtionality:constructor.key.constructableInstance'),
  prototypeInstance: Symbol('Funtionality:constructor.key.prototypeInstance'),
}

deepFreeze({ object: Reference, getPropertyImplementation: Object.getOwnPropertyNames })
