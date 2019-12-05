"use strict";var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");Object.defineProperty(exports, "__esModule", { value: true });exports.Constructor = exports.$ = void 0;var symbol = _interopRequireWildcard(require("../sharedSymbol.js"));
var instanceManipulation = _interopRequireWildcard(require("./elementFunctionality/instanceManipulation.js"));
var constructor = _interopRequireWildcard(require("./elementFunctionality/constructor.js"));
var clientInterface = _interopRequireWildcard(require("./elementFunctionality/clientInterface.js"));


const $ = Object.assign(Object.create(Object.prototype), instanceManipulation.$, constructor.$, clientInterface.$, { metadata: symbol.metadata });exports.$ = $;




const Constructor = function Functionality({ instance, reference } = {}) {
  instance || (instance = Object.create(Object.prototype));
  [instanceManipulation.apply, constructor.apply, clientInterface.apply].forEach(apply => apply(instance));
  instance[$.metadata] = 'Functionality';
  instance.constructor = Functionality;
  reference = Object.assign(reference || Object.create(Object.prototype), $);
  return { instance, reference };
};exports.Constructor = Constructor;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NvdXJjZS9jb25zdHJ1Y3RhYmxlRWxlbWVudC9GdW5jdGlvbmFsaXR5L0Z1bmN0aW9uYWxpdHkuY2xhc3MuanMiXSwibmFtZXMiOlsiJCIsIk9iamVjdCIsImFzc2lnbiIsImNyZWF0ZSIsInByb3RvdHlwZSIsImluc3RhbmNlTWFuaXB1bGF0aW9uIiwiY29uc3RydWN0b3IiLCJjbGllbnRJbnRlcmZhY2UiLCJtZXRhZGF0YSIsInN5bWJvbCIsIkNvbnN0cnVjdG9yIiwiRnVuY3Rpb25hbGl0eSIsImluc3RhbmNlIiwicmVmZXJlbmNlIiwiYXBwbHkiLCJmb3JFYWNoIl0sIm1hcHBpbmdzIjoiMk1BQUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdPLE1BQU1BLENBQUMsR0FBR0MsTUFBTSxDQUFDQyxNQUFQLENBQWNELE1BQU0sQ0FBQ0UsTUFBUCxDQUFjRixNQUFNLENBQUNHLFNBQXJCLENBQWQsRUFBK0NDLG9CQUFvQixDQUFDTCxDQUFwRSxFQUF1RU0sV0FBVyxDQUFDTixDQUFuRixFQUFzRk8sZUFBZSxDQUFDUCxDQUF0RyxFQUF5RyxFQUFFUSxRQUFRLEVBQUVDLE1BQU0sQ0FBQ0QsUUFBbkIsRUFBekcsQ0FBVixDOzs7OztBQUtBLE1BQU1FLFdBQVcsR0FBRyxTQUFTQyxhQUFULENBQXVCLEVBQUVDLFFBQUYsRUFBWUMsU0FBWixLQUEwQixFQUFqRCxFQUFxRDtBQUM5RUQsRUFBQUEsUUFBUSxLQUFSQSxRQUFRLEdBQUtYLE1BQU0sQ0FBQ0UsTUFBUCxDQUFjRixNQUFNLENBQUNHLFNBQXJCLENBQUwsQ0FBUjtBQUNDLEdBQUNDLG9CQUFvQixDQUFDUyxLQUF0QixFQUE2QlIsV0FBVyxDQUFDUSxLQUF6QyxFQUFnRFAsZUFBZSxDQUFDTyxLQUFoRSxFQUF1RUMsT0FBdkUsQ0FBK0VELEtBQUssSUFBSUEsS0FBSyxDQUFDRixRQUFELENBQTdGO0FBQ0RBLEVBQUFBLFFBQVEsQ0FBQ1osQ0FBQyxDQUFDUSxRQUFILENBQVIsR0FBdUIsZUFBdkI7QUFDQUksRUFBQUEsUUFBUSxDQUFDTixXQUFULEdBQXVCSyxhQUF2QjtBQUNBRSxFQUFBQSxTQUFTLEdBQUdaLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjVyxTQUFTLElBQUlaLE1BQU0sQ0FBQ0UsTUFBUCxDQUFjRixNQUFNLENBQUNHLFNBQXJCLENBQTNCLEVBQTRESixDQUE1RCxDQUFaO0FBQ0EsU0FBTyxFQUFFWSxRQUFGLEVBQVlDLFNBQVosRUFBUDtBQUNELENBUE0sQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHN5bWJvbCBmcm9tICcuLi9zaGFyZWRTeW1ib2wuanMnXG5pbXBvcnQgKiBhcyBpbnN0YW5jZU1hbmlwdWxhdGlvbiBmcm9tICcuL2VsZW1lbnRGdW5jdGlvbmFsaXR5L2luc3RhbmNlTWFuaXB1bGF0aW9uLmpzJ1xuaW1wb3J0ICogYXMgY29uc3RydWN0b3IgZnJvbSAnLi9lbGVtZW50RnVuY3Rpb25hbGl0eS9jb25zdHJ1Y3Rvci5qcydcbmltcG9ydCAqIGFzIGNsaWVudEludGVyZmFjZSBmcm9tICcuL2VsZW1lbnRGdW5jdGlvbmFsaXR5L2NsaWVudEludGVyZmFjZS5qcydcblxuLy8gQ29tYmluZWQgcmVmZXJlbmNlIG9mIGZ1bmN0aW9uYWxpdGllc1xuZXhwb3J0IGNvbnN0ICQgPSBPYmplY3QuYXNzaWduKE9iamVjdC5jcmVhdGUoT2JqZWN0LnByb3RvdHlwZSksIGluc3RhbmNlTWFuaXB1bGF0aW9uLiQsIGNvbnN0cnVjdG9yLiQsIGNsaWVudEludGVyZmFjZS4kLCB7IG1ldGFkYXRhOiBzeW1ib2wubWV0YWRhdGEgfSlcblxuLyoqIENvbnRhaW5zIHRoZSBmdW5jdGlvbmFsaXR5IGZvciBtYW5hZ2luZyBpbXBsZW1lbnRhdGlvbnMgd2l0aG91dCB0aGUgaW1wbGVtZW50YXRpb24gbWV0aG9kcyB0aGVtc2VsdmVzLlxuICogQHJldHVybiB7T2JqZWN0fSBtZXJnZXMgZnVuY3Rpb25hbGl0eSBwcm90b3R5cGVzLCBjcmVhdGluZyBhIG5ldyBzdG9yYWdlIHJlZmVyZW5jZSBmb3IgaW1wbGVtZW50YXRpb25zXG4gKi9cbmV4cG9ydCBjb25zdCBDb25zdHJ1Y3RvciA9IGZ1bmN0aW9uIEZ1bmN0aW9uYWxpdHkoeyBpbnN0YW5jZSwgcmVmZXJlbmNlIH0gPSB7fSkge1xuICBpbnN0YW5jZSB8fD0gT2JqZWN0LmNyZWF0ZShPYmplY3QucHJvdG90eXBlKVxuICA7W2luc3RhbmNlTWFuaXB1bGF0aW9uLmFwcGx5LCBjb25zdHJ1Y3Rvci5hcHBseSwgY2xpZW50SW50ZXJmYWNlLmFwcGx5XS5mb3JFYWNoKGFwcGx5ID0+IGFwcGx5KGluc3RhbmNlKSlcbiAgaW5zdGFuY2VbJC5tZXRhZGF0YV0gPSAnRnVuY3Rpb25hbGl0eScgLy8gdGhpcyBpcyBib3RoIGEgcHJvdG90eXBlIGZvciBtZXRob2RzIGFuZCBhbiBpbnN0YW5jZSBmb3Igc3BlY2lmaWMgcHJvcGVydGllcy5cbiAgaW5zdGFuY2UuY29uc3RydWN0b3IgPSBGdW5jdGlvbmFsaXR5XG4gIHJlZmVyZW5jZSA9IE9iamVjdC5hc3NpZ24ocmVmZXJlbmNlIHx8IE9iamVjdC5jcmVhdGUoT2JqZWN0LnByb3RvdHlwZSksICQpIC8vIHByZXNlcnZlIG5hdGl2ZSBKUyBjb25zdHJ1Y3RvciBsb29rdXAgZnVuY3Rpb25hbGl0eS5cbiAgcmV0dXJuIHsgaW5zdGFuY2UsIHJlZmVyZW5jZSB9XG59XG4iXX0=