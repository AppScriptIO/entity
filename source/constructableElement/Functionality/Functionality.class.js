import * as symbol from '../sharedSymbol.js'
import * as instanceManipulation from './elementFunctionality/instanceManipulation.js'
import * as constructor from './elementFunctionality/constructor.js'
import * as clientInterface from './elementFunctionality/clientInterface.js'

// Combined reference of functionalities
export const $ = Object.assign(Object.create(Object.prototype), instanceManipulation.$, constructor.$, clientInterface.$, { metadata: symbol.metadata })

/** Contains the functionality for managing implementations without the implementation methods themselves.
 * @return {Object} merges functionality prototypes, creating a new storage reference for implementations
 */
export function Constructor({instance, reference} = {}) {
  if(reference) Object.assign(reference, $)
  instance ||= Object.create(Object.prototype)
  ;[instanceManipulation.apply, constructor.apply, clientInterface.apply].forEach(apply => apply(instance))
  instance[$.metadata] = 'functionality prototype & instance' // this is both a prototype for methods and an instance for specific properties.
  return instance
}
