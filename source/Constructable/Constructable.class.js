"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Constructable = void 0;

var _skipFirstGeneratorNext2 = _interopRequireDefault(require("@babel/runtime/helpers/skipFirstGeneratorNext"));

var symbol = _interopRequireWildcard(require("../Symbol.constant.js"));

var _Reference = require("./Reference.js");

var _Prototype = require("./Prototype.js");

var _createConstructableWithoutContructor = require("../utility/createConstructableWithoutContructor.js");

var _prototypeFunctionality = require("../utility/prototypeFunctionality.js");

var _mergeProperty = require("../utility/mergeProperty.js");

var _ref, _ref2;

function createInstanceWithDelegation({
  description,
  prototypeDelegation = null,
  instanceObject,
  objectType,
  construtorProperty = null
}) {
  switch (objectType) {
    case 'function':
      instanceObject || (instanceObject = (0, _createConstructableWithoutContructor.createConstructableWithoutContructor)(description));
      Object.setPrototypeOf(instanceObject, prototypeDelegation);
      break;

    case 'object':
    default:
      instanceObject || (instanceObject = Object.create(prototypeDelegation));
      break;
  }

  Object.defineProperty(instanceObject, symbol.constructor, {
    value: construtorProperty,
    writable: true,
    enumerable: false,
    configurable: false
  });
  return instanceObject;
}

function initializeConstructableInstance({
  description,
  instanceObject,
  reference,
  prototype,
  rootLevelPrototype = false
} = {}) {
  var _instanceObject;

  reference || (reference = Object.create(null));
  prototype || (prototype = Object.create((_instanceObject = instanceObject, Object.getPrototypeOf(_instanceObject)))); // Entities prototypes delegate to each other.

  (0, _mergeProperty.mergeNonexistentProperties)(instanceObject, {
    // set properties only if they do not exist on the target object.
    // self: Symbol(description),
    // get [Symbol.species]() {
    //   return GraphElement
    // },
    [symbol.reference]: reference,
    [symbol.prototype]: prototype // Entities prototypes delegate to each other.

  });
  Object.defineProperty(instanceObject, symbol.metadata, {
    writable: false,
    enumerable: false,
    value: {
      self: Symbol(description)
    }
  });
  if (rootLevelPrototype) Object.setPrototypeOf(instanceObject, instanceObject[symbol.prototype]); // instanceObject[Reference.prototypeDelegation.setter.list]({
  //   [Reference.prototypeDelegation.key.entityPrototype]: instanceObject.prototype,
  //   [Reference.prototypeDelegation.key.entityClass]: instanceObject,
  // })

  return instanceObject;
}

function rootLevelConstructableInstance({
  description,
  reference,
  prototype,
  prototypeDelegation
}) {
  let instance = createInstanceWithDelegation({
    description,
    prototypeDelegation: prototypeDelegation
  });
  return initializeConstructableInstance({
    description,
    reference,
    prototype,
    instanceObject: instance,
    rootLevelPrototype: true
  });
}

const Constructable = rootLevelConstructableInstance({
  description: 'Constructable'
});
exports.Constructable = Constructable;
_ref = Constructable[symbol.prototype], Object.assign(_ref, _Prototype.Prototype);
_ref2 = Constructable[symbol.reference], Object.assign(_ref2, _Reference.Reference);
/**
 *  Instantiate
 */

Constructable[symbol.prototype][_Reference.Reference.instantiate.setter.list]({
  [_Reference.Reference.instantiate.key.prototype]({
    instanceObject,
    objectType,
    prototypeDelegation,
    construtorProperty,
    self = this,
    description
  }) {
    return createInstanceWithDelegation({
      instanceObject,
      objectType,
      prototypeDelegation,
      construtorProperty,
      description
    });
  },

  [_Reference.Reference.instantiate.key.prototypeInstance]({
    instanceType = 'object',
    self = this
  }) {
    let args = arguments[0];

    let implementationFunc = _Prototype.Prototype[_Reference.Reference.instantiate.getter.list](_Reference.Reference.instantiate.key.prototype);

    let instance = implementationFunc.call(self, Object.assign(args, {
      prototypeDelegation: self[_Reference.Reference.prototypeDelegation.getter.list](_Reference.Reference.prototypeDelegation.key.entityPrototype),
      construtorProperty: self[_Reference.Reference.prototypeDelegation.getter.list](_Reference.Reference.prototypeDelegation.key.entityClass),
      objectType: instanceType
    }));
    return instance;
  }

});
/**
 *  Initialize
 */


Constructable[symbol.prototype][_Reference.Reference.initialize.setter.list]({
  [_Reference.Reference.initialize.key.configuredConstructor]({
    description,
    instanceObject
  } = {}) {
    (0, _mergeProperty.mergeNonexistentProperties)(instanceObject, {
      self: Symbol(description)
    });
    return instanceObject;
  },

  [_Reference.Reference.initialize.key.constructableInstance]: initializeConstructableInstance
});
/**
 *  Constructor
 */


Constructable[symbol.prototype][_Reference.Reference.constructor.setter.list]({
  [_Reference.Reference.constructor.key.constructable]: (function () {
    let _ref3 = function* ({
      description,
      instantiateFallback,
      initializeFallback,
      self = this,
      entityInstance,
      instantiateSwitchSymbol = _Reference.Reference.instantiate.key.prototypeInstance,
      initializeSwitchSymbol = _Reference.Reference.initialize.key.constructableInstance
    } = {}) {
      let _functionSent = yield;

      const shouldHandOverControl = _prototypeFunctionality.executionControl.shouldHandOver(_functionSent);

      const step = [{
        passThroughArg: {
          description
        },
        func: function (previousArg, arg) {
          var _g, _context;

          let instance = (_g = (_context = self, self[_Reference.Reference.instantiate.switch]).call(_context, {
            implementationKey: instantiateSwitchSymbol
          }), _g.next('intermittent') && _g.next(arg).value);
          return {
            instance
          };
        },
        condition: !Boolean(entityInstance)
      }, {
        passThroughArg: {
          description
        },
        func: function ({
          instance
        }, arg) {
          var _g2, _context2;

          _g2 = (_context2 = self, self[_Reference.Reference.initialize.switch]).call(_context2, {
            implementationKey: initializeSwitchSymbol
          }), _g2.next('intermittent') && _g2.next(Object.assign({
            instanceObject: instance
          }, arg)).value;
          return instance;
        },
        condition: !Boolean(entityInstance)
      }]; // Run chain of step functions

      let i = 0,
          result;

      while (i < step.length) {
        if (step[i].condition && !step[i].condition) {
          i++;
          continue;
        }

        if (shouldHandOverControl) {
          _functionSent = yield step[i].passThroughArg;
          result = step[i].func(result, _functionSent);
        } else {
          result = step[i].func(result, step[i].passThroughArg);
        }

        i++;
      }

      entityInstance || (entityInstance = result);
      entityInstance[_Reference.Reference.instantiate.fallback] = instantiateFallback;
      entityInstance[_Reference.Reference.initialize.fallback] = initializeFallback;
      return entityInstance;
    },
        _ref4 = (0, _skipFirstGeneratorNext2.default)(_ref3);

    return new Proxy(_ref3, {
      apply(target, thisArgument, argumentsList) {
        return Reflect.apply(_ref4, thisArgument, argumentsList);
      }

    });
  })(),
  [_Reference.Reference.constructor.key.configuredConstructable]: function ({
    description = 'prototypeInstanceConfiguredConstructable',
    instantiateFallback,
    initializeFallback,
    self = this
  } = {}) {
    var _ref6;

    let implementationFunc = self[_Reference.Reference.constructor.getter.list](_Reference.Reference.constructor.key.constructable);

    let configuredInstance = (_ref6 = implementationFunc.call(self, {
      description: description,
      instantiateFallback: instantiateFallback || _Reference.Reference.instantiate.key.prototypeInstance,
      initializeFallback: initializeFallback || _Reference.Reference.initialize.key.data,
      instantiateSwitchSymbol: _Reference.Reference.instantiate.key.prototype,
      initializeSwitchSymbol: _Reference.Reference.initialize.key.configuredConstructor // instantiateSwitchSymbol: Reference.instantiate.key.prototypeInstance,
      // initializeSwitchSymbol: Reference.initialize.key.constructableInstance,

    }), (iterateConstructable => {
      let instantiateArg = iterateConstructable.next('intermittent').value;
      let initializeArg = iterateConstructable.next(Object.assign(instantiateArg, {
        prototypeDelegation: self,
        construtorProperty: self
      })).value;
      return iterateConstructable.next(Object.assign(initializeArg, {
        description
      })).value;
    })(_ref6));
    return configuredInstance;
  },
  [_Reference.Reference.constructor.key.toplevelConstructable]: function ({
    description = 'ToplevelConstructable',
    prototypeDelegation = _Prototype.Prototype,
    reference
  } = {}) {
    var _ref7;

    let implementationFunc = _Prototype.Prototype[_Reference.Reference.constructor.getter.list](_Reference.Reference.constructor.key.constructable);

    let entityInstance = (_ref7 = implementationFunc.call(this, {
      description: description,
      instantiateFallback: _Reference.Reference.instantiate.key.prototypeInstance,
      initializeFallback: _Reference.Reference.initialize.key.constructableInstance,
      instantiateSwitchSymbol: _Reference.Reference.instantiate.key.prototypeInstance,
      initializeSwitchSymbol: _Reference.Reference.initialize.key.constructableInstance
    }), (iterateConstructable => {
      let instantiateArg = iterateConstructable.next('intermittent').value;
      let initializeArg = iterateConstructable.next(Object.assign(instantiateArg, {
        prototypeDelegation: _Prototype.Prototype
      })).value;
      return iterateConstructable.next(Object.assign(initializeArg, {
        prototypeDelegation
      })).value;
    })(_ref7));
    return entityInstance;
  },
  [_Reference.Reference.constructor.key.configuredConstructableForToplevelEntity]: function ({
    description,
    self = this
  } = {}) {
    var _g3, _g4;

    let instance = (_g3 = self[_Reference.Reference.instantiate.switch].call(self, {
      implementationKey: _Reference.Reference.instantiate.key.prototype
    }), _g3.next('intermittent') && _g3.next({
      description,
      prototypeDelegation: self,
      construtorProperty: self
    }).value);
    _g4 = self[_Reference.Reference.initialize.switch].call(self, {
      implementationKey: _Reference.Reference.initialize.key.configuredConstructor
    }), _g4.next('intermittent') && _g4.next({
      description,
      instanceObject: instance
    }).value;
    return instance;
  },
  [_Reference.Reference.constructor.key.constructableInstance]: function ({
    instanceType,
    description,
    reference,
    prototype,
    prototypeDelegation,
    self = this
  } = {}) {
    var _g5, _g6;

    let instance = (_g5 = self[_Reference.Reference.instantiate.switch].call(self, {
      implementationKey: _Reference.Reference.instantiate.key.prototype
    }), _g5.next('intermittent') && _g5.next({
      instanceType,
      description,
      prototypeDelegation: self[symbol.prototype],
      construtorProperty: self
    }).value);
    _g6 = self[_Reference.Reference.initialize.switch].call(self, {
      implementationKey: _Reference.Reference.initialize.key.constructableInstance
    }), _g6.next('intermittent') && _g6.next({
      description,
      instanceObject: instance,
      reference,
      prototype,
      rootLevelPrototype: true
    }).value;
    return instance;
  }
});