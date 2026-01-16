# Functional Concepts
JavaScript treats functions as **First-Class Citizens**, meaning they can be:
- Assigned to variables.
- Passed as arguments to other functions (callbacks).
- Returned from other functions.

## Higher-Order Functions
Functions that take other functions as arguments or return them.
Common array methods are higher-order functions:
- \`.map()\`: Transforms each element.
- \`.filter()\`: Selects elements based on condition.
- \`.reduce()\`: Reduces array to a single value.

\`\`\`javascript
const numbers = [1, 2, 3, 4];
const doubled = numbers.map(n => n * 2); // [2, 4, 6, 8]
\`\`\`
