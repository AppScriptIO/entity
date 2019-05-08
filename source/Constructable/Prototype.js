"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Prototype = void 0;

var _mergeProperty = require("../utility/mergeProperty.js");

var _prototypeFunctionality = require("../utility/prototypeFunctionality.js");

var _Reference = require("./Reference.js");

const Prototype = {
  /**
   * prototypeDelegation
   */
  [_Reference.Reference.prototypeDelegation.setter.list](implementation) {
    // set constractor property on prototype
    // for (const key of Object.keys(implementation)) {
    //   //???? Not needed
    //   implementation[key].constructor = this
    // }
    return (0, _mergeProperty.mergeOwnNestedProperty)({
      target: this,
      ownProperty: _Reference.Reference.prototypeDelegation.list,
      value: implementation
    });
  },

  [_Reference.Reference.prototypeDelegation.getter.list](implementationKey) {
    return (0, _prototypeFunctionality.nestedPropertyDelegatedLookup)({
      target: this,
      directProperty: _Reference.Reference.prototypeDelegation.list,
      nestedProperty: implementationKey
    });
  },

  [_Reference.Reference.prototypeDelegation.list]: {},

  /**
   * instance - instantiate
   */
  [_Reference.Reference.instantiate.setter.list](implementation) {
    return (0, _mergeProperty.mergeOwnNestedProperty)({
      target: this,
      ownProperty: _Reference.Reference.instantiate.list,
      value: implementation
    });
  },

  [_Reference.Reference.instantiate.getter.list](implementationKey) {
    return (0, _prototypeFunctionality.nestedPropertyDelegatedLookup)({
      target: this,
      directProperty: _Reference.Reference.instantiate.list,
      nestedProperty: implementationKey
    });
  },

  [_Reference.Reference.instantiate.switch]: (0, _prototypeFunctionality.createSwitchGeneratorFunction)({
    fallbackSymbol: _Reference.Reference.instantiate.fallback,
    implementationListSymbol: _Reference.Reference.instantiate.getter.list
  }),
  [_Reference.Reference.instantiate.list]: {},

  /**
   * instance - initialize
   */
  [_Reference.Reference.initialize.setter.list](implementation) {
    return (0, _mergeProperty.mergeOwnNestedProperty)({
      target: this,
      ownProperty: _Reference.Reference.initialize.list,
      value: implementation
    });
  },

  [_Reference.Reference.initialize.getter.list](implementationKey) {
    return (0, _prototypeFunctionality.nestedPropertyDelegatedLookup)({
      target: this,
      directProperty: _Reference.Reference.initialize.list,
      nestedProperty: implementationKey
    });
  },

  [_Reference.Reference.initialize.switch]: (0, _prototypeFunctionality.createSwitchGeneratorFunction)({
    fallbackSymbol: _Reference.Reference.initialize.fallback,
    implementationListSymbol: _Reference.Reference.initialize.getter.list
  }),
  [_Reference.Reference.initialize.list]: {},

  /**
   * constructor
   **/
  [_Reference.Reference.constructor.setter.list](implementation) {
    return (0, _mergeProperty.mergeOwnNestedProperty)({
      target: this,
      ownProperty: _Reference.Reference.constructor.list,
      value: implementation
    });
  },

  [_Reference.Reference.constructor.getter.list](implementationKey) {
    return (0, _prototypeFunctionality.nestedPropertyDelegatedLookup)({
      target: this,
      directProperty: _Reference.Reference.constructor.list,
      nestedProperty: implementationKey
    });
  },

  [_Reference.Reference.constructor.switch]: (0, _prototypeFunctionality.createSwitchGeneratorFunction)({
    fallbackSymbol: _Reference.Reference.constructor.fallback,
    implementationListSymbol: _Reference.Reference.constructor.getter.list
  }),
  [_Reference.Reference.constructor.fallback]: _Reference.Reference.constructor.key.constructable,
  [_Reference.Reference.constructor.list]: {} // prevent accidental manipulation of delegated prototype
  // deepFreeze({ object: Prototype, getPropertyImplementation: Object.getOwnPropertySymbols })

};
exports.Prototype = Prototype;