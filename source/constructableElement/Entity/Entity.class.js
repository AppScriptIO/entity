import { conditionDelegatedLookup } from '../../utility/delegatedLookup.js'
import * as Constructable from '../Constructable/Constructable.class.js'
import * as symbol from '../sharedSymbol.js'

const { class: Class, reference: $ } = new Constructable.clientInterface({ label: 'Entity' })

// reference symbols
Object.assign($, {
  metadata: symbol.metadata,
  // Lookup the prototype chain for an instance that was constructed using a specific class. e.g. usefull in getter the concrete behavior of classes of a target instance (that has the behaviors in it's prototype chain.)
  getInstanceOf: Symbol('Entity:getInstanceOf prototype chian lookup'),
  parameter: Symbol('parameter'), // holds overriding parameters during configured constructable creation.
  key: {
    stateInstance: Symbol('stateInstance'), // `state instance` is the data instance related functionality. i.e. reponsible for managing instances that are used to store state/data.
    concereteBehavior: Symbol('concereteBehavior'), // concerete behaviors are instance implementations (holding a specific algorithm) that extend the target instance through delegation, and initialize the target instance with their own logic
    handleDataInstance: Symbol('handleDataInstance'),
  },
})

// get prototype delegation settings for constructable class functionality - which will be used for creating instances from the CLass
//  constructable delegation setting - prototype that will be used in constructing instances of Entity element. It implements the Constructable functionality with registered implementations.
Class::Class[$.prototypeDelegation.getter](Constructable.$.key.constructableInstance).instancePrototype
  |> (prototype => {
    // set implementations for direct objects created from Entity immediately (Entity functionality.)
    prototype::Class[Constructable.$.prototypeDelegation.setter]({
      [$.key.stateInstance]: {
        instancePrototype: {
          constructor: Class,
          // type Object, usually contains `prototype` protperty
          [$.metadata]: { type: 'Prototype of Entity pattern - on toplevel Entity constructable.' },
          [$.getInstanceOf](Class /*The class that constructed the concerete instance*/, { recursive = false } = {}) {
            // lookup in this for constructor class in prototype chain
            return conditionDelegatedLookup({ target: this /**instance*/, recursive, conditionCheck: prototypeTarget => prototypeTarget.constructor === Class })
          },
        },
      },
    })
    prototype::Class[Constructable.$.initialize.setter](require('./property/initialize'))
    prototype::Class[Constructable.$.constructor.setter](require('./property/constructor'))
    prototype::Class[Constructable.$.clientInterface.setter](require('./property/clientInterface'))
  })

const clientInterface = {
  constructableInstance: Class::Class[Constructable.$.clientInterface.switch](Constructable.$.key.constructableInstance)({ constructorImplementation: Constructable.$.key.constructableInstance }), // client interface for creating sub class instance delegating to the `Entity` & `Constructable` functionality chain.
  stateInstance: Class::Class[Constructable.$.clientInterface.switch]($.key.stateInstance)({ constructorImplementation: $.key.stateInstance }),
}

export { $, Class as class, clientInterface }
