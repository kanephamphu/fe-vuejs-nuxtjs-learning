# JavaScript Operators & Logic

Operators allow us to perform mathematical calculations, comparisons, and logical operations. One of JavaScript's most unique (and dangerous) features is **Type Coercion**.

## 1. Categories
- **Arithmetic**: `+`, `-`, `*`, `/`, `%`, `**`
- **Comparison**: `==` (loose), `===` (strict), `!=`, `!==`, `>`, `<`
- **Logical**: `&&` (AND), `||` (OR), `!` (NOT)

---

## 2. Implementation vs Result

### Scenario A: Strict vs Loose Equality
```javascript
console.log(5 == "5");  // Coercion happens
console.log(5 === "5"); // No coercion
```
**Result:**
```text
true
false
```

### Scenario B: Logical Short-circuiting
```javascript
const name = "" || "Guest";
const user = "Kane" && "Active";
console.log(name);
console.log(user);
```
**Result:**
```text
Guest (Empty string is falsy)
Active (Returns the last truthy value)
```

---

## 3. Common Pitfalls: Truthy & Falsy
Values that are **falsy** in JS: `false`, `0`, `""`, `null`, `undefined`, `NaN`. **Everything else is truthy!**

> [!CAUTION]
> Always use `===` and `!==`. Loose equality (`==`) can lead to extremely confusing bugs due to unexpected type coercion rules.
