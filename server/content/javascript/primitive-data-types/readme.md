# JavaScript Primitive Data Types

JavaScript has **7 primitive types**. Primitives are **immutable**—the value itself cannot be changed, although the variable holding it can be reassigned.

## 1. The 7 Primitives
1. **String**: Textual data (`"Hello"`)
2. **Number**: Integers and floats (`42`, `3.14`)
3. **Boolean**: `true` or `false`
4. **Undefined**: A variable that has been declared but not assigned a value.
5. **Null**: Intentional absence of any value.
6. **Symbol**: Unique and immutable identifier (ES6).
7. **BigInt**: For integers larger than $2^{53}-1$ (ES2020).

---

## 2. Implementation vs Result

### Scenario A: Type Checking with `typeof`
```javascript
console.log(typeof "JS");
console.log(typeof 2024);
console.log(typeof true);
console.log(typeof undefined);
console.log(typeof null); // Sneaky bug!
```
**Result:**
```text
string
number
boolean
undefined
object (Historical JS bug!)
```

### Scenario B: Immutability
```javascript
let str = "Hello";
str[0] = "h"; // Fails silently (or errors in strict mode)
console.log(str); 
```
**Result:**
```text
Hello
```

---

## 3. Storage: Memory Stack vs Heap
Primitives are stored in the **Stack** (fixed size, fast), while Objects are stored in the **Heap** (dynamic size, slower).

> [!TIP]
> Use `null` when you want to explicitly say "this value is empty". `undefined` should generally be left for the JavaScript engine to assign to uninitialized variables.

```javascript
let isActive = true;
let total = 100.50;
let message = "Welcome!";
```
