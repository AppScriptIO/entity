"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSwitchGeneratorFunction = exports.nestedPropertyDelegatedLookup = exports.executionControl = void 0;

var _skipFirstGeneratorNext2 = _interopRequireDefault(require("@babel/runtime/helpers/skipFirstGeneratorNext"));

var _isGeneratorFunction = require("./isGeneratorFunction.js");

/**
 * Generators pattern
 * @param executionType - in a generator the first next(<argument>) call argument, catched using `function.sent`
 * Note about `propagation` of contorl - cannot use `yield*` techniques because - as it will call next without arguments implicitly. Therefore propagating in this way won't work, as dealing with uncontrolled next call isn't possible.
 **/
const executionControl = {
  shouldHandOver: executionType => {
    if (!Array.isArray(executionType)) executionType = [executionType];

    switch (true) {
      case executionType.includes('intermittent'):
      case executionType.includes('propagate'):
        return true;
        break;

      default:
      case executionType.includes('complete'):
        return false;
    }
  },
  shouldPropagate: executionType => {
    if (!Array.isArray(executionType)) executionType = [executionType];

    switch (true) {
      case executionType.includes('propagate'):
        return true;
        break;

      default:
      case executionType.includes('intermittent'):
      case executionType.includes('complete'):
        return false;
    }
  }
};
exports.executionControl = executionControl;

const nestedPropertyDelegatedLookup = ({
  target,
  directProperty,
  nestedProperty
}) => {
  const hasOwnProperty = Object.prototype.hasOwnProperty; // allows supporting objects delefating null.

  let value;

  do {
    if (hasOwnProperty.call(target, directProperty) && hasOwnProperty.call(target[directProperty], nestedProperty)) value = target[directProperty][nestedProperty];
    target = Object.getPrototypeOf(target);
  } while (!value && target != null);

  return value;
};

exports.nestedPropertyDelegatedLookup = nestedPropertyDelegatedLookup;

const createSwitchGeneratorFunction = function ({
  fallbackSymbol,
  implementationListSymbol
}) {
  return (function () {
    let _ref = function* ({
      implementationKey,
      self = this
    } = {}) {
      let _functionSent = yield;

      const controlArg = _functionSent;
      implementationKey || (implementationKey = self[fallbackSymbol]);
      const implementation = {
        func: self[implementationListSymbol].call(self, implementationKey) || function (e) {
          throw e;
        }(new Error(`• No implementation constructor found for key ${implementationKey}`)),
        passThroughArg: {}
      };

      if (executionControl.shouldHandOver(controlArg)) {
        implementation.passThroughArg = _functionSent = yield implementation.passThroughArg;
      } // redirect construct to particular implementation using specific execution depending of function type.


      if ((0, _isGeneratorFunction.isGeneratorFunction)(implementation.func)) {
        if (executionControl.shouldPropagate(controlArg)) {
          var _context;

          return (_context = self, implementation.func).call(_context, implementation.passThroughArg);
        } else {
          var _g, _context2;

          return _g = (_context2 = self, implementation.func).call(_context2, implementation.passThroughArg), _g.next('complete').value;
        }
      } else {
        var _context3;

        return (_context3 = self, implementation.func).call(_context3, implementation.passThroughArg);
      }
    },
        _ref2 = (0, _skipFirstGeneratorNext2.default)(_ref);

    return new Proxy(_ref, {
      apply(target, thisArgument, argumentsList) {
        return Reflect.apply(_ref2, thisArgument, argumentsList);
      }

    });
  })();
};

exports.createSwitchGeneratorFunction = createSwitchGeneratorFunction;