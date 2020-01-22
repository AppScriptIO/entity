import assert from 'assert'
import { deepMergeParameter } from '@dependency/handleJSNativeDataStructure'
import { nestedPropertyDelegatedLookup } from '../../../utility/delegatedLookup.js'
import * as Constructable from '../../Constructable/Constructable.class.js'
import { createObjectWithDelegation } from '../../Constructable/property/instantiate.js'
import { $ } from '../Entity.class.js'

// Entity instance relating to prototype chain with functionality specific to the implementer class (sub class, e.g. Graph Element). create instances with custom prototype chains.
// create an instance using entity defined prototype and innitialization functions. Used by Entity classes to create an interface for their class.
function stateInstance({ constructorImplementation } = {}, { callerClass = this } = {}) {
  assert(constructorImplementation, `• "constructorImplementation" parameter must be passed`)
  const _arguments = arguments

  return new Proxy(function() {}, {
    /**
     * @return { state instance } data instance delegating to the respective delegation setting defined in Entity.
     */
    construct(target, argumentList, proxiedTarget) {
      // memoization - recursive lookup for parameter key and merge to the arguments list:
      let parameterList = nestedPropertyDelegatedLookup({ target: callerClass, recursive: true, propertyPath: $.parameter })
      // in case configured constructable which holds default parameter values.
      if (parameterList.length > 0) argumentList = deepMergeParameter(argumentList, ...parameterList) // first parameter list, 2nd list, current argument list => new merged argument list

      let instance = callerClass::callerClass[Constructable.$.constructor.switch](constructorImplementation)({}, ...argumentList)

      return instance
    },
    /**
     * @return { constructable instance: of type Entity class } configured Entity metaclass
     * Used as a currying mechanism for paramters.
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
