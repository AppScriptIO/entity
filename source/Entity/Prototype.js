"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Prototype = void 0;

var _Reference = require("./Reference.js");

var _mergeProperty = require("../utility/mergeProperty.js");

var _prototypeFunctionality = require("../utility/prototypeFunctionality.js");

const Prototype = {
  /**
   * clientInterface
   **/
  [_Reference.Reference.clientInterface.setter.list](implementation) {
    return (0, _mergeProperty.mergeOwnNestedProperty)({
      target: this,
      ownProperty: _Reference.Reference.clientInterface.list,
      value: implementation
    });
  },

  [_Reference.Reference.clientInterface.getter.list](implementationKey) {
    return (0, _prototypeFunctionality.nestedPropertyDelegatedLookup)({
      target: this,
      directProperty: _Reference.Reference.clientInterface.list,
      nestedProperty: implementationKey
    });
  },

  [_Reference.Reference.clientInterface.switch]: (0, _prototypeFunctionality.createSwitchGeneratorFunction)({
    fallbackSymbol: _Reference.Reference.clientInterface.fallback,
    implementationListSymbol: _Reference.Reference.clientInterface.getter.list
  }),
  [_Reference.Reference.clientInterface.fallback]: _Reference.Reference.clientInterface.key.prototypeConstruct,
  [_Reference.Reference.clientInterface.list]: {}
};
exports.Prototype = Prototype;