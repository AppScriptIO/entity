# Entity
Constructable alternative to JS `class` or `function` with feature rich capabilities: 
- Multiple constructors. 
- 2 step constructor: Custom constructors allows for creating complex prototype chains for instances, independent on the constructor chain.
  - instantiation
  - initialization
- Client interface - splitting the internal programmatic API from the client exposed API. 
- Creating configured instances for the constructables themselves, that would then create instances with prototype chains according to the configured parameters. Program-code-templates for creating an instance with custom prototype chain.
    - Metaclass: classes that produce other classes with specific definition for creating instances

# Concepts:
- Dynamic interface concept: Ability to configure an interface (e.g. a function) with a specific implementation before using it. Where from the same interface multiple others could be created.
    - `Constructor Configuration` - create constructor with specific implementation that manipulates the instance creation.
        interface function `call` --> for constructor config
    - `Instance Construction` - create object delegated to specific prototype chain.
        interface constractable `new` --> for instance creation.
    - The client interface allows to interact with the module in multiple ways. i.e. it doesn't contain the core logic, but the wiring simplifying the configuration & usage of the different componenets of this module.
    - The initialization behavior - e.g. through instantiation (executing interface as constructor with `new` keyword) or executing the interface by calling (executing interface as function): 
        - Apply => Create constructor with specific implementation, manipulating the behavior of the instance creation.
        - Construct => Create instance from default class. E.g. Node subclass instance.
    - Sets default parameters for the different components of the module.
    - Manages interface instances allowing to create new interface from a previously configured interface instance.
    - Provides a consistent exposed client interface - allowing easier refactoring of internal components when needed.
- **Entity design pattern specification**: 
    - Through each `entitiy` programmatic api is exposed, which will be used to construct instance, configure constructors, and create client interfaces. 
    - instances created by Entity class maybe refered to as `Entity instance`
    - Implementations can be registered for the following behaviors: 
        - __Prototype delegated instance__
        - __Configurable constructor instance__
        - __Client interface__ : exposing `construct`, `apply` handlers or built-in functionality / language features using the natively defined Symbols.
    - Techniques for achieving such design are: 
        - Symbols usage to implement a hidden api on the `entity`/object. Meta-level keys are used to prevent clashes and separate  normal keys from the meta-level ones implemented.
        - inheritance specially used to share `entitiy` pattern methods.
- 2 types of instances: 
    - Data/State instance: regular objects that are meant to be used in the program as storage of state.
    - Contructable instance: objects that themselves are used to create other objects (metaclasses).
- Restrictions when dealing with instance concept: Restrictions allow for making assumptios during defining of algorithms (e.g. delegation lookup), which simplifies development.
    - After creating an instance, the prototypes should not be manipulated, as then a different concept of an instance should be defined. e.g. an object that changes it's delegation chain frequently, wouldn't be defined as an instance of a specific constructable, different terms could be used for it,  but not instance. Example for a different concept - State object that would change it's behavior during the application runtime, or change the groups it is related to and inhirits data from.
    

Reference = programmatic api reference keys.

# Relationship between Constructable & Entity features: 
- class is any data type that is constructable. Instance is any data type that was instantiated by a constructable. all classes are instances. Class can produce another constructable class or a data type that is not instantiatable/constructable.
- instance is a composite data type like object.
- Constructable creates instances that use the prototype ->{ functionality for multiple constructors }
- Entity creates instances that use the prototype -> { functionality for client interface definition } e.g. Entity belongs to the Constructable class, i.e. Entity is an instance of the constructable class.
- Should separate functionality from the constructors used to create instances using these functionalities. Entity & Constructable function as holders for the reference and functionality, these are themselves constructors that produce instances with their own functionality. In addition they can use their own functionality to add implementations that will be used through them, e.g. client interfaces for easing their usage.

The behavior of native JS constructor is that it instantiates a new object and sets its prototype, then initializes the instance with all `constructor` functions in the class chain. This mechanism could also be applied for Entity constructor implementations.

# Explanation of Native JS Prototypes concepts: 
- Function & Object use protype functionality: 
    - Function provides { functionality for creation of function instances }
    - Object provides { functionality for creation of object instances }
- Function and Object globals are constructors for particular functionality/prototype.
- Some prototype may have multiple constructors that create instances which utilize them. Therefore, the Function & Object constructors aren't nested in the prototype but a separate entity.
- Function & Object constructors use functionality from the same prototype they serve/utilizt in the creation of instances.
- A differentiation should be pointed between constuctor's own properties/features and the functionality they use through delegation.

# Target object (e.g. class) location of storing functionality
- Functionality methods and value properties (i.e. key-value pair) can be saved directly on the target object or saved in a nested classified structure on the target object (like namespaces for each functionality). 
- Each property consists of at least a getter and setter functions and a property on the target object, that are accisible through the api it provides.
- properties located in the prototype (e.g. Constructable prototypeDelegation property) will be shared between the class and its instances.

___
[Development TODO list](/documentation/TODO.md)

Resources: 
- https://en.wikipedia.org/wiki/Class_(computer_programming)
___

### 🔑 License: [MIT](/.github/LICENSE)
