import { Reference } from './Reference.js'
import { deepFreeze } from '../../utility/deepObjectFreeze.js'
import { createSwitchGeneratorFunction, nestedPropertyDelegatedLookupCurried, mergeOwnNestedPropertyCurried } from '../prototypeMethod.js'
import * as symbol from '../Symbol.reference.js'

export const Prototype = {
  // [symbol.metadata]: { type: Symbol('Instantiate & Initialize functionality') },
  /*
                     _        _                    ____       _                  _   _             
     _ __  _ __ ___ | |_ ___ | |_ _   _ _ __   ___|  _ \  ___| | ___  __ _  __ _| |_(_) ___  _ __  
    | '_ \| '__/ _ \| __/ _ \| __| | | | '_ \ / _ \ | | |/ _ \ |/ _ \/ _` |/ _` | __| |/ _ \| '_ \ 
    | |_) | | | (_) | || (_) | |_| |_| | |_) |  __/ |_| |  __/ |  __/ (_| | (_| | |_| | (_) | | | |
    | .__/|_|  \___/ \__\___/ \__|\__, | .__/ \___|____/ \___|_|\___|\__, |\__,_|\__|_|\___/|_| |_|
    |_|                           |___/|_|                           |___/                         
*/
  [Reference.prototypeDelegation.functionality]: {
    setter: mergeOwnNestedPropertyCurried({ property: Reference.prototypeDelegation.list }),
    getter: nestedPropertyDelegatedLookupCurried({ baseProperty: Reference.prototypeDelegation.list }),
  },
  [Reference.prototypeDelegation.list]: {},

  /*
     _           _              _   _       _       
    (_)_ __  ___| |_ __ _ _ __ | |_(_) __ _| |_ ___ 
    | | '_ \/ __| __/ _` | '_ \| __| |/ _` | __/ _ \
    | | | | \__ \ || (_| | | | | |_| | (_| | ||  __/
    |_|_| |_|___/\__\__,_|_| |_|\__|_|\__,_|\__\___|
*/
  [Reference.instantiate.functionality]: {
    setter: mergeOwnNestedPropertyCurried({ property: Reference.instantiate.list }),
    getter: nestedPropertyDelegatedLookupCurried({ baseProperty: Reference.instantiate.list }),
    switch: createSwitchGeneratorFunction({ fallbackPropertyPath: Reference.instantiate.fallback, implementationGetterPropertyPath: [Reference.instantiate.functionality, 'getter'] }),
  },
  [Reference.instantiate.list]: {},
  [Reference.instantiate.fallback]: undefined,

  /*
     _       _ _   _       _ _         
    (_)_ __ (_) |_(_) __ _| (_)_______ 
    | | '_ \| | __| |/ _` | | |_  / _ \
    | | | | | | |_| | (_| | | |/ /  __/
    |_|_| |_|_|\__|_|\__,_|_|_/___\___|
*/
  [Reference.initialize.functionality]: {
    setter: mergeOwnNestedPropertyCurried({ property: Reference.initialize.list }),
    getter: nestedPropertyDelegatedLookupCurried({ baseProperty: Reference.initialize.list }),
    switch: createSwitchGeneratorFunction({ fallbackPropertyPath: Reference.initialize.fallback, implementationGetterPropertyPath: [Reference.initialize.functionality, 'getter'] }),
  },
  [Reference.initialize.list]: {},
  [Reference.initialize.fallback]: undefined,
}
