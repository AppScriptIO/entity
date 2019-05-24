import { Reference } from './Reference.js'
import { deepFreeze } from '../../utility/deepObjectFreeze.js'
import { mergeNonexistentProperties, mergeOwnNestedProperty } from '../../utility/mergeProperty.js'
import { createSwitchGeneratorFunction, nestedPropertyDelegatedLookupAdapter } from '../prototypeMethod.js'
import * as symbol from '../Symbol.reference.js'

export const Prototype = {
  [symbol.metadata]: {
    type: Symbol('Instantiate & Initialize functionality'),
  },
  /*
                     _        _                    ____       _                  _   _             
     _ __  _ __ ___ | |_ ___ | |_ _   _ _ __   ___|  _ \  ___| | ___  __ _  __ _| |_(_) ___  _ __  
    | '_ \| '__/ _ \| __/ _ \| __| | | | '_ \ / _ \ | | |/ _ \ |/ _ \/ _` |/ _` | __| |/ _ \| '_ \ 
    | |_) | | | (_) | || (_) | |_| |_| | |_) |  __/ |_| |  __/ |  __/ (_| | (_| | |_| | (_) | | | |
    | .__/|_|  \___/ \__\___/ \__|\__, | .__/ \___|____/ \___|_|\___|\__, |\__,_|\__|_|\___/|_| |_|
    |_|                           |___/|_|                           |___/                         
*/
  [Reference.prototypeDelegation.setter.list](implementation: Object) {
    return mergeOwnNestedProperty({
      target: this,
      ownProperty: Reference.prototypeDelegation.list,
      value: implementation,
    })
  },
  [Reference.prototypeDelegation.getter.list]: nestedPropertyDelegatedLookupAdapter({ baseProperty: Reference.prototypeDelegation.list }),
  [Reference.prototypeDelegation.list]: {},

  /*
     _           _              _   _       _       
    (_)_ __  ___| |_ __ _ _ __ | |_(_) __ _| |_ ___ 
    | | '_ \/ __| __/ _` | '_ \| __| |/ _` | __/ _ \
    | | | | \__ \ || (_| | | | | |_| | (_| | ||  __/
    |_|_| |_|___/\__\__,_|_| |_|\__|_|\__,_|\__\___|
*/
  [Reference.instantiate.setter.list](implementation: Object) {
    return mergeOwnNestedProperty({ target: this, ownProperty: Reference.instantiate.list, value: implementation })
  },
  [Reference.instantiate.getter.list]: nestedPropertyDelegatedLookupAdapter({ baseProperty: Reference.instantiate.list }),
  [Reference.instantiate.switch]: createSwitchGeneratorFunction({
    fallbackSymbol: Reference.instantiate.fallback,
    implementationGetterSymbol: Reference.instantiate.getter.list,
  }),
  [Reference.instantiate.list]: {},

  /*
     _       _ _   _       _ _         
    (_)_ __ (_) |_(_) __ _| (_)_______ 
    | | '_ \| | __| |/ _` | | |_  / _ \
    | | | | | | |_| | (_| | | |/ /  __/
    |_|_| |_|_|\__|_|\__,_|_|_/___\___|
*/
  [Reference.initialize.setter.list](implementation: Object) {
    return mergeOwnNestedProperty({ target: this, ownProperty: Reference.initialize.list, value: implementation })
  },
  [Reference.initialize.getter.list]: nestedPropertyDelegatedLookupAdapter({ baseProperty: Reference.initialize.list }),
  [Reference.initialize.switch]: createSwitchGeneratorFunction({
    fallbackSymbol: Reference.initialize.fallback,
    implementationGetterSymbol: Reference.initialize.getter.list,
  }),
  [Reference.initialize.list]: {},
}
