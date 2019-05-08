"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _EntityClass = require("./Entity/Entity.class.js");

Object.keys(_EntityClass).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _EntityClass[key];
    }
  });
});

var _ConstructableClass = require("./Constructable/Constructable.class.js");

Object.keys(_ConstructableClass).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ConstructableClass[key];
    }
  });
});