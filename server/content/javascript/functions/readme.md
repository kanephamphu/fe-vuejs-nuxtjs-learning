# JavaScript Functions

Functions are the building blocks of any application. They are "first-class citizens" in JavaScript, meaning they can be passed as arguments, returned from other functions, and assigned to variables.

## 1. Function Declarations vs Expressions
- **Declaration**: Hoisted to the top. Can be called before it's defined.
- **Expression**: Not hoisted. Must be defined before use.
- **Arrow Function**: More concise, but has **no `this` context** of its own (lexical scoping).

---

## 2. Implementation vs Result

### Scenario A: The `this` Behavior
```javascript
const obj = {
  name: "Kane",
  regular: function() { console.log("Regular:", this.name); },
  arrow: () => { console.log("Arrow:", this.name); }
};

obj.regular();
obj.arrow();
```
**Result:**
```text
Regular: Kane
Arrow: undefined (or global name)
```

### Scenario B: Rest Parameters (`...`)
```javascript
function sum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}
console.log(sum(1, 2, 3, 4));
```
**Result:**
```text
10
```

---

## 3. Closures
A closure is when a function "remembers" its lexical scope even when the function is executed outside that scope. This is how private variables are often implemented.

> [!IMPORTANT]
> When using arrow functions in Vue components or objects, remember they capture the `this` value of the enclosing context. If you need to access methods on the same object, use a regular function.
javascript
const multiply = (a, b) => a * b;
```
