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
    functionality: Symbol('constructor functionality methods'),
    list: Symbol('constructor implementation list'),
    fallback: Symbol('constructor fallback implementation key'),
  },
}

// deepFreeze({ object: Reference, getPropertyImplementation: Object.getOwnPropertyNames })
