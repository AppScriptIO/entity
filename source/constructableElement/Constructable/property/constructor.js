import * as lodash from 'lodash'
import { executionControl } from '../../../utility/generatorExecutionControl.js'
import { $ } from '../Constructable.class.js'
import { createObjectWithDelegation } from './instantiate.js'

module.exports = {
  // Constructable pattern instance - follows the Constructable specification (this module).
  [$.key.constructableClass]: function({ label } = {}, previousConstructorResult) {
    let instance = createObjectWithDelegation()
    this::this[$.initialize.switch]($.key.constructableClass, { recursiveDelegationChainExecution: true })({ instance, label })
    return instance
  },
}
