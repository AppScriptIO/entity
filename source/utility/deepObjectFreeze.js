"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepFreeze = deepFreeze;
let hasOwnProperty = Object.prototype.hasOwnProperty;

function deepFreeze({
  object,
  getPropertyImplementation = Object.getOwnPropertyNames
} = {}) {
  Object.freeze(object);
  let isFunction = typeof object === 'function';
  getPropertyImplementation(object).forEach(function (property) {
    if (hasOwnProperty.call(object, property) && object[property] !== null && (isFunction ? property !== 'caller' && property !== 'callee' && property !== 'arguments' : true) && (typeof object[property] === 'object' || typeof object[property] === 'function') && !Object.isFrozen(object[property])) {
      deepFreeze({
        object: object[property],
        getPropertyImplementation
      });
    }
  });
  return object;
}