import { $, Class as Constructable } from '../Constructable.class.js'
import { mergeNonexistentProperties, mergeArrayWithObjectItem } from '../../../utility/mergeProperty.js'

/**
 * Example of configured constructable creation: 
  let configuredConstructable = Constructable.clientInterface({ parameter: [] })
  const Entity = new configuredConstructable({ description: 'Entity' })
  */
module.exports = {
  [$.key.constructableClass]: function({
    constructorImplementation,
    returnedInstanceAdapter = instance => ({
      class: instance,
      reference: instance[$.reference],
      constructablePrototype: instance::Constructable[$.prototypeDelegation.getter]($.key.constructableClass).prototype,
    }),
    callerClass = this,
  } = {}) {
    const proxiedTarget = new Proxy(function() {}, {
      construct(target, argumentList, proxiedTarget) {
        if (callerClass.parameter) mergeArrayWithObjectItem({ listTarget: argumentList, listDefault: callerClass.parameter }) // in case configured constructable which holds default parameter values.
        let instance = callerClass::Constructable[$.constructor.switch](constructorImplementation)(...argumentList)
        return returnedInstanceAdapter ? returnedInstanceAdapter(instance) : instance
      },
      apply(target, thisArg, [{ description, parameter = [] } = {}]) {
        let newConfiguredConstructable = callerClass::Constructable[$.constructor.switch]($.key.configuredClass)({ description: description, parameter })
        let clientInterface = newConfiguredConstructable::Constructable[$.clientInterface.switch]($.key.constructableClass)()
        return clientInterface
      },
    })
    return proxiedTarget
  },
}
