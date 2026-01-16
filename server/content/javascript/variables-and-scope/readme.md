# Variables and Scope

In JavaScript, how you declare a variable determines its scope and whether it can be reassigned.

## var, let, and const
- `const`: Block-scoped. Cannot be reassigned.
- `let`: Block-scoped. Can be reassigned.
- `var`: Function-scoped. Can be hoisted. (Avoid in modern code!)

## Scoping
Variables defined inside a function or a block `{ }` are only accessible there.

```javascript
const name = "Alice"; // Global or outer scope

if (true) {
  let age = 25; // Block scoped
  console.log(name); // Accessible
}

// console.log(age); // Error: age is not defined
```
