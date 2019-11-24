import { $ } from '../Entity.class.js'
import { mergeArrayWithObjectItem } from '../../../utility/mergeProperty.js'
import * as Constructable from '../../Constructable/Constructable.class.js'

module.exports = {
  // create an entity class that has follows that Entity pattern to create instances with custom prototype chains.
  [$.key.entityClass]({ callerClass = this }) {
    let clientInterface = callerClass::Constructable.Class[Constructable.$.clientInterface.switch](Constructable.$.key.constructableClass)({
      constructorImplementation: $.key.entityClass,
      returnedInstanceAdapter: instance => ({
        class: instance,
        reference: instance[Constructable.$.reference],
        constructablePrototype: instance::Constructable[Constructable.$.prototypeDelegation.getter](Constructable.$.key.constructableClass).prototype,
        entityPrototype: instance::Constructable[Constructable.$.prototypeDelegation.getter]($.key.entityInstance).prototype,
      }),
    })
    return clientInterface
  },

  // Entity instance relating to prototype chain with functionality specific to the implementer class (sub class, e.g. Graph Element)
  // create an instance using entity defined prototype and innitialization functions. Used by Entity classes to create an interface for their class.
  [$.key.instanceDelegatingToEntityInstancePrototype]({
    constructorImplementation,
    // intercept client interface to allow external manipulation of its behavior.
    clientInterfaceInterceptCallback = clientInterfaceTarget => callerClass::Constructable.Class[Constructable.$.clientInterface.switch]('argumentsAdapterOnConstruction')({ clientInterfaceTarget }), // 'false' for preventing this feature from executing or using the default value.
    clientInterfaceCallbackList = [],
    callerClass = this,
  } = {}) {
    if (!constructorImplementation) throw new Error('• Parameter `constructorImplementation` must be passed.')
    if (clientInterfaceInterceptCallback) clientInterfaceCallbackList.push(clientInterfaceInterceptCallback)

    let createClientInterface = (initialProxyTarget = function() {}) => {
      let constructCallback = argumentList => callerClass::Constructable.Class[Constructable.$.constructor.switch](constructorImplementation)(...argumentList)
      return new Proxy(initialProxyTarget, {
        construct(target, argumentList, proxiedTarget) {
          if (callerClass.parameter) mergeArrayWithObjectItem({ listTarget: argumentList, listDefault: callerClass.parameter }) // in case configured constructable which holds default parameter values.
          return constructCallback(argumentList)
        },
        apply(target, thisArg, [{ description, parameter = [], clientInterfaceInterceptCallback = false /* prevent default value assignment */ } = {}]) {
          let newConfiguredConstructable = callerClass::Constructable.Class[Constructable.$.constructor.switch](Constructable.$.key.configuredClass)({ description, parameter })
          // Pass same arguments from previous client itnerface
          return newConfiguredConstructable::Constructable.Class[Constructable.$.clientInterface.switch]($.key.instanceDelegatingToEntityInstancePrototype)({
            constructorImplementation,
            clientInterfaceInterceptCallback,
            clientInterfaceCallbackList,
          })
        },
      })
    }

    let clientInterfaceTarget = createClientInterface()
    clientInterfaceTarget = clientInterfaceCallbackList.reduce((accumulator, callback) => callback(accumulator), clientInterfaceTarget)
    return clientInterfaceTarget
  },

  // Restructure arguments when constructed, this function is used by creating a proxy around the client interface proxy.
  argumentsAdapterOnConstruction({
    clientInterfaceTarget,
    argumentListAdapter = argumentList => (argumentList[0] = { data: argumentList[0] }), // Restructure argument list
  }) {
    return new Proxy(clientInterfaceTarget, {
      construct(target, argumentList, proxiedTarget) {
        argumentListAdapter(argumentList)
        return Reflect.construct(target, argumentList, proxiedTarget)
      },
    })
  },
}
