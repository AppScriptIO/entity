import { deepFreeze } from '../../utility/deepObjectFreeze.js'

export const Reference = {
  clientInterface: {
    switch: Symbol('Funtionality:clientInterface.switch'),
    setter: {
      list: Symbol('Funtionality:clientInterface.setter.list'),
    },
    getter: {
      list: Symbol('Funtionality:clientInterface.getter.list'),
    },
    fallback: Symbol('Funtionality:clientInterface.fallback'),
    list: Symbol('Funtionality:clientInterface.list'),
  },
}

Reference.clientInterface.key = {
  prototypeConstruct: Symbol('Funtionality:clientInterface.key.prototypeConstruct'),
  entityConstruct: Symbol('Funtionality:clientInterface.key.entityConstruct'),
  // toplevelEntityConstruct: Symbol('Funtionality:clientInterface.key.toplevelEntityConstruct'),
}

deepFreeze({ object: Reference, getPropertyImplementation: Object.getOwnPropertyNames })
