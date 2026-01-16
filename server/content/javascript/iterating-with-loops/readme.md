# JavaScript Iterating with Loops

Loops allow us to execute a block of code multiple times. Modern JavaScript provides several powerful ways to iterate over data beyond the classic `for` loop.

## 1. Loop Types
- **`for`**: Classic counter-based loop.
- **`while`**: Executes as long as a condition is true.
- **`for...of`**: Best for iterating over **values** in arrays or strings.
- **`for...in`**: Best for iterating over **keys/properties** of an object.

---

## 2. Implementation vs Result

### Scenario A: `for...of` vs `for...in`
```javascript
const fruits = ["Apple", "Banana"];
fruits.type = "Healthy";

console.log("Values (for...of):");
for (const f of fruits) console.log(f);

console.log("Keys (for...in):");
for (const k in fruits) console.log(k);
```
**Result:**
```text
Values (for...of):
Apple
Banana

Keys (for...in):
0
1
type
```

### Scenario B: Breaking & Continuing
```javascript
for (let i = 0; i < 5; i++) {
  if (i === 1) continue; // Skip 1
  if (i === 3) break;    // Stop at 3
  console.log(i);
}
```
**Result:**
```text
0
2
```

---

## 3. Which one to use?
- Arrays? Use `.forEach()` or `for...of`.
- Objects? Use `for...in` or `Object.entries()`.
- Fixed Number? Use the classic `for` loop.

> [!TIP]
> Avoid `for...in` for arrays if you care about performance or index order. It is designed for object property enumeration, not array iteration.
