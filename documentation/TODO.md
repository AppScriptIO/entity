### TODO:
- Split concerete behavior related functionalities into their own class that would inherit from Entity class. including concerete behavior methods like getInstanceOf that would return a concerete behavior of specific class.
- Checking of constructor type: 
Note: `connectionInstance instanceof Connection` will not work as Entity module creates Objects rather than callable Function instances. Could consider changing this behavior to allow native constructor checking to work.
`if (!(connectionInstance.constructor == Connection))` works.



___
### DONE:
- ~~~~