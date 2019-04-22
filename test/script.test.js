process.env['SZN_DEBUG'] = true
import assert from 'assert'
import { assert as chaiAssertion } from 'chai'
import { Constructable } from '../source/Constructable/Constructable.class.js'
import { Entity } from '../source/Entity/Entity.class.js'

suite('Constructable functionality', () => {
  console.log(Entity)
  test('Should .', () => {
    assert(false, '• Error')
  })
})
