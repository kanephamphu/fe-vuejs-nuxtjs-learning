# Operators and Logic
Operators perform operations on variables and values.

## Types of Operators
- **Arithmetic**: `+`, `-`, `*`, `/`, `%` (modulus), `**` (exponentiation).
- **Assignment**: `=`, `+=`, `-=`, etc.
- **Comparison**: `==` (loose equality), `===` (strict equality), `!=`, `!==`, `>`, `<`.
- **Logical**: `&&` (AND), `||` (OR), `!` (NOT).

### Strict Equality (`===`) vs Loose Equality (`==`)
Always use `===` as it checks both value and type, avoiding unexpected type coercion results.
```javascript
5 == "5"   // true
5 === "5"  // false
```
