// merge functionality prototypes
import * as instantiateInitialize from './instantiate&initialize'
import * as constructor from './constructor'
import * as clientInterface from './clientInterface'
import * as symbol from '../constructable/Symbol.reference.js'

const Prototype = Object.assign({}, instantiateInitialize.Prototype, constructor.Prototype, clientInterface.Prototype, {
  [symbol.metadata]: {
    type: Symbol('Combined prototype functionalities'),
  },
})
const Reference = Object.assign({}, instantiateInitialize.Reference, constructor.Reference, clientInterface.Reference)

export { Prototype, Reference }
