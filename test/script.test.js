debugger
process.env['SZN_DEBUG'] = true
import assert from 'assert'
import { assert as chaiAssertion } from 'chai'
import { Entity } from '../source/constructable/Entity.class.js'

suite('Constructable functionality', () => {
  Entity

  test('Should .', () => {
    assert(false, '• Error')
  })
})
