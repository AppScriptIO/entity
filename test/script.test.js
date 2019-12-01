process.env['SZN_DEBUG'] = true
import assert from 'assert'
import { assert as chaiAssertion } from 'chai'
import * as Functionality from '../source/constructableElement/Functionality/Functionality.class.js'
import * as Constructable from '../source/constructableElement/Constructable/Constructable.class.js'
import * as Entity from '../source/constructableElement/Entity/Entity.class.js'

suite('Functionality element', () => {
  const fixture = { symbol1: Symbol(), symbol2: Symbol(), function1: () => fixture.symbol1, function2: () => fixture.symbol2 }

  suite('Getter functionality - implementation retrieval:', () => {
    const { instance: functionality } = Functionality.Constructor() // create object with merged functionality

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
    const { instance: functionality } = Functionality.Constructor() // create object with merged functionality
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
    assert(
      Constructable.clientInterface()
        .clientInterface()
        .clientInterface()
        .clientInterface(),
      '• Constructable class must return a configured instance when apply is envoked.',
    )
    assert(new Constructable.clientInterface(), '• Constructable class must return an instance object when new constructor is envoked.')
  })

  suite('Constructable instances (metaclasses):', () => {
    const { class: constructable1, reference: $ } = new Constructable.clientInterface({ label: 'Constructable 1' })
    const constructable2 = constructable1::constructable1[$.constructor.switch]($.key.constructableInstance)({ label: 'Constructable 2' })
    const constructable3 = constructable2::constructable2[$.constructor.switch]($.key.constructableInstance)({ label: 'Constructable 3' })
    test('Should inherit their constructable class', () => {
      assert(Object.getPrototypeOf(constructable2) === constructable1, '• constructable instance must inhirit from constructable class.')
      assert(Object.getPrototypeOf(constructable3) === constructable2, '• constructable instance must inhirit from constructable class.')
    })
  })

  suite('Memoization of Consrtuctable client interface:', () => {
    const fixture = 'classY'
    let configuredConstructable = Constructable.clientInterface({ label: 'X', parameter: [{ label: 'X' }] })
      .clientInterface({ label: 'Y', parameter: [{ label: fixture }] })
      .clientInterface({ label: 'Z', parameter: [] })
    let { class: class1 } = new configuredConstructable.clientInterface()
    let { class: class2 } = new configuredConstructable.clientInterface({ label: 'class2' })
    test('Should resolve memoized parameter from previous calls', () => {
      assert(class2[Constructable.$.label] == 'class2', '• Constructable class must return an instance object when new constructor is envoked.')
      assert(class1[Constructable.$.label] == fixture, '• Constructable class must return an instance object when new constructor is envoked.')
    })
  })
})

suite('Entity element', () => {
  test('Should create constructable instances successfully', () => {
    assert(
      Entity.clientInterface
        .constructableInstance()
        .clientInterface()
        .clientInterface(),
      '• Entity class must return a configured instance when apply is envoked.',
    )
    assert(new Entity.clientInterface.constructableInstance(), '• Entity class must return an instance object when new constructor is envoked.')
  })
  test('Should create state instances successfully', () => {
    assert(
      Entity.clientInterface
        .stateInstance()
        .clientInterface()
        .clientInterface(),
      '• Entity class must return a configured instance when apply is envoked.',
    )
    assert(new Entity.clientInterface.stateInstance({}), '• Entity class must return an instance object when new constructor is envoked.')
  })

  suite('state instance multiple delegation', () => {
    let fixture = { key1: 'key1', key2: 'key2', key3: 'key3' }
    let instance = new Entity.clientInterface.stateInstance({ delegationList: [{ [fixture.key1]: fixture.key1 }, { [fixture.key3]: fixture.key3, [fixture.key2]: fixture.key2 }] })

    test('Should create an instance with multiple delegation', () => {
      assert(
        instance[fixture.key1] == fixture.key1 && instance[fixture.key2] == fixture.key2 && instance[fixture.key3] == fixture.key3,
        '• The property does not exist in the hierarchy delegaiton chain.',
      )
    })
  })

  suite('state instance concereteBehavior pattern', () => {
    let fixture = { key1: 'key1', key2: 'key2', key3: 'key3' }

    let configuredEntity = Entity.clientInterface.stateInstance()
    // set concrete behavior function in the state instance prototype chain.
    configuredEntity.class::configuredEntity.class[Entity.$.prototypeDelegation.getter](Entity.$.key.stateInstance).instancePrototype
      |> (prototype =>
        Object.assign(prototype, {
          //  concerete behavior initialization on the target instance.
          [Entity.$.key.concereteBehavior]({ targetInstance }, { concereteBehavior /** state instance */ }) {
            const { MultipleDelegation } = require('@dependency/multiplePrototypeDelegation')
            MultipleDelegation.addDelegation({ targetObject: targetInstance, delegationList: [concereteBehavior] })
            return targetInstance
          },
        }))
    // behavior instance that will be added to the below instance during initialization.
    let instanceParent = new configuredEntity.clientInterface({
      // add delegation for testing weather the below instance have access to it's parent
      delegationList: [{ [fixture.key1]: fixture.key1 }, { [fixture.key3]: fixture.key3, [fixture.key2]: fixture.key2 }],
    })
    Object.assign(instanceParent, { label: 'instanceParent' })

    let clientInterface = {
      stateInstanceConcreteBehavior: Entity.class::Entity.class[Constructable.$.clientInterface.switch](Entity.$.key.stateInstance)({ constructorImplementation: Entity.$.key.concereteBehavior }),
    }
    let instance = new clientInterface.stateInstanceConcreteBehavior({ concreteBehaviorList: [instanceParent] })
    Object.assign(instance, { label: 'instance' })

    test('Should create an instance with multiple delegation', () => {
      assert(
        instance[fixture.key1] == fixture.key1 && instance[fixture.key2] == fixture.key2 && instance[fixture.key3] == fixture.key3,
        '• The property does not exist in the hierarchy delegaiton chain.',
      )
    })
  })
})
