"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.Reference = void 0;

const Reference = {

  prototypeDelegation: {
    functionality: Symbol('prototypeDelegation functionality methods'),
    list: Symbol('prototypeDelegation implementation list') },



  instantiate: {
    functionality: Symbol('instantiate functionality methods'),
    list: Symbol('instantiate implementation list'),
    fallback: Symbol('instantiate fallback implementation key') },



  initialize: {
    functionality: Symbol('initialize functionality methods'),
    list: Symbol('initialize implementation list'),
    fallback: Symbol('initialize fallback implementation key') } };exports.Reference = Reference;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NvdXJjZS9mdW5jdGlvbmFsaXR5UHJvdG90eXBlL2luc3RhbnRpYXRlJmluaXRpYWxpemUvUmVmZXJlbmNlLmpzIl0sIm5hbWVzIjpbIlJlZmVyZW5jZSIsInByb3RvdHlwZURlbGVnYXRpb24iLCJmdW5jdGlvbmFsaXR5IiwiU3ltYm9sIiwibGlzdCIsImluc3RhbnRpYXRlIiwiZmFsbGJhY2siLCJpbml0aWFsaXplIl0sIm1hcHBpbmdzIjoiOztBQUVPLE1BQU1BLFNBQVMsR0FBRzs7QUFFdkJDLEVBQUFBLG1CQUFtQixFQUFFO0FBQ25CQyxJQUFBQSxhQUFhLEVBQUVDLE1BQU0sQ0FBQywyQ0FBRCxDQURGO0FBRW5CQyxJQUFBQSxJQUFJLEVBQUVELE1BQU0sQ0FBQyx5Q0FBRCxDQUZPLEVBRkU7Ozs7QUFRdkJFLEVBQUFBLFdBQVcsRUFBRTtBQUNYSCxJQUFBQSxhQUFhLEVBQUVDLE1BQU0sQ0FBQyxtQ0FBRCxDQURWO0FBRVhDLElBQUFBLElBQUksRUFBRUQsTUFBTSxDQUFDLGlDQUFELENBRkQ7QUFHWEcsSUFBQUEsUUFBUSxFQUFFSCxNQUFNLENBQUMseUNBQUQsQ0FITCxFQVJVOzs7O0FBZXZCSSxFQUFBQSxVQUFVLEVBQUU7QUFDVkwsSUFBQUEsYUFBYSxFQUFFQyxNQUFNLENBQUMsa0NBQUQsQ0FEWDtBQUVWQyxJQUFBQSxJQUFJLEVBQUVELE1BQU0sQ0FBQyxnQ0FBRCxDQUZGO0FBR1ZHLElBQUFBLFFBQVEsRUFBRUgsTUFBTSxDQUFDLHdDQUFELENBSE4sRUFmVyxFQUFsQixDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVlcEZyZWV6ZSB9IGZyb20gJy4uLy4uL3V0aWxpdHkvZGVlcE9iamVjdEZyZWV6ZS5qcydcblxuZXhwb3J0IGNvbnN0IFJlZmVyZW5jZSA9IHtcbiAgLy8gSG9sZCBhbGwgcmVsYXRlZCBvYmplY3RzIG5lZWRlZCB0byBjcmVhdGUgYSBkZWxlZ2F0aW9uIHRvIGEgc3BlY2lmaWMgcHJvdG90eXBlIChlLmcuIGEga2V5IG1heSBob2xkIGByZWZlcmVuY2VgIHN5bWJvbHMgJiBhIGZ1bmN0aW9uYWxpdHkgYHByb3RvdHlwZWAgb2JqZWN0KVxuICBwcm90b3R5cGVEZWxlZ2F0aW9uOiB7XG4gICAgZnVuY3Rpb25hbGl0eTogU3ltYm9sKCdwcm90b3R5cGVEZWxlZ2F0aW9uIGZ1bmN0aW9uYWxpdHkgbWV0aG9kcycpLFxuICAgIGxpc3Q6IFN5bWJvbCgncHJvdG90eXBlRGVsZWdhdGlvbiBpbXBsZW1lbnRhdGlvbiBsaXN0JyksXG4gIH0sXG5cbiAgLy8gUmVzcG9uc2libGUgZm9yIHRoZSBjcmVhdGlvbiBvZiBpbnN0YW5jZXMgd2l0aCBzZXR0aW5nIHByb3RvdHlwZSBkZWxlZ2F0aW9uIC0gZS5nLiBpbnN0YW5jZSBjb3VsZCBiZSBhIEpTIE9iamVjdCBvciBhIEpTIEZ1bmN0aW9uLlxuICBpbnN0YW50aWF0ZToge1xuICAgIGZ1bmN0aW9uYWxpdHk6IFN5bWJvbCgnaW5zdGFudGlhdGUgZnVuY3Rpb25hbGl0eSBtZXRob2RzJyksXG4gICAgbGlzdDogU3ltYm9sKCdpbnN0YW50aWF0ZSBpbXBsZW1lbnRhdGlvbiBsaXN0JyksXG4gICAgZmFsbGJhY2s6IFN5bWJvbCgnaW5zdGFudGlhdGUgZmFsbGJhY2sgaW1wbGVtZW50YXRpb24ga2V5JyksXG4gIH0sXG5cbiAgLy8gUmVzcG9uc2libGUgZm9yIG1hbmlwdWxhdGluZyBhbiBpbnN0YW5jZSAtIGUuZy4gYWRkIHByb3BlcnRpZXMgdG8gdGhlIGluc3RhbmNlLCBjaGFuZ2UgZGVsZWdhdGlvbiwgd3JhcCB3aXRoIHByb3h5IHRvIGNoYW5nZSBiZWhhdmlvci5cbiAgaW5pdGlhbGl6ZToge1xuICAgIGZ1bmN0aW9uYWxpdHk6IFN5bWJvbCgnaW5pdGlhbGl6ZSBmdW5jdGlvbmFsaXR5IG1ldGhvZHMnKSxcbiAgICBsaXN0OiBTeW1ib2woJ2luaXRpYWxpemUgaW1wbGVtZW50YXRpb24gbGlzdCcpLFxuICAgIGZhbGxiYWNrOiBTeW1ib2woJ2luaXRpYWxpemUgZmFsbGJhY2sgaW1wbGVtZW50YXRpb24ga2V5JyksXG4gIH0sXG59XG5cbi8vIGRlZXBGcmVlemUoeyBvYmplY3Q6IFJlZmVyZW5jZSwgZ2V0UHJvcGVydHlJbXBsZW1lbnRhdGlvbjogT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfSlcbiJdfQ==