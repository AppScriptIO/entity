import { conditionDelegatedLookup } from '../../utility/delegatedLookup.js'
import * as Constructable from '../Constructable/Constructable.class.js'
import * as symbol from '../sharedSymbol.js'

// `constructablePrototype` = prototype that will be used in constructing instances of Entity element. It implements the Constructable functionality with registered implementations.
const { class: Class, reference: $, constructablePrototype } = new Constructable.clientInterface({ description: 'Entity' })

// reference symbols
Object.assign($, {
  metadata: symbol.metadata,
  // Lookup the prototype chain for an instance that was constructed using a specific class. e.g. usefull in getter the concrete behavior of classes of a target instance (that has the behaviors in it's prototype chain.)
  getInstanceOf: Symbol('Entity:getInstanceOf prototype chian lookup'),
  key: {
    concereteBehavior: Symbol('Concerete Behavior / Implementation'), // concerete behaviors are instance implementations (holding a specific algorithm) that extend the target instance through delegation, and initialize the target instance with their own logic
    handleDataInstance: Symbol('handleDataInstance'),
    entityClass: Symbol('entity class related'),
    prototypeForInstance: Symbol('prototype delegation object creation for Entity instances.'),
    entityInstance: Symbol('Entity instance related'),
    instanceDelegatingToEntityInstancePrototype: Symbol('instanceDelegatingToEntityInstancePrototype'),
  },
})

// set implementations for direct objects created from Entity immediately (Entity functionality.)
constructablePrototype::Class[Constructable.$.prototypeDelegation.setter]({
  [$.key.entityInstance]: {
    prototype: {
      // type Object, usually contains `prototype` protperty
      [$.metadata]: { type: 'Prototype of Entity pattern - on toplevel Entity constructable.' },
      [$.getInstanceOf](Class /*The class that constructed the concerete instance*/, callerInstance = this) {
        console.log(callerInstance)
        // lookup in this for constructor class in prototype chain
        return conditionDelegatedLookup({ target: callerInstance, conditionCheck: prototypeTarget => prototypeTarget.constructor === Class })
      },
    },
  },
})
constructablePrototype::Class[Constructable.$.initialize.setter](require('./property/initialize'))
constructablePrototype::Class[Constructable.$.constructor.setter](require('./property/constructor'))
constructablePrototype::Class[Constructable.$.clientInterface.setter](require('./property/clientInterface'))

// client interface for creating sub class instance delegating to the `Entity` & `Constructable` functionality chain.
const clientInterface = Class::Constructable.Class[Constructable.$.clientInterface.switch]($.key.entityClass)({})

export { $, Class, clientInterface }
