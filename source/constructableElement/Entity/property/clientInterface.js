import { $ } from '../Entity.class.js'
import { mergeArrayWithObjectItem } from '../../../utility/mergeProperty.js'
import * as Constructable from '../../Constructable/Constructable.class.js'

module.exports = {
  // create an entity class that has follows that Entity pattern to create instances with custom prototype chains.
  [$.key.entityClass]({} = {}, { callerClass = this } = {}) {
    return new Proxy(function() {}, {
      construct(target, argumentList, proxiedTarget) {
        if (callerClass.parameter) mergeArrayWithObjectItem({ listTarget: argumentList, listDefault: callerClass.parameter }) // in case configured constructable which holds default parameter values.
        let instance = callerClass::Constructable[$.constructor.switch]($.key.entityClass)(...argumentList)
        return {
          class: instance,
          reference: instance[Constructable.$.reference],
          constructablePrototype: instance::Constructable.Class[Constructable.$.prototypeDelegation.getter](Constructable.$.key.constructableClass).prototype,
          entityPrototype: instance::Constructable.Class[Constructable.$.prototypeDelegation.getter]($.key.entityInstance).prototype,
        }
      },
      apply(target, thisArg, [{ description, parameter = [] } = {}]) {
        let constructable = callerClass::callerClass[$.constructor.switch]($.key.classInstance)({ description: description || 'Configured Class.' })
        constructable.parameter = parameter
        return constructable::Constructable[$.clientInterface.switch]($.key.entityClass)()
      },
    })
  },

  // Entity instance relating to prototype chain with functionality specific to the implementer class (sub class, e.g. Graph Element)
  // create an instance using entity defined prototype and innitialization functions. Used by Entity classes to create an interface for their class.
  [$.key.instanceDelegatingToEntityInstancePrototype]({ constructorImplementation } = {}, { callerClass = this } = {}) {
    if (!constructorImplementation) throw new Error('• Parameter `constructorImplementation` must be passed.')
    return new Proxy(function() {}, {
      construct(target, argumentList, proxiedTarget) {
        argumentList[0] = { data: argumentList[0] }
        if (callerClass.parameter) mergeArrayWithObjectItem({ listTarget: argumentList, listDefault: callerClass.parameter }) // in case configured constructable which holds default parameter values.
        return callerClass::Constructable.Class[Constructable.$.constructor.switch](constructorImplementation)(...argumentList)
      },
      apply(target, thisArg, [{ description, parameter = [] } = {}]) {
        let constructable = callerClass::callerClass[$.constructor.switch]($.key.classInstance)({ description: description || 'Configured Class.' })
        constructable.parameter = parameter
        // Pass same arguments from previous client itnerface
        return constructable::Constructable.Class[Constructable.$.clientInterface.switch]($.key.instanceDelegatingToEntityInstancePrototype)({ constructorImplementation })
      },
    })
  },
}
