import { deepFreeze } from '../../utility/deepObjectFreeze.js'

export const Reference = {
  clientInterface: {
    switch: Symbol('Funtionality:clientInterface.switch'),
    fallback: Symbol('Funtionality:clientInterface.fallback'),
    list: Symbol('Funtionality:clientInterface.list'),
    setter: {
      list: Symbol('Funtionality:clientInterface.setter.list'),
    },
    getter: {
      list: Symbol('Funtionality:clientInterface.getter.list'),
    },
  },
}

// deepFreeze({ object: Reference, getPropertyImplementation: Object.getOwnPropertyNames })
