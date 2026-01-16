# Variables and Scope in JavaScript
Variables are containers for storing data values. In JavaScript, we have three ways to declare variables: `var`, `let`, and `const`.

## 1. Declaration Types
- **`var`**: Function-scoped or globally-scoped. Can be re-declared and updated. (Legacy, avoid using).
- **`let`**: Block-scoped. Can be updated but not re-declared within the same scope.
- **`const`**: Block-scoped. Cannot be updated or re-declared. Must be initialized at declaration.

## 2. Scope
Scope determines the accessibility (visibility) of variables.
- **Global Scope**: Variables declared outside any function.
- **Function Scope**: Variables declared within a function.
- **Block Scope**: Variables declared inside a block `{}` (e.g., if statements, loops).

### Example
```javascript
function example() {
  if (true) {
    let blockScoped = 'I am inside a block';
    var functionScoped = 'I am function scoped';
  }
  console.log(functionScoped); // Works
  // console.log(blockScoped); // Error: blockScoped is not defined
}
```
