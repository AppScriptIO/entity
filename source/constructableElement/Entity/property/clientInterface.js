import assert from 'assert'
import { $ } from '../Entity.class.js'
import { mergeArrayWithObjectItem } from '../../../utility/mergeProperty.js'
import * as Constructable from '../../Constructable/Constructable.class.js'
import { createObjectWithDelegation } from '../../Constructable/property/instantiate.js'

// Entity instance relating to prototype chain with functionality specific to the implementer class (sub class, e.g. Graph Element). create instances with custom prototype chains.
// create an instance using entity defined prototype and innitialization functions. Used by Entity classes to create an interface for their class.
function stateInstance({ constructorImplementation } = {}, previousClientInterfaceResult) {
  assert(constructorImplementation, `• "constructorImplementation" parameter must be passed`)
  const callerClass = this,
    _arguments = arguments

  return new Proxy(function() {}, {
    /**
     * @return { state instance } data instance delegating to the respective delegation setting defined in Entity.
     */
    construct(target, argumentList, proxiedTarget) {
      // memoization - recursive lookup for parameter key and merge to the arguments list:
      let parameterList = nestedPropertyDelegatedLookup({ target: callerClass, recursive: true, propertyPath: $.parameter })
      for (let parameter of parameterList) mergeArrayWithObjectItem({ listDefault: parameter, listTarget: argumentList }) // in case configured constructable which holds default parameter values.
       
      let instance = callerClass::callerClass[$.constructor.switch](constructorImplementation)(...argumentList)

      return { class: instance, reference: instance[$.reference] }
    },
    /**
     * @return { constructable instance: of type Entity class } configured Entity metaclass
     */
    apply(target, thisArg, [{ label, parameter = [] } = {}]) {
      // create instance of a Entity that is prepopulated with parameters, calling the functions will use these params. This allows usage of params multiple times without repeating them in each requrest.
      let instance = createObjectWithDelegation({ prototype: callerClass }) // initialize a prototype that is a class.
      instance[$.label] = `${label || ''} (configured class/constructable) of ${callerClass[$.label]}`
      instance.constructor = callerClass // to preserve functionality of native JS functions integration.

      instance[$.parameter] = parameter
      instance.clientInterface = instance::stateInstance(..._arguments) // Pass same arguments from previous client itnerface

      return { class: instance, clientInterface: instance.clientInterface }
    },
  })
}

module.exports = {
  // [$.key.constructableInstance] - when called it is inherited from parent functionality.
  
  [$.key.stateInstance]: stateInstance,
}
