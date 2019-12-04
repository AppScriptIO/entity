import * as Functionality from '../Functionality/Functionality.class.js'
import * as symbol from '../sharedSymbol.js'

const { instance: functionality, reference: $ } = Functionality.Constructor() // create object with merged functionality

// Constructable class symbols
Object.assign($, {
  label: Symbol('label'), // own class name
  class: Symbol('class'), // the constructable used to create the instance (to which class does it belong).
  reference: '$', // reference key to be set on the class for short access to `prototypeDelegation.reference`.
  metadata: symbol.metadata,
  parameter: Symbol('parameter'), // holds overriding parameters during configured constructable creation.
  // key - built-in implementations keys.
  key: {
    classInstance: Symbol('classInstance'), // class instance related
    constructableInstance: Symbol('constructableInstance'), // Constructable related
  },
})

/*
Creation of Constructable class relies on functionality from it's own prototype. Therefore defining functionality implementations comes before the class creation. 
Another way could be - using the imported functionalities as their own separate prototype, but this will create Constructable in another level in the delegation chain, which is not needed.
*/
functionality::functionality[$.prototypeDelegation.setter]({
  // objects that will be used in creation of the main Contructable class.
  [$.key.constructableInstance]: { instancePrototype: functionality, referencePrototype: $ },
})
functionality::functionality[$.instantiate.setter](require('./property/instantiate'))
functionality::functionality[$.initialize.setter](require('./property/initialize'))
functionality::functionality[$.constructor.setter](require('./property/constructor'))
functionality::functionality[$.clientInterface.setter](require('./property/clientInterface'))

/* 
  Running `constructableInstance` constructor will create an instance using the `constructableInstance` delegationPrototype settings set on the caller (functionality).
  And will also set a new delegationPrototype setting for the created instance. i.e. the new delegation setting will point to objects delegating to the previous one.
*/
const Class = functionality::functionality[$.constructor.switch]($.key.constructableInstance)({}, { label: 'Constructable' })

const clientInterface = Class::Class[$.clientInterface.switch]($.key.constructableInstance)({ constructorImplementation: $.key.constructableInstance })

export { $, Class as class, clientInterface }
