import { Constructable } from './Constructable.class.js'
const { symbol } = Constructable

let configuredConstructable = Constructable.clientInterface({ parameter: [] })
export const Entity = new configuredConstructable({ description: 'Entity' })

const Reference = Entity[symbol.reference]
const Prototype = Entity[symbol.prototype]

/*
                   _        _                    ____       _                  _   _             
   _ __  _ __ ___ | |_ ___ | |_ _   _ _ __   ___|  _ \  ___| | ___  __ _  __ _| |_(_) ___  _ __  
  | '_ \| '__/ _ \| __/ _ \| __| | | | '_ \ / _ \ | | |/ _ \ |/ _ \/ _` |/ _` | __| |/ _ \| '_ \ 
  | |_) | | | (_) | || (_) | |_| |_| | |_) |  __/ |_| |  __/ |  __/ (_| | (_| | |_| | (_) | | | |
  | .__/|_|  \___/ \__\___/ \__|\__, | .__/ \___|____/ \___|_|\___|\__, |\__,_|\__|_|\___/|_| |_|
  |_|                           |___/|_|                           |___/                         
*/
Reference.prototypeDelegation = {
  key: {
    // entityPrototype: Symbol('Funtionality:prototypeDelegation.key.entityPrototype'),
    // entityClass: Symbol('Funtionality:prototypeDelegation.key.entityClass'),
  },
}
Prototype[Constructable[symbol.reference].prototypeDelegation.setter.list]({})

/*
   ___           _              _   _       _       
  |_ _|_ __  ___| |_ __ _ _ __ | |_(_) __ _| |_ ___ 
   | || '_ \/ __| __/ _` | '_ \| __| |/ _` | __/ _ \
   | || | | \__ \ || (_| | | | | |_| | (_| | ||  __/
  |___|_| |_|___/\__\__,_|_| |_|\__|_|\__,_|\__\___|
*/
Prototype[Constructable[symbol.reference].instantiate.setter.list]({})

/*
    ___       _ _   _       _ _         
  |_ _|_ __ (_) |_(_) __ _| (_)_______ 
    | || '_ \| | __| |/ _` | | |_  / _ \
    | || | | | | |_| | (_| | | |/ /  __/
  |___|_| |_|_|\__|_|\__,_|_|_/___\___|
*/
Reference.initialize = {
  key: {
    // merge data into instance properties
    data: Symbol('Funtionality:initialize.key.data'),
  },
}
Prototype[Constructable[symbol.reference].initialize.setter.list]({
  [Reference.initialize.key.data]({ data, instanceObject, self = this }: { data: Object } = {}) {
    Object.assign(instanceObject, data) // apply data to instance
    return instanceObject
  },
})

/*
    ____                _                   _             
   / ___|___  _ __  ___| |_ _ __ _   _  ___| |_ ___  _ __ 
  | |   / _ \| '_ \/ __| __| '__| | | |/ __| __/ _ \| '__|
  | |__| (_) | | | \__ \ |_| |  | |_| | (__| || (_) | |   
   \____\___/|_| |_|___/\__|_|   \__,_|\___|\__\___/|_|   
*/
Prototype[Constructable[symbol.reference].constructor.setter.list]({})

/*
    ____ _ _            _   ___       _             __                
   / ___| (_) ___ _ __ | |_|_ _|_ __ | |_ ___ _ __ / _| __ _  ___ ___ 
  | |   | | |/ _ \ '_ \| __|| || '_ \| __/ _ \ '__| |_ / _` |/ __/ _ \
  | |___| | |  __/ | | | |_ | || | | | ||  __/ |  |  _| (_| | (_|  __/
   \____|_|_|\___|_| |_|\__|___|_| |_|\__\___|_|  |_|  \__,_|\___\___|
*/
Reference.clientInterface = {
  key: {},
}
Prototype[Constructable[symbol.reference].clientInterface.setter.list]({})

Entity.clientInterface =
  Entity[Constructable[symbol.reference].clientInterface.switch]({ implementationKey: Constructable[symbol.reference].clientInterface.key.constructable })
  |> (g => g.next('intermittent') && g.next().value)
