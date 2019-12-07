import assert from 'assert'
import { mergeNonexistentProperties, deepMergeParameter } from '../../../utility/mergeProperty.js'
import { nestedPropertyDelegatedLookup } from '../../../utility/delegatedLookup.js'
import { $, Class as Constructable } from '../Constructable.class.js'
import { createObjectWithDelegation } from './instantiate.js'

function constructableInstance({ constructorImplementation } = {}, { callerClass = this } = {}) {
  const _arguments = arguments
  assert(constructorImplementation, `• "constructorImplementation" parameter must be passed`)

  return new Proxy(function() {}, {
    /**
     * @return { constructable: of new type class } subclass (new type class) from metaclass (Constructable class)
     */
    construct(target, argumentList, proxiedTarget) {
      // memoization - recursive lookup for parameter key and merge to the arguments list:
      let parameterList = nestedPropertyDelegatedLookup({ target: callerClass, recursive: true, propertyPath: $.parameter })
      // in case configured constructable which holds default parameter values.
      if (parameterList.length > 0) argumentList = deepMergeParameter(argumentList, ...parameterList) // first parameter list, 2nd list, current argument list => new merged argument list

      let instance = callerClass::callerClass[$.constructor.switch](constructorImplementation)({}, ...argumentList)

      return { class: instance, reference: instance[$.reference] }
    },
    /**
     * @return { constructable: of type Constructable class } configured Constructable metaclass
     */
    apply(target, thisArg, [{ label, parameter = [] } = {}]) {
      // create instance of a Constructable that is prepopulated with parameters, calling the functions will use these params. This allows usage of params multiple times without repeating them in each requrest.
      let instance = createObjectWithDelegation({ prototype: callerClass }) // initialize a prototype that is a class.
      instance[$.label] = `${label || ''} (configured class/constructable) of ${callerClass[$.label]}`
      instance.constructor = callerClass // to preserve functionality of native JS functions integration.

      instance[$.parameter] = parameter
      instance.clientInterface = instance::constructableInstance(..._arguments)

      return { class: instance, clientInterface: instance.clientInterface }
    },
  })
}

module.exports = {
  [$.key.constructableInstance]: constructableInstance,
}
