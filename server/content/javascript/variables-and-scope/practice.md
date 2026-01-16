# Practice: The Scope Laboratory

In this lab, you deep-dive into the "Temporal Dead Zone" (TDZ) and the difference between Block and Function scope.

## 1. The Temporal Dead Zone (TDZ)
Unlike `var`, `let` and `const` variables cannot be accessed before they are declared in the code.

**Lab Task:**
- Run the code below and observe the error.
- Move the declaration to the top to fix it.

```javascript
console.log(userData); // Predict: Error!
let userData = { id: 1, name: "Kane" };
```

---

## 2. Block Scope Isolation
Predict if the variable inside the `if` block "leaks" out.

**Implementation Hint:**
```javascript
let status = "global";

if (true) {
  let status = "local";
  console.log("Inside:", status);
}

console.log("Outside:", status);
```

**Verify your progress:**
- [ ] Does the "Outside" log show "global" or "local"?
- [ ] What happens if you change `let` to `var` inside the block?

---

## 3. Constant References
Remember: `const` prevents **reassignment**, not **mutation** of objects.

**Implementation Hint:**
```javascript
const config = { theme: "dark" };
config.theme = "light"; // Works!
// config = {};        // Error!
```
