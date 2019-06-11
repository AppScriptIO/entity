"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getNestedObject = void 0;
const getNestedObject = (nestedObject, pathArray) => {
  return pathArray.reduce((object, key) => object && object[key] !== 'undefined' ? object[key] : undefined, nestedObject);
};exports.getNestedObject = getNestedObject;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NvdXJjZS91dGlsaXR5L2dldE5lc3RlZE9iamVjdC5qcyJdLCJuYW1lcyI6WyJnZXROZXN0ZWRPYmplY3QiLCJuZXN0ZWRPYmplY3QiLCJwYXRoQXJyYXkiLCJyZWR1Y2UiLCJvYmplY3QiLCJrZXkiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7QUFDTyxNQUFNQSxlQUFlLEdBQUcsQ0FBQ0MsWUFBRCxFQUFlQyxTQUFmLEtBQTZCO0FBQzFELFNBQU9BLFNBQVMsQ0FBQ0MsTUFBVixDQUFpQixDQUFDQyxNQUFELEVBQVNDLEdBQVQsS0FBa0JELE1BQU0sSUFBSUEsTUFBTSxDQUFDQyxHQUFELENBQU4sS0FBZ0IsV0FBMUIsR0FBd0NELE1BQU0sQ0FBQ0MsR0FBRCxDQUE5QyxHQUFzREMsU0FBekYsRUFBcUdMLFlBQXJHLENBQVA7QUFDRCxDQUZNLEMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBnZXQgbmVzdGVkIHByb3BlcnR5IHVzaW5nIGFycmF5IHBhdGguXG5leHBvcnQgY29uc3QgZ2V0TmVzdGVkT2JqZWN0ID0gKG5lc3RlZE9iamVjdCwgcGF0aEFycmF5KSA9PiB7XG4gIHJldHVybiBwYXRoQXJyYXkucmVkdWNlKChvYmplY3QsIGtleSkgPT4gKG9iamVjdCAmJiBvYmplY3Rba2V5XSAhPT0gJ3VuZGVmaW5lZCcgPyBvYmplY3Rba2V5XSA6IHVuZGVmaW5lZCksIG5lc3RlZE9iamVjdClcbn1cbiJdfQ==