"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Entity = void 0;

var symbol = _interopRequireWildcard(require("../Symbol.constant.js"));

var _Reference = require("./Reference.js");

var _Prototype = require("./Prototype.js");

var _ConstructableClass = require("../Constructable/Constructable.class.js");

var _Constructable$Constr, _ref, _ref2, _g8, _g9;

const Entity = (_Constructable$Constr = _ConstructableClass.Constructable[_ConstructableClass.Constructable[symbol.reference].constructor.switch]({
  implementationKey: _ConstructableClass.Constructable[symbol.reference].constructor.key.constructableInstance
}), (g => {
  g.next('intermittent');
  return g.next({
    description: 'Entity'
  }).value;
})(_Constructable$Constr));
exports.Entity = Entity;
_ref = Entity[symbol.reference], Object.assign(_ref, _Reference.Reference);
_ref2 = Entity[symbol.prototype], Object.assign(_ref2, _Prototype.Prototype);
/**
 *  prototypeDelegation
 */

Entity[symbol.prototype][_ConstructableClass.Constructable[symbol.reference].prototypeDelegation.setter.list]({});
/**
 *  Instantiate
 */


Entity[symbol.prototype][_ConstructableClass.Constructable[symbol.reference].instantiate.setter.list]({});
/**
 *  Initialize
 */


Entity[symbol.prototype][_ConstructableClass.Constructable[symbol.reference].initialize.setter.list]({
  [_ConstructableClass.Constructable[symbol.reference].initialize.key.data]({
    data,
    instanceObject,
    self = this
  } = {}) {
    Object.assign(instanceObject, data); // apply data to instance

    return instanceObject;
  }

});
/**
 *  Constructor
 */


Entity[symbol.prototype][_ConstructableClass.Constructable[symbol.reference].constructor.setter.list]({
  [_ConstructableClass.Constructable[symbol.reference].constructor.key.prototypeInstance]: function ({
    data,
    self = this
  } = {}) {
    var _instance, _ref3, _ref4;

    return _instance = (_ref3 = self[_ConstructableClass.Constructable[symbol.reference].instantiate.switch].call(self), (g => {
      g.next('intermittent');
      return g.next({
        instanceType: 'object'
      }).value;
    })(_ref3)), (_ref4 = self[_ConstructableClass.Constructable[symbol.reference].initialize.switch].call(self), (g => {
      g.next('intermittent');
      return g.next({
        data: data,
        instanceObject: _instance
      }).value;
    })(_ref4));
  }
});
/**
 *  ClientInterface
 */


Entity[symbol.prototype][Entity[symbol.reference].clientInterface.setter.list]({
  [Entity[symbol.reference].clientInterface.key.prototypeConstruct]({
    configuredConstructable,
    self = this,
    interfaceTarget
  } = {}) {
    interfaceTarget || (interfaceTarget = self);
    const proxiedTarget = new Proxy(function () {} || interfaceTarget, Object.assign({
      apply(target, thisArg, [{
        description
      } = {}]) {
        var _self$Constructable$s, _self$Entity$symbol$r;

        // TODO: Create constructable for configured constructables creation. wehre adding config will alter the behavior of instance creation.
        let newConfiguredConstructable = (_self$Constructable$s = self[_ConstructableClass.Constructable[symbol.reference].constructor.switch]({
          implementationKey: _ConstructableClass.Constructable[symbol.reference].constructor.key.configuredConstructable
        }), (g => {
          g.next('intermittent');
          return g.next({
            description: description,
            initializeFallback: configuredConstructable[_ConstructableClass.Constructable[symbol.reference].initialize.fallback]
          }).value;
        })(_self$Constructable$s));
        let clientInterface = (_self$Entity$symbol$r = self[Entity[symbol.reference].clientInterface.switch]({
          implementationKey: Entity[symbol.reference].clientInterface.key.prototypeConstruct
        }), (g => {
          g.next('intermittent');
          return g.next({
            configuredConstructable: newConfiguredConstructable
          }).value;
        })(_self$Entity$symbol$r));
        return clientInterface;
      },

      construct(target, argumentList, proxiedTarget) {
        var _ref5;

        return _ref5 = configuredConstructable[_ConstructableClass.Constructable[symbol.reference].constructor.switch].call(configuredConstructable, {
          implementationKey: _ConstructableClass.Constructable[symbol.reference].constructor.key.prototypeInstance
        }), (g => {
          g.next('intermittent');
          return g.next({
            data: argumentList[0]
          });
        })(_ref5);
      }

    }));
    return proxiedTarget;
  },

  [Entity[symbol.reference].clientInterface.key.entityConstruct]({
    configuredConstructable,
    self = this,
    interfaceTarget
  } = {}) {
    interfaceTarget || (interfaceTarget = self);
    const proxiedTarget = new Proxy(function () {} || interfaceTarget, Object.assign({
      construct(target, [{
        description,
        instanceType,
        reference,
        prototypeDelegation
      } = {}], proxiedTarget) {
        var _configuredConstructa;

        return _configuredConstructa = configuredConstructable[_ConstructableClass.Constructable[symbol.reference].constructor.switch]({
          implementationKey: _ConstructableClass.Constructable[symbol.reference].constructor.key.constructableInstance
        }), (g => {
          g.next('intermittent');
          return g.next({
            description,
            instanceType,
            reference,
            prototypeDelegation
          }).value;
        })(_configuredConstructa);
      }

    }));
    return proxiedTarget;
  }

}); // Create client interface

const configuredConstructable = (_g8 = Entity[_ConstructableClass.Constructable[symbol.reference].constructor.switch]({
  implementationKey: _ConstructableClass.Constructable[symbol.reference].constructor.key.constructable
}), _g8.next('intermittent') && _g8.next({
  description: 'EntityConstructableForClientInterface',
  instantiateFallback: _ConstructableClass.Constructable[symbol.reference].instantiate.key.prototypeInstance,
  initializeFallback: _ConstructableClass.Constructable[symbol.reference].initialize.key.constructableInstance,
  instantiateSwitchSymbol: _ConstructableClass.Constructable[symbol.reference].instantiate.key.prototypeInstance,
  initializeSwitchSymbol: _ConstructableClass.Constructable[symbol.reference].initialize.key.constructableInstance
}).value);
Entity.clientInterface = (_g9 = Entity[Entity[symbol.reference].clientInterface.switch]({
  implementationKey: Entity[symbol.reference].clientInterface.key.entityConstruct
}), _g9.next('intermittent') && _g9.next({
  configuredConstructable: configuredConstructable
}).value);