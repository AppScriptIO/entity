import { deepFreeze } from '../utility/deepObjectFreeze.js'

export const Reference = {
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