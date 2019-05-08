"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extendFromConstructable = extendFromConstructable;
exports.extendFromNull = extendFromNull;

var _util = require("util");

/* Delegate to Superconstructor */
function extendFromConstructable(constructableTarget, constructableParent) {
  (0, _util.inherits)(constructableTarget, constructableParent);
  Object.setPrototypeOf(constructableTarget, constructableParent);
} // inherit from null


function extendFromNull(constructable) {
  Object.setPrototypeOf(constructable, null);
  Object.setPrototypeOf(constructable.prototype, null);
}