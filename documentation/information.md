# Entity
Constructable alternative to JS `class` or `function` with feature rich capabilities: 
- Multiple constructors. 
- 2 step constructor: Custom constructors allows for creating complex prototype chains for instances, independent on the constructor chain.
  - instantiation
  - initialization
- Client interface - splitting the internal programmatic API from the client exposed API. 
- Creating configured instances for the constructables.

# Concepts:
- Dynamic interface concept: Ability to configure an interface (e.g. a function) with a specific implementation before using it. Where from the same interface multiple others could be created.
    - `Constructor Configuration` - create constructor with specific implementation that manipulates the instance creation.
        interface function `call` --> for constructor config
    - `Instance Construction` - create object delegated to specific prototype chain.
        interface constractable `new` --> for instance creation.
- **Entity design pattern specification**: 
    - Through each `entitiy` programmatic api is exposed, which will be used to construct instance, configure constructors, and create client interfaces. 
    - Implementations can be registered for the following behaviors: 
        - __Prototype delegated instance__
        - __Configurable constructor instance__
        - __Client interface__ : exposing `construct`, `apply` handlers or built-in functionality / language features using the natively defined Symbols.
    - Techniques for achieving such design are: 
        - Symbols usage to implement a hidden api on the `entity`/object. Meta-level keys are used to prevent clashes and separate  normal keys from the meta-level ones implemented.
        - inheritance specially used to share `entitiy` pattern methods.
    - 

___
[Development TODO list](/documentation/TODO.md)

___

### 🔑 License: [MIT](/.github/LICENSE)
