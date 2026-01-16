# Practice: Scoping

Try to predict and then verify the behavior of these variables.

1. Declare a `const` and try to reassign it.
2. Declare a `let` inside an `if` block and access it outside.

```javascript
const PI = 3.14;
// PI = 3; // Uncomment to see error

if (true) {
  let blockVar = "hidden";
}
// console.log(blockVar); // Error
```
