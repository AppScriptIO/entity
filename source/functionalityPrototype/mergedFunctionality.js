// merge functionality prototypes
import * as instantiateInitialize from './instantiate&initialize'
import * as constructor from './constructor'
import * as clientInterface from './clientInterface'
import symbol from '../constructable/Symbol.reference.js'

const Prototype = Object.assign(
  {
    [symbol.metadata]: {
      type: Symbol('Combined prototype functionalities'),
    },
  },
  instantiateInitialize.Prototype,
  constructor.Prototype,
  clientInterface.Prototype,
)
const Reference = Object.assign({}, instantiateInitialize.Reference, constructor.Reference, clientInterface.Reference)

export { Prototype, Reference }
