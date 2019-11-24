import * as lodash from 'lodash'
import { executionControl } from '../../../utility/generatorExecutionControl.js'
import { $ } from '../Constructable.class.js'

module.exports = {
  // generator function that uses a pattern allowing for handing over control to caller - i.e. running the function in steps.
  // Constructable pattern instance - follows the Constructable specification (this module).
  // TODO: Document pattern used for handing over control to client and pipping results through the chain
  [$.key.constructableClass]: function*({ description, reference, prototype, prototypeDelegation, callerClass = this } = {}) {
    const shouldHandOverControl = executionControl.shouldHandOver(function.sent)
    prototypeDelegation ||= callerClass::callerClass[$.prototypeDelegation.getter]($.key.constructableClass).prototype
    const step = [
      // execution of steps allows for passing argument for each step and pipping the result of the previous step.
      {
        passThroughArg: { description, prototypeDelegation: prototypeDelegation },
        func: function(previousArg, arg) {
          let instance = callerClass::callerClass[$.instantiate.switch]( $.key.createObjectWithDelegation )(arg)
          return { instance }
        },
        condition: true,
      },
      {
        passThroughArg: { description, reference, prototype, construtorProperty: callerClass },
        func: function({ instance }, arg) {
          // pass to all implemenatations the same argument
          let argumentObject = Object.assign({ targetInstance: instance }, arg)
          callerClass::callerClass[$.initialize.switch]( $.key.constructableClass, {recursiveDelegationChainExecution: true })(argumentObject)
          callerClass::callerClass[$.initialize.switch]( $.key.classInstance )(lodash.pick(argumentObject, ['description', 'targetInstance', 'construtorProperty']))
          return instance
        },
        condition: true,
      },
    ]

    // Run chain of step functions
    let i = 0,
      result
    while (i < step.length) {
      if (step[i].condition == false) {
        i++
        continue
      }
      if (shouldHandOverControl) {
        yield step[i].passThroughArg
        result = step[i].func(result, function.sent)
      } else {
        result = step[i].func(result, step[i].passThroughArg)
      }
      i++
    }
    return result
  },

  [$.key.classInstance]({ description = 'Class', callerClass = this } = {}) {
    let instance = callerClass::callerClass[$.instantiate.switch]( $.key.createObjectWithDelegation )({
      description,
      prototypeDelegation: callerClass,
    })
    callerClass::callerClass[$.initialize.switch]( $.key.classInstance )({ targetInstance: instance, description: description })
    return instance
  },

  // create instance of a Constructable that is prepopulated with parameters, calling the functions will use these params. This allows usage of params multiple times without repeating them in each requrest.
  [$.key.configuredClass]({ description = 'Configured Class.', parameter, callerClass = this } = {}) {
    let instance = callerClass::callerClass[$.constructor.switch]( $.key.classInstance )({ description: description })
    callerClass::callerClass[$.initialize.switch]( $.key.configuredClass )({ targetInstance: instance, parameter })
    return instance
  },
}
