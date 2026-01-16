# Operators and Logic

Operators allow you to perform calculations and logic comparisons.

## Comparison Operators
- `==`: Abstract equality (Avoid!)
- `===`: Strict equality (Recommended!)
- `!=`, `!==`: Inequality
- `>`, `<`, `>=`, `<=`

## Logical Operators
- `&&`: AND
- `||`: OR
- `!`: NOT

```javascript
const isAdmin = true;
const hasToken = false;

if (isAdmin && !hasToken) {
  console.log("Admin but no token!");
}
```
