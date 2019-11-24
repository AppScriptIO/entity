import * as Functionality from '../Functionality/Functionality.class.js'
import * as symbol from '../sharedSymbol.js'

// Constructable class symbols
export const $ = {
  name: Symbol('Own class name'), // own class name
  class: Symbol('class'), // the constructable used to create the instance (to which class does it belong).
  reference: 'reference', // reference key to be set on the class for short access to `prototypeDelegation.reference`.
  metadata: symbol.metadata,
  // key - built-in implementations keys.
  key: {
    createObjectWithDelegation: Symbol('createObjectWithDelegation'),
    classInstance: Symbol('class instance related'), // set constructor.
    configuredClass: Symbol('Configured class/constructable related'), // an instance that delegates to static class and holds default paramerts to be used on call.
    constructableClass: Symbol('Constructable related'),
  },
}

const functionality = Functionality.Constructor({ reference: $ }) // create object with merged functionality
/*
Creation of Constructable class relies on functionality from it's own prototype. Therefore defining functionality implementations comes before the class creation. 
Another way could be - using the imported functionalities as their own separate prototype, but this will create Constructable in another level in the delegation chain, which is not needed.
*/
functionality::functionality[$.prototypeDelegation.setter]({
  [$.key.constructableClass]: { prototype: functionality, reference: $ },
})
functionality::functionality[$.instantiate.setter](require('./property/instantiate'))
functionality::functionality[$.initialize.setter](require('./property/initialize'))
functionality::functionality[$.constructor.setter](require('./property/constructor'))
functionality::functionality[$.clientInterface.setter](require('./property/clientInterface'))

/* Passing prototype & reference will prevent creation of another prototype chain level. */
export const Class = functionality::functionality[$.constructor.switch]($.key.constructableClass)({ description: 'Constructable', reference: $, prototype: functionality })

export const clientInterface = Class::Class[$.clientInterface.switch]($.key.constructableClass)({ constructorImplementation: $.key.constructableClass })
