import { deepFreeze } from '../../utility/deepObjectFreeze.js'

export const Reference = {
  clientInterface: {
    functionality: Symbol('clientInterface functionality methods'),
    list: Symbol('clientInterface implementation list'),
    fallback: Symbol('clientInterface fallback implementation key'),
  },
}

// deepFreeze({ object: Reference, getPropertyImplementation: Object.getOwnPropertyNames })
