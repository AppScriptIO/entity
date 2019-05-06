"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isGeneratorFunction = exports.GeneratorFunction = void 0;

const GeneratorFunction = function* () {}.constructor,
      isGeneratorFunction = value => {
  if (typeof value !== 'function') {
    return false;
  }

  return value.constructor && value.constructor.name === 'GeneratorFunction' || toString.call(value) === '[object GeneratorFunction]'; // another way is to check for iterator symbol `if(func[Symbol.iterator])`
};

exports.isGeneratorFunction = isGeneratorFunction;
exports.GeneratorFunction = GeneratorFunction;