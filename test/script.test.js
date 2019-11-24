process.env['SZN_DEBUG'] = true
import assert from 'assert'
import { assert as chaiAssertion } from 'chai'
import * as Functionality from '../source/constructableElement/Functionality/Functionality.class.js'
import * as Constructable from '../source/constructableElement/Constructable/Constructable.class.js'
import * as Entity from '../source/constructableElement/Entity/Entity.class.js'

suite('Functionality element', () => {
  const fixture = { symbol1: Symbol(), symbol2: Symbol(), function1: () => fixture.symbol1, function2: () => fixture.symbol2 }

  suite('Getter functionality - implementation retrieval:', () => {
    const functionality = Functionality.Constructor() // create object with merged functionality

    functionality::functionality[Functionality.$.prototypeDelegation.setter]({
      'implementation-1': fixture.symbol1,
      'implementation-2': fixture.symbol2,
    })
    functionality::functionality[Functionality.$.instantiate.setter]({
      'implementation-1': fixture.function1,
    })
    functionality::functionality[Functionality.$.initialize.setter]({
      'implementation-1': fixture.function1,
    })
    functionality::functionality[Functionality.$.constructor.setter]({
      'implementation-1': fixture.function1,
    })
    functionality::functionality[Functionality.$.clientInterface.setter]({
      'implementation-1': fixture.function1,
      'implementation-2': fixture.function2,
    })
    functionality[Functionality.$.clientInterface.fallback] = 'implementation-2'

    test('Should return registered implementation', () => {
      assert(functionality::functionality[Functionality.$.prototypeDelegation.getter]('implementation-1') === fixture.symbol1, '• implementation object should be resolved correctly.')
      assert(functionality::functionality[Functionality.$.prototypeDelegation.getter]('implementation-2') === fixture.symbol2, '• implementation object should be resolved correctly.')
      assert(functionality[Functionality.$.instantiate.switch]('implementation-1')() === fixture.symbol1, '• implementation functions should be resolved correctly.')
      assert(functionality[Functionality.$.initialize.switch]('implementation-1')() === fixture.symbol1, '• implementation functions should be resolved correctly.')
      assert(functionality[Functionality.$.constructor.switch]('implementation-1')() === fixture.symbol1, '• implementation functions should be resolved correctly.')
      assert(functionality[Functionality.$.clientInterface.switch]('implementation-1')() === fixture.symbol1, '• implementation functions should be resolved correctly.')
      assert(functionality[Functionality.$.clientInterface.switch]('implementation-2')() === fixture.symbol2, '• implementation functions should be resolved correctly.')
      assert(functionality[Functionality.$.clientInterface.switch]()() === fixture.symbol2, '• fallback implementation functions should be resolved correctly.')
    })
  })

  suite('Recursive property lookup in the nested list object:', () => {
    const functionality = Functionality.Constructor() // create object with merged functionality
    let delegatingFunctionality = Object.create(functionality) // delegating instance with its own implementation storage.

    functionality::functionality[Functionality.$.prototypeDelegation.setter]({
      'implementation-1': fixture.symbol1,
      'implementation-2': fixture.symbol2,
    })
    functionality::functionality[Functionality.$.constructor.setter]({
      'implementation-1': fixture.function1,
      'implementation-2': fixture.function2,
    })
    functionality[Functionality.$.constructor.fallback] = 'implementation-2'

    delegatingFunctionality::delegatingFunctionality[Functionality.$.prototypeDelegation.setter]({ propertyOnChildObject: fixture.symbol1 })
    delegatingFunctionality::delegatingFunctionality[Functionality.$.constructor.setter]({ propertyOnChildObject: () => fixture.symbol1 })

    test('Should resolve nested properties from child objects', () => {
      assert(delegatingFunctionality[Functionality.$.prototypeDelegation.getter]('propertyOnChildObject') === fixture.symbol1, '• Cannot resolve property in nested list object from child object.')
      assert(delegatingFunctionality[Functionality.$.prototypeDelegation.getter]('implementation-2') === fixture.symbol2, '• Cannot resolve property in nested list object from child object.')
      assert(delegatingFunctionality[Functionality.$.constructor.getter]('propertyOnChildObject')() === fixture.symbol1, '• Cannot resolve property in nested list object from child object.')
      assert(delegatingFunctionality[Functionality.$.constructor.getter]('implementation-1')() === fixture.symbol1, '• Cannot resolve property in nested list object from child object.')
      assert(delegatingFunctionality[Functionality.$.constructor.switch]()() === fixture.symbol2, '• Cannot resolve fallback property in nested list object from child object.')
    })
  })
})

suite('Constructable element', () => {
  test('Should create instances successfully', () => {
    assert(Constructable.clientInterface(), '• Constructable class must return a configured instance when apply is envoked.')
    assert(new Constructable.clientInterface(), '• Constructable class must return an instance object when new constructor is envoked.')
  })
})

suite('Entity element', () => {
  test('Should create instances successfully', () => {
    assert(Entity.clientInterface(), '• Entity class must return a configured instance when apply is envoked.')
    assert(new Entity.clientInterface(), '• Entity class must return an instance object when new constructor is envoked.')
  })
})
