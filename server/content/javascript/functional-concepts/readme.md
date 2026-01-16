# Functional Concepts

# JavaScript Functional Concepts

Functional programming is a paradigm that treats computation as the evaluation of mathematical functions and avoids changing-state and mutable data.

## 1. Core Principles
- **Pure Functions**: Always return the same result for the same arguments and have no side effects.
- **Immutability**: Data cannot be changed once created. Instead, new data is created.
- **Higher-Order Functions**: Functions that take other functions as arguments or return them.

---

## 2. Implementation vs Result

### Scenario A: Pure vs Impure
```javascript
// Impure (Modifies global state)
let counter = 0;
const impureAdd = (val) => counter += val;

// Pure (Self-contained)
const pureAdd = (a, b) => a + b;
```
**Result:**
The `pureAdd` function is easier to test and debug because it doesn't depend on or change anything outside itself.

### Scenario B: Map, Filter, Reduce
```javascript
const numbers = [1, 2, 3, 4];

const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, curr) => acc + curr, 0);

console.log("Doubled:", doubled);
console.log("Evens:", evens);
console.log("Sum:", sum);
```
**Result:**
```text
Doubled: [2, 4, 6, 8]
Evens: [2, 4]
Sum: 10
```

---

## 3. Why Functional?
It leads to code that is more predictable, easier to test (due to pure functions), and highly reusable through composition.

> [!TIP]
> Use `.map()` and `.filter()` instead of `for` loops whenever possible. They make your intent much clearer and reduce the chance of "off-by-one" errors.
